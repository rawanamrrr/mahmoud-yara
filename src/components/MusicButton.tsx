import { Volume2, VolumeX } from "lucide-react";

export const MusicButton = ({ muted, onToggle }: { muted: boolean; onToggle: () => void }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={muted ? "Activar sonido" : "Silenciar"}
      className="fixed text-stone-200 backdrop-blur-sm bg-[#5f6a48]/95 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_10px_15px_-3px,rgba(0,0,0,0.1)_0px_4px_6px_-4px] caret-transparent flex items-center justify-center outline-[3px] text-center z-50 p-3 rounded-full right-6 bottom-6 hover:bg-stone-600"
    >
      {muted ? <VolumeX size={20} strokeWidth={1.75} /> : <Volume2 size={20} strokeWidth={1.75} />}
    </button>
  );
};
