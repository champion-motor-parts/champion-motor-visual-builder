"use client";

import {
  Bike,
  Check,
  Clipboard,
  Download,
  MessageCircle,
  PackageCheck,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AccessoryLayer,
  BikeModel,
  Coverset,
  Rim,
  accessoryLayers,
  bikeModels,
  coversets,
  rims,
  setupPackages,
} from "@/data/products";
import { WHATSAPP_PHONE_NUMBER } from "@/lib/config";

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 1000;

const coverAccent: Record<string, { primary: string; secondary: string }> = {
  "black-burgundy": { primary: "#be123c", secondary: "#7f1d1d" },
  "black-gold": { primary: "#f59e0b", secondary: "#a16207" },
  "yamaha-blue": { primary: "#2563eb", secondary: "#0891b2" },
  "red-black": { primary: "#ef4444", secondary: "#991b1b" },
  white: { primary: "#e5e7eb", secondary: "#94a3b8" },
};

const rimAccent: Record<string, string> = {
  "magenta-4spoke": "#db2777",
  "gold-4spoke": "#f59e0b",
  "blackblue-4spoke": "#2563eb",
  "blackred-4spoke": "#dc2626",
  "silver-4spoke": "#cbd5e1",
};

function findById<T extends { id: string }>(items: T[], id: string) {
  return items.find((item) => item.id === id) ?? items[0];
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-MY", {
    maximumFractionDigits: 0,
  }).format(value);
}

function loadCanvasImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function drawShowroomBackdrop(ctx: CanvasRenderingContext2D) {
  const floor = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  floor.addColorStop(0, "#171411");
  floor.addColorStop(0.56, "#0a0908");
  floor.addColorStop(1, "#050504");
  ctx.fillStyle = floor;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const glow = ctx.createRadialGradient(820, 450, 120, 820, 470, 820);
  glow.addColorStop(0, "rgba(255,255,255,0.13)");
  glow.addColorStop(0.48, "rgba(245,158,11,0.08)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.strokeStyle = "rgba(255,255,255,0.055)";
  ctx.lineWidth = 2;
  for (let y = 720; y < CANVAS_HEIGHT; y += 52) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(CANVAS_WIDTH, y - 80);
    ctx.stroke();
  }
}

function drawLayerImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawFallbackBase(ctx: CanvasRenderingContext2D, model: BikeModel) {
  ctx.save();
  ctx.translate(0, 18);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 34;
  ctx.fillStyle = "rgba(0,0,0,0.38)";
  ctx.beginPath();
  ctx.ellipse(810, 805, 600, 64, -0.03, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  drawWheel(ctx, 430, 695, 142, "#1f1f1d", "#3f3f37");
  drawWheel(ctx, 1118, 695, 152, "#1f1f1d", "#3f3f37");

  const frameGradient = ctx.createLinearGradient(420, 410, 1160, 720);
  frameGradient.addColorStop(0, "#2d2b28");
  frameGradient.addColorStop(0.42, "#55514a");
  frameGradient.addColorStop(1, "#1b1a18");
  ctx.strokeStyle = frameGradient;
  ctx.lineWidth = 32;
  ctx.beginPath();
  ctx.moveTo(432, 662);
  ctx.lineTo(660, 550);
  ctx.lineTo(865, 665);
  ctx.lineTo(1115, 650);
  ctx.moveTo(660, 550);
  ctx.lineTo(780, 410);
  ctx.lineTo(980, 450);
  ctx.lineTo(1115, 650);
  ctx.stroke();

  ctx.strokeStyle = "#737068";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(1070, 520);
  ctx.quadraticCurveTo(1195, 500, 1258, 432);
  ctx.moveTo(1015, 452);
  ctx.lineTo(1215, 355);
  ctx.stroke();

  ctx.fillStyle = "#27231f";
  roundRect(ctx, 665, 500, 285, 82, 36);
  ctx.fill();

  ctx.fillStyle = "#0f0f0e";
  roundRect(ctx, 742, 358, 250, 72, 22);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.82)";
  ctx.font = "700 42px Arial";
  ctx.fillText(model.name.replace("Yamaha ", ""), 682, 554);

  ctx.restore();
}

function drawFallbackRims(ctx: CanvasRenderingContext2D, rim: Rim) {
  const color = rimAccent[rim.id] ?? "#f59e0b";
  drawRim(ctx, 430, 713, 106, color);
  drawRim(ctx, 1118, 713, 113, color);
}

function drawRim(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.65)";
  ctx.lineWidth = 7;
  for (let index = 0; index < 4; index += 1) {
    const angle = index * (Math.PI / 2) + Math.PI / 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * radius * 0.78, y + Math.sin(angle) * radius * 0.78);
    ctx.stroke();
  }

  ctx.fillStyle = "#1d1c1a";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawWheel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  tyreColor: string,
  innerColor: string,
) {
  ctx.fillStyle = tyreColor;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = innerColor;
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(x, y, radius - 28, 0, Math.PI * 2);
  ctx.stroke();
}

function drawFallbackCoverset(ctx: CanvasRenderingContext2D, coverset: Coverset) {
  const accent = coverAccent[coverset.id] ?? { primary: "#f59e0b", secondary: "#a16207" };
  const panel = ctx.createLinearGradient(540, 330, 1060, 660);
  panel.addColorStop(0, accent.primary);
  panel.addColorStop(1, accent.secondary);

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.36)";
  ctx.shadowBlur = 28;
  ctx.fillStyle = panel;

  ctx.beginPath();
  ctx.moveTo(585, 418);
  ctx.bezierCurveTo(710, 318, 875, 330, 1005, 418);
  ctx.lineTo(960, 545);
  ctx.bezierCurveTo(835, 590, 685, 574, 552, 514);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(925, 470);
  ctx.lineTo(1160, 498);
  ctx.lineTo(1240, 590);
  ctx.lineTo(1060, 618);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.16)";
  ctx.beginPath();
  ctx.moveTo(632, 438);
  ctx.bezierCurveTo(748, 370, 854, 372, 952, 430);
  ctx.lineTo(916, 464);
  ctx.bezierCurveTo(800, 422, 714, 426, 632, 472);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#11100e";
  roundRect(ctx, 748, 337, 192, 44, 18);
  ctx.fill();

  ctx.restore();
}

function drawFallbackAccessory(ctx: CanvasRenderingContext2D, accessory: AccessoryLayer) {
  const isGold = accessory.id.includes("gold");
  const color = isGold ? "#fbbf24" : "#e2e8f0";
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 7;

  ctx.beginPath();
  ctx.arc(1018, 437, 18, 0, Math.PI * 2);
  ctx.arc(1174, 371, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(1040, 430);
  ctx.quadraticCurveTo(1140, 410, 1228, 352);
  ctx.stroke();

  ctx.globalAlpha = 0.74;
  roundRect(ctx, 504, 584, 128, 22, 11);
  ctx.fill();
  roundRect(ctx, 990, 628, 138, 22, 11);
  ctx.fill();
  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

type SelectFieldProps = {
  label: string;
  value: string;
  options: Array<{ id: string; name: string }>;
  onChange: (value: string) => void;
};

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-white/10 bg-zinc-950/90 px-3 text-sm font-semibold text-white shadow-inner shadow-black/30"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <dt className="text-sm text-stone-400">{label}</dt>
      <dd className="max-w-[62%] text-right text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}

export function VisualBuilder() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [modelId, setModelId] = useState(setupPackages[0].modelId);
  const [coversetId, setCoversetId] = useState(setupPackages[0].coversetId);
  const [rimId, setRimId] = useState(setupPackages[0].rimId);
  const [accessoryLayerId, setAccessoryLayerId] = useState(setupPackages[0].accessoryLayerId);
  const [copied, setCopied] = useState(false);
  const [missingLayers, setMissingLayers] = useState<string[]>([]);

  const selectedModel = findById(bikeModels, modelId);
  const selectedRim = findById(rims, rimId);
  const selectedAccessory = findById(accessoryLayers, accessoryLayerId);

  const availableCoversets = useMemo(
    () => coversets.filter((coverset) => coverset.suitableModels.includes(modelId)),
    [modelId],
  );

  const selectedCoverset = useMemo(() => {
    const directMatch = coversets.find((coverset) => coverset.id === coversetId);
    if (directMatch?.suitableModels.includes(modelId)) {
      return directMatch;
    }
    return availableCoversets[0] ?? coversets[0];
  }, [availableCoversets, coversetId, modelId]);

  const totalPrice =
    selectedCoverset.estimatedPrice + selectedRim.estimatedPrice + selectedAccessory.estimatedPrice;

  const accent = coverAccent[selectedCoverset.id] ?? { primary: "#f59e0b", secondary: "#a16207" };
  const rimColor = rimAccent[selectedRim.id] ?? accent.primary;

  const themeStyle = {
    "--accent": rimColor,
    "--accent-2": accent.primary,
    "--accent-soft": `${accent.primary}2b`,
  } as CSSProperties;

  const setupText = useMemo(
    () =>
      [
        "Hi Champion Motor, saya berminat setup ini:",
        "",
        `Model: ${selectedModel.name}`,
        `Coverset: ${selectedCoverset.name}`,
        `Rim: ${selectedRim.name}`,
        `Tyre Size: Front ${selectedRim.frontTyre}, Rear ${selectedRim.rearTyre}`,
        `Accessories: ${selectedAccessory.name}`,
        `Estimated Price: RM ${formatPrice(totalPrice)}`,
        "",
        "Boleh quote harga siap pasang?",
      ].join("\n"),
    [selectedAccessory.name, selectedCoverset.name, selectedModel.name, selectedRim, totalPrice],
  );

  useEffect(() => {
    if (!selectedCoverset.suitableModels.includes(modelId)) {
      setCoversetId(availableCoversets[0]?.id ?? coversets[0].id);
    }
  }, [availableCoversets, modelId, selectedCoverset.suitableModels]);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    Promise.all([
      loadCanvasImage(selectedModel.image),
      loadCanvasImage(selectedRim.image),
      loadCanvasImage(selectedCoverset.image),
      loadCanvasImage(selectedAccessory.image),
    ]).then(([baseImage, rimImage, coversetImage, accessoryImage]) => {
      if (cancelled) return;

      drawShowroomBackdrop(context);

      const missing: string[] = [];

      if (baseImage) {
        drawLayerImage(context, baseImage);
      } else {
        missing.push("base bike");
        drawFallbackBase(context, selectedModel);
      }

      if (rimImage) {
        drawLayerImage(context, rimImage);
      } else {
        missing.push("rim");
        drawFallbackRims(context, selectedRim);
      }

      if (coversetImage) {
        drawLayerImage(context, coversetImage);
      } else {
        missing.push("coverset");
        drawFallbackCoverset(context, selectedCoverset);
      }

      if (accessoryImage) {
        drawLayerImage(context, accessoryImage);
      } else {
        missing.push("accessory");
        drawFallbackAccessory(context, selectedAccessory);
      }

      setMissingLayers(missing);
    });

    return () => {
      cancelled = true;
    };
  }, [selectedAccessory, selectedCoverset, selectedModel, selectedRim]);

  function applyPackage(packageId: string) {
    const setup = setupPackages.find((preset) => preset.id === packageId);
    if (!setup) return;
    setModelId(setup.modelId);
    setCoversetId(setup.coversetId);
    setRimId(setup.rimId);
    setAccessoryLayerId(setup.accessoryLayerId);
  }

  function downloadPreview() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `champion-motor-${selectedModel.id}-${selectedCoverset.id}-${selectedRim.id}.png`;
    link.click();
  }

  async function copySetup() {
    await navigator.clipboard.writeText(setupText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function openWhatsApp() {
    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(setupText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main style={themeStyle} className="min-h-screen overflow-hidden text-white">
      <div className="showroom-grid pointer-events-none fixed inset-0 opacity-40" />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-300">
              <Bike size={16} aria-hidden="true" />
              Champion Motor
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-none tracking-normal text-white sm:text-5xl lg:text-6xl">
              Build Your Yamaha Setup
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
              Choose coverset, rim and accessories. Preview before you install.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center sm:min-w-80">
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
              <p className="text-2xl font-black text-white">1600</p>
              <p className="text-xs uppercase tracking-[0.14em] text-stone-500">Export</p>
            </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
              <p className="text-2xl font-black text-white">5</p>
              <p className="text-xs uppercase tracking-[0.14em] text-stone-500">Presets</p>
            </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
              <p className="text-2xl font-black text-white">WA</p>
              <p className="text-xs uppercase tracking-[0.14em] text-stone-500">Quote</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
          <section className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-showroom">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Palette size={18} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-black uppercase tracking-[0.16em]">
                      Live Preview
                    </h2>
                    <p className="truncate text-xs text-stone-400">
                      {selectedCoverset.name} with {selectedRim.name}
                    </p>
                  </div>
                </div>
                <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-stone-300">
                  16:10
                </span>
              </div>

              <div className="bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_46%),#080807] p-2 sm:p-4">
                <canvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  className="aspect-[16/10] h-auto w-full rounded-lg border border-white/10 bg-black"
                  aria-label="Composed motorcycle setup preview"
                />
              </div>
            </div>

            {missingLayers.length > 0 ? (
              <div className="flex items-start gap-3 rounded-lg border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                <ShieldCheck size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                <p>
                  Fallback preview active for {missingLayers.join(", ")} layers. Add the PNG asset
                  pack to <span className="font-mono">public/visual-builder/</span> for exact
                  product renders.
                </p>
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={downloadPreview}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 text-sm font-black text-black transition hover:brightness-110"
              >
                <Download size={18} aria-hidden="true" />
                Download Preview
              </button>
              <button
                type="button"
                onClick={openWhatsApp}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-black text-black transition hover:bg-emerald-400"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp Quote
              </button>
              <button
                type="button"
                onClick={copySetup}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-4 text-sm font-black text-white transition hover:bg-white/20"
              >
                {copied ? <Check size={18} aria-hidden="true" /> : <Clipboard size={18} aria-hidden="true" />}
                {copied ? "Copied" : "Copy Setup"}
              </button>
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <div className="mb-4 flex items-center gap-2">
                <PackageCheck size={18} className="text-[var(--accent)]" aria-hidden="true" />
                <h2 className="text-sm font-black uppercase tracking-[0.16em]">Preset Packages</h2>
              </div>
              <div className="grid gap-2">
                {setupPackages.map((setup) => {
                  const active =
                    setup.modelId === modelId &&
                    setup.coversetId === selectedCoverset.id &&
                    setup.rimId === rimId &&
                    setup.accessoryLayerId === accessoryLayerId;

                  return (
                    <button
                      key={setup.id}
                      type="button"
                      onClick={() => applyPackage(setup.id)}
                      className={`rounded-lg border p-3 text-left transition ${
                        active
                          ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                          : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-[var(--accent)]">
                          <Sparkles size={16} aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-black text-white">{setup.name}</span>
                          <span className="mt-1 block text-xs leading-5 text-stone-400">
                            {setup.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <div className="mb-4 flex items-center gap-2">
                <Palette size={18} className="text-[var(--accent)]" aria-hidden="true" />
                <h2 className="text-sm font-black uppercase tracking-[0.16em]">Manual Selectors</h2>
              </div>
              <div className="grid gap-4">
                <SelectField
                  label="Select Bike Model"
                  value={modelId}
                  options={bikeModels}
                  onChange={setModelId}
                />
                <SelectField
                  label="Select Coverset"
                  value={selectedCoverset.id}
                  options={availableCoversets}
                  onChange={setCoversetId}
                />
                <SelectField label="Select Rim" value={rimId} options={rims} onChange={setRimId} />
                <SelectField
                  label="Select Accessory Package"
                  value={accessoryLayerId}
                  options={accessoryLayers}
                  onChange={setAccessoryLayerId}
                />
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <div className="mb-1 flex items-center justify-between gap-3">
                <h2 className="text-sm font-black uppercase tracking-[0.16em]">Setup Summary</h2>
                <span className="rounded-lg bg-[var(--accent)] px-2.5 py-1 text-xs font-black text-black">
                  RM {formatPrice(totalPrice)}
                </span>
              </div>
              <dl className="mt-3">
                <SummaryRow label="Model" value={selectedModel.name} />
                <SummaryRow label="Coverset" value={selectedCoverset.name} />
                <SummaryRow label="Rim" value={selectedRim.name} />
                <SummaryRow label="Front tyre" value={selectedRim.frontTyre} />
                <SummaryRow label="Rear tyre" value={selectedRim.rearTyre} />
                <SummaryRow label="Accessory package" value={selectedAccessory.name} />
                <SummaryRow label="Estimated total price" value={`RM ${formatPrice(totalPrice)}`} />
              </dl>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
