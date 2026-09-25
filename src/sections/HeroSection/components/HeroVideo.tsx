import { useEffect, useRef } from "react";

export const INTRO_OPENED_EVENT = "intro:opened";
export const INTRO_FINISHED_EVENT = "intro:finished";

// The hero video waits for the intro to finish before playing.
// Phones (esp. low power mode) only allow playback started from a tap, so when the
// intro is tapped we "unlock" the video (play + pause) and really start it later.
export const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    let finished = false;

    const unlock = () => {
      video
        .play()
        .then(() => {
          if (!finished) {
            video.pause();
            video.currentTime = 0;
          }
        })
        .catch(() => {});
    };

    const gestures = ["pointerdown", "touchstart", "click"] as const;
    const retry = () => {
      if (finished) video.play().catch(() => {});
    };
    const stopRetrying = () => gestures.forEach((g) => window.removeEventListener(g, retry));

    const start = () => {
      finished = true;
      video.play().catch(() => {});
      // If the phone still blocks it, start on the next tap/scroll.
      gestures.forEach((g) => window.addEventListener(g, retry, { passive: true }));
      window.addEventListener("scroll", retry, { passive: true });
    };

    window.addEventListener(INTRO_OPENED_EVENT, unlock);
    window.addEventListener(INTRO_FINISHED_EVENT, start);
    video.addEventListener("playing", () => {
      if (finished) {
        stopRetrying();
        window.removeEventListener("scroll", retry);
      }
    });

    return () => {
      window.removeEventListener(INTRO_OPENED_EVENT, unlock);
      window.removeEventListener(INTRO_FINISHED_EVENT, start);
      stopRetrying();
      window.removeEventListener("scroll", retry);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="https://lafincapremium.thedigitalyes.com/assets/hero-video-nDXf7doB.mov"
      poster="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/hero-illustration-DrhagIJw.png"
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      controls={false}
      className="box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full pointer-events-none"
    ></video>
  );
};
