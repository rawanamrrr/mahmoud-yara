import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n";
import { INTRO_FINISHED_EVENT, INTRO_OPENED_EVENT } from "@/sections/HeroSection/components/HeroVideo";
import introVideo from "@/assets/intro-video.mp4";

export const OpeningOverlay = ({ onStart }: { onStart?: () => void }) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
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
    videoRef.current?.play().catch(close);
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
        src={introVideo}
        poster="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/intro-poster-Bahq9OmS.png"
        playsInline
        preload="auto"
        className="absolute box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full inset-0"
      ></video>
      {!started && (
        <>
        <img
          src="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/intro-poster-Bahq9OmS.png"
          alt="Invitación"
          className="absolute box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full inset-0"
        />
        <p className="absolute text-stone-600 text-xs font-black box-border caret-transparent tracking-[3px] leading-4 opacity-[0.0419308] outline-[3px] pointer-events-none text-center uppercase z-10 bottom-16 inset-x-0 md:opacity-[0.59365]">
          {t("overlay.tapToOpen")}
        </p>
        </>
      )}
    </div>
  );
};
