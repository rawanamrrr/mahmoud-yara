import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useLanguage } from "@/i18n";

type Point = { x: number; y: number };

const COLORS = ["#000000", "#3c4736", "#ef4444", "#3b82f6", "#8b5cf6", "#f59e0b"];
const WIDTHS = [2, 3, 5, 8];
const HEIGHT = 240;

type DrawingPadProps = {
  // Called after every change with a PNG data URL, or null when the pad is empty.
  onChange: (dataUrl: string | null) => void;
};

export const DrawingPad = ({ onChange }: DrawingPadProps) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const drawing = useRef(false);
  const before = useRef<ImageData | null>(null);
  // Snapshots of the canvas after each stroke; the first one is the blank page.
  const history = useRef<ImageData[]>([]);
  const [color, setColor] = useState(COLORS[0]);
  const [width, setWidth] = useState(3);

  const getContext = () => canvasRef.current?.getContext("2d") ?? null;

  const notify = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(history.current.length > 1 ? canvas.toDataURL("image/png") : null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;
    const ratio = window.devicePixelRatio || 1;
    const cssWidth = canvas.parentElement?.clientWidth || 320;
    canvas.width = cssWidth * ratio;
    canvas.height = HEIGHT * ratio;
    canvas.style.height = `${HEIGHT}px`;
    ctx.scale(ratio, ratio);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cssWidth, HEIGHT);
    history.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
    onChange(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const position = (event: PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const renderStroke = () => {
    const ctx = getContext();
    if (!ctx || !before.current) return;
    ctx.putImageData(before.current, 0, 0);
    const pts = points.current;
    ctx.save();
    ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width + 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (pts.length < 3) {
      // A tap becomes a dot.
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, (width + 2) / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const midX = (pts[i].x + pts[i + 1].x) / 2;
        const midY = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
    }
    ctx.restore();
  };

  const start = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;
    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);
    before.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    points.current = [position(event)];
    drawing.current = true;
    renderStroke();
  };

  const move = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    event.preventDefault();
    points.current.push(position(event));
    renderStroke();
  };

  const end = () => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!drawing.current || !canvas || !ctx) return;
    drawing.current = false;
    history.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    notify();
  };

  const undo = () => {
    const ctx = getContext();
    if (!ctx || history.current.length <= 1) return;
    history.current.pop();
    ctx.putImageData(history.current[history.current.length - 1], 0, 0);
    notify();
  };

  const clear = () => {
    const ctx = getContext();
    if (!ctx || history.current.length <= 1) return;
    history.current = [history.current[0]];
    ctx.putImageData(history.current[0], 0, 0);
    notify();
  };

  const buttonClass =
    "flex-1 rounded-md border border-[#3c4736]/20 bg-transparent py-2 text-xs text-[#3c4736]";

  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2" role="group" aria-label={t("rsvp.penColor")}>
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            aria-label={c}
            aria-pressed={color === c}
            className={`h-6 w-6 rounded-full border-2 ${color === c ? "scale-110 border-[#3c4736]" : "border-transparent"}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#3c4736]/10 bg-white/60 px-2 py-1">
        {WIDTHS.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setWidth(w)}
            aria-pressed={width === w}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${width === w ? "bg-[#3c4736]/10" : ""}`}
          >
            <span
              className="rounded-full"
              style={{ width: w + 2, height: w + 2, backgroundColor: color }}
            />
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg border border-[#3c4736]/20 bg-white">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          className="block w-full cursor-crosshair touch-none"
        />
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={undo} className={buttonClass}>
          {t("rsvp.undo")}
        </button>
        <button type="button" onClick={clear} className={buttonClass}>
          {t("rsvp.clear")}
        </button>
      </div>
    </div>
  );
};
