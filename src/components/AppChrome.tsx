import { useEffect, useRef, useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ToastList } from "@/components/ToastList";
import { MusicButton } from "@/components/MusicButton";
import { MainContent } from "@/sections/MainContent";
import { OpeningOverlay } from "@/components/OpeningOverlay";

const MUSIC_SRC = "https://lafincapremium.thedigitalyes.com/assets/intro-music-CzqJOUtA.mp3";

export const AppChrome = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // `stop()` fully tears down the src (see the visibility effect below), so
  // any attempt to play afterward needs to put it back first.
  const ensureSrc = (audio: HTMLAudioElement) => {
    if (!audio.src) {
      audio.src = MUSIC_SRC;
      audio.load();
    }
  };

  // Start the music on the very first tap/click anywhere on the site.
  // Android in particular requires play() to be called SYNCHRONOUSLY inside
  // the event handler (not after an await/promise tick), and only trusts a
  // real touchstart/click - not a generic scroll or a listener added with
  // { passive: true }. So this listens on `document`, in the capture phase,
  // non-passive, and calls play() directly, with no async work in between.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let started = false;

    const startAudio = () => {
      if (started || playing) return;
      ensureSrc(audio);
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            started = true;
            setPlaying(true);
          })
          .catch(() => {
            // Not ready yet (still buffering) - try once more as soon as it can play.
            if (audio.readyState < 3) {
              audio.addEventListener(
                "canplay",
                () => {
                  audio.muted = false;
                  audio
                    .play()
                    .then(() => {
                      started = true;
                      setPlaying(true);
                    })
                    .catch(() => {});
                },
                { once: true },
              );
            }
          });
      }
    };

    const options = { once: true, passive: false, capture: true } as const;
    document.addEventListener("touchstart", startAudio, options);
    document.addEventListener("click", startAudio, options);

    return () => {
      document.removeEventListener("touchstart", startAudio, options);
      document.removeEventListener("click", startAudio, options);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the element's muted flag in sync with state.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = muted;
  }, [muted]);

  // Fully stop the music - not just mute it - when the tab/app is hidden or
  // the page is being left: pause, rewind, and drop the source entirely so
  // nothing keeps playing or buffering in the background. Coming back needs
  // a fresh tap to resume, same as the very first time.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const stop = () => {
      try {
        audio.muted = true;
        audio.pause();
        audio.currentTime = 0;
        audio.removeAttribute("src");
        audio.load();
      } catch {
        // best effort - some of these can throw in odd states, safe to ignore
      }
      setPlaying(false);
    };

    const isHidden = () => document.hidden || document.visibilityState === "hidden";
    const handleVisibility = () => {
      if (isHidden()) stop();
    };
    const handleBlur = () => {
      // A closing on-screen keyboard can also blur the window on mobile, so
      // only stop if the document is genuinely no longer visible shortly after.
      window.setTimeout(() => {
        if (isHidden()) stop();
      }, 150);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("pagehide", stop);
    window.addEventListener("pagehide", stop);
    window.addEventListener("beforeunload", stop);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("pagehide", stop);
      window.removeEventListener("pagehide", stop);
      window.removeEventListener("beforeunload", stop);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureSrc(audio);
    audio.muted = false;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {});
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Tapping this button is itself a direct, trusted user gesture, so also
    // use it to (re)start playback if it never actually started (or was
    // stopped after the page was backgrounded).
    if (!playing) {
      startMusic();
      setMuted(false);
      return;
    }

    setMuted((prev) => !prev);
  };

  return (
    <div className="box-border caret-transparent outline-[3px]">
      <div
        role="region"
        aria-label="Notifications (F8)"
        className="box-border caret-transparent outline-[3px] pointer-events-none"
      >
        <ToastList />
      </div>
      <section
        aria-label="Notifications alt+T"
        className="box-border caret-transparent outline-[3px]"
      ></section>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        preload="auto"
        loop
        playsInline
        className="box-border caret-transparent hidden outline-[3px]"
      ></audio>
      <LanguageSelector />
      <MusicButton muted={muted || !playing} onToggle={toggleMute} />
      <OpeningOverlay onStart={startMusic} />
      <MainContent />
    </div>
  );
};
