import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n";
import { INTRO_FINISHED_EVENT, INTRO_OPENED_EVENT } from "@/sections/HeroSection/components/HeroVideo";
import introVideo from "@/assets/intro-video.mp4";
import introPoster from "@/assets/intro-poster.jpg";

export const OpeningOverlay = ({ onStart }: { onStart?: () => void }) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [closing, setClosing] = useState(false);
  const [closed, setClosed] = useState(false);

  const close = () => {
    setClosing(true);
    window.dispatchEvent(new Event(INTRO_FINISHED_EVENT));
  };

  // Fade the overlay out before removing it.
  useEffect(() => {
    if (!closing) return;
    const id = window.setTimeout(() => setClosed(true), 700);
    return () => window.clearTimeout(id);
  }, [closing]);

  if (closed) return null;

  const start = () => {
    if (started) return;
    setStarted(true);
    onStart?.();
    window.dispatchEvent(new Event(INTRO_OPENED_EVENT));
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.currentTime = 0;
      video.play().catch(close);
    }
  };

  return (
    <div
      onClick={start}
      onTouchStart={start}
      className={`cursor-pointer transition-opacity duration-700 ${closing ? "pointer-events-none opacity-0" : "opacity-100"} fixed bg-white box-border caret-transparent outline-[3px] z-50 inset-0`}
    >
      <video
        ref={videoRef}
        onEnded={close}
        onPlaying={() => setVideoPlaying(true)}
        src={introVideo}
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        className="absolute box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full inset-0 pointer-events-none"
      ></video>
      {/* Stays on top of the video, pixel-identical to its first frame, and only
          fades away once the video is *actually* rendering frames - so there is
          a smooth crossfade instead of a flash/blank gap while it starts up. */}
      <img
        src={introPoster}
        alt=""
        className={`absolute box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full inset-0 pointer-events-none transition-opacity duration-300 ${videoPlaying ? "opacity-0" : "opacity-100"}`}
      />
      <p className="absolute text-stone-400 text-4xl font-classic_script_mn box-border caret-transparent leading-10 outline-[3px] pointer-events-none text-center z-10 top-[68%] inset-x-0">
        {t("overlay.tapToOpen")}
      </p>
    </div>
  );
};
