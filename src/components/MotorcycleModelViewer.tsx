"use client";

import type { ModelViewerElement } from "@google/model-viewer";
import { Maximize2, RotateCcw } from "lucide-react";
import Image from "next/image";
import { createElement, useEffect, useRef, useState } from "react";

type MotorcycleModelViewerProps = {
  src: string;
  alt: string;
  fallbackImage?: string;
  cameraOrbit?: string;
  mobileCameraOrbit?: string;
  loadingLabel: string;
  resetLabel: string;
  fullscreenLabel: string;
  failureLabel: string;
  onLoadFailure: () => void;
};

type ProgressEvent = CustomEvent<{ totalProgress: number }>;

export function MotorcycleModelViewer({
  src,
  alt,
  fallbackImage,
  cameraOrbit = "45deg 72deg 75%",
  mobileCameraOrbit,
  loadingLabel,
  resetLabel,
  fullscreenLabel,
  failureLabel,
  onLoadFailure,
}: MotorcycleModelViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const [viewerRegistered, setViewerRegistered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [activeCameraOrbit, setActiveCameraOrbit] = useState(cameraOrbit);

  useEffect(() => {
    setProgress(0);
    setLoaded(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const syncCameraOrbit = () => {
      setActiveCameraOrbit(
        mobileQuery.matches ? mobileCameraOrbit ?? cameraOrbit : cameraOrbit,
      );
    };

    syncCameraOrbit();
    mobileQuery.addEventListener("change", syncCameraOrbit);
    return () => mobileQuery.removeEventListener("change", syncCameraOrbit);
  }, [cameraOrbit, mobileCameraOrbit]);

  useEffect(() => {
    let cancelled = false;

    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setViewerRegistered(true);
      })
      .catch(() => {
        if (cancelled) return;
        setFailed(true);
        onLoadFailure();
      });

    return () => {
      cancelled = true;
    };
  }, [onLoadFailure]);

  useEffect(() => {
    if (!viewerRegistered) return;
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setProgress(1);
      setLoaded(true);
    };
    const handleError = () => {
      setFailed(true);
      onLoadFailure();
    };
    const handleProgress = (event: Event) => {
      const nextProgress = (event as ProgressEvent).detail?.totalProgress ?? 0;
      setProgress(Math.max(0, Math.min(1, nextProgress)));
    };

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);
    viewer.addEventListener("progress", handleProgress);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
      viewer.removeEventListener("progress", handleProgress);
    };
  }, [onLoadFailure, viewerRegistered]);

  function resetCamera() {
    const viewer = viewerRef.current;
    if (!viewer) return;
    viewer.cameraOrbit = activeCameraOrbit;
    viewer.cameraTarget = "auto auto auto";
    viewer.fieldOfView = "28deg";
    viewer.resetTurntableRotation();
    viewer.jumpCameraToGoal();
  }

  async function enterFullscreen() {
    if (!containerRef.current || !document.fullscreenEnabled) return;
    await containerRef.current.requestFullscreen();
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-[#ece9e2]"
      aria-label={alt}
    >
      {failed && fallbackImage ? (
        <Image
          src={fallbackImage}
          width={1536}
          height={1024}
          priority
          sizes="(min-width: 1024px) 68vw, 100vw"
          alt={alt}
          className="h-full w-full object-contain"
        />
      ) : null}

      {!failed && viewerRegistered
        ? createElement("model-viewer", {
            ref: (element: ModelViewerElement | null) => {
              viewerRef.current = element;
            },
            src,
            alt,
            loading: "eager",
            reveal: "auto",
            "camera-controls": true,
            "camera-orbit": activeCameraOrbit,
            "field-of-view": "28deg",
            "min-camera-orbit": "auto auto 45%",
            "max-camera-orbit": "auto auto 180%",
            "min-field-of-view": "20deg",
            "max-field-of-view": "45deg",
            "touch-action": "pan-y",
            "interaction-prompt": "auto",
            "shadow-intensity": "1",
            exposure: "1",
            style: { width: "100%", height: "100%", background: "transparent" },
          })
        : null}

      {!loaded && !failed ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-black/75 px-4 py-3 text-white">
          <div className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.12em]">
            <span>{loadingLabel}</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-200"
              style={{ width: `${Math.max(4, progress * 100)}%` }}
            />
          </div>
        </div>
      ) : null}

      {failed ? (
        <div className="absolute inset-x-3 bottom-3 rounded-lg border border-amber-300/30 bg-black/85 px-3 py-2 text-center text-xs font-bold text-amber-100">
          {failureLabel}
        </div>
      ) : null}

      {loaded ? (
        <div className="absolute inset-x-3 bottom-3 z-10 flex justify-end gap-2">
          <button
            type="button"
            onClick={resetCamera}
            title={resetLabel}
            aria-label={resetLabel}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 bg-black/80 px-3 text-xs font-black text-white shadow-lg transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <RotateCcw size={17} aria-hidden="true" />
            <span className="hidden sm:inline">{resetLabel}</span>
          </button>
          <button
            type="button"
            onClick={enterFullscreen}
            title={fullscreenLabel}
            aria-label={fullscreenLabel}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 bg-black/80 px-3 text-xs font-black text-white shadow-lg transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <Maximize2 size={17} aria-hidden="true" />
            <span className="hidden sm:inline">{fullscreenLabel}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
