"use client";

import { Maximize2, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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

export function MotorcycleModelViewer({
  src,
  alt,
  fallbackImage,
  loadingLabel,
  resetLabel,
  fullscreenLabel,
  failureLabel,
  onLoadFailure,
}: MotorcycleModelViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const resetCameraRef = useRef<() => void>(() => undefined);

  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    let disposed = false;
    let animationFrame = 0;

    setLoaded(false);
    setFailed(false);
    setProgress(0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 1000);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-label", alt);
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.className = "h-full w-full touch-none";

    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x4b5563, 2.4));

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xbfd5ff, 2.2);
    fillLight.position.set(-4, 3, -5);
    scene.add(fillLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 0.2;
    controls.maxDistance = 100;

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const manager = new THREE.LoadingManager();
    manager.onProgress = (_url, itemsLoaded, itemsTotal) => {
      if (!disposed) {
        setProgress(itemsTotal > 0 ? itemsLoaded / itemsTotal : 0);
      }
    };

    const loader = new GLTFLoader(manager);

    loader.load(
      src,
      (gltf) => {
        if (disposed) return;

        const model = gltf.scene;

        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.castShadow = true;
          object.receiveShadow = true;
        });

        scene.add(model);

        const bounds = new THREE.Box3().setFromObject(model);
        const sphere = bounds.getBoundingSphere(new THREE.Sphere());
        const radius = Math.max(sphere.radius, 0.5);

        const initialPosition = sphere.center
          .clone()
          .add(new THREE.Vector3(radius * 2.25, radius * 0.5, radius * 0.9));

        resetCameraRef.current = () => {
          controls.target.copy(sphere.center);
          camera.position.copy(initialPosition);
          camera.near = Math.max(0.01, radius / 100);
          camera.far = Math.max(100, radius * 30);
          camera.updateProjectionMatrix();
          controls.minDistance = radius * 0.65;
          controls.maxDistance = radius * 8;
          controls.update();
        };

        resetCameraRef.current();
        setProgress(1);
        setLoaded(true);
      },
      undefined,
      () => {
        if (disposed) return;
        setFailed(true);
        onLoadFailure();
      },
    );

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();

      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;

        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];

        materials.forEach((material) => material.dispose());
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [alt, onLoadFailure, src]);

  async function enterFullscreen() {
    if (!containerRef.current || !document.fullscreenEnabled) return;
    await containerRef.current.requestFullscreen();
  }

  return (
    <div
      ref={containerRef}
      data-render-state={failed ? "failed" : loaded ? "loaded" : "loading"}
      className="relative h-full w-full overflow-hidden bg-[#ece9e2]"
      aria-label={alt}
    >
      <div ref={canvasHostRef} className="h-full w-full" />

      {failed && fallbackImage ? (
        <Image
          src={fallbackImage}
          width={1536}
          height={1024}
          priority
          sizes="(min-width: 1024px) 68vw, 100vw"
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : null}

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
            onClick={() => resetCameraRef.current()}
            title={resetLabel}
            aria-label={resetLabel}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-white/15 bg-black/80 text-white shadow-lg transition hover:bg-black"
          >
            <RotateCcw size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={enterFullscreen}
            title={fullscreenLabel}
            aria-label={fullscreenLabel}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-white/15 bg-black/80 text-white shadow-lg transition hover:bg-black"
          >
            <Maximize2 size={18} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
