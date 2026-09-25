import { AppChrome } from "@/components/AppChrome";

export const App = () => {
  return (
    <body className="text-stone-600 text-base not-italic normal-nums font-normal accent-auto bg-blend-overlay bg-stone-200 bg-[url(data:image/svg+xml,%3Csvg%20viewBox=%270%200%20400%20400%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter%20id=%27noiseFilter%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.9%27%20numOctaves=%274%27%20stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url%28%23noiseFilter)] bg-size-[200px] box-border caret-transparent block tracking-[normal] leading-6 list-outside list-disc outline-[3px] pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-span">
      <AppChrome />
    </body>
  );
};
