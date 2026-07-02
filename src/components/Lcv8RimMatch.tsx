"use client";

import { MessageCircle, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import {
  BodyShellId,
  RimColorId,
  bodyShells,
  getPreviewAsset,
  rimColors,
} from "@/data/lcv8-preview-assets";
import { WHATSAPP_PHONE_NUMBER } from "@/lib/config";

const badges = ["Stock Body", "LCV8 5-Spoke", "Front + Rear", "Direct Fit"];

function findBodyShell(id: BodyShellId) {
  return bodyShells.find((bodyShell) => bodyShell.id === id) ?? bodyShells[0];
}

function findRimColor(id: RimColorId) {
  return rimColors.find((rimColor) => rimColor.id === id) ?? rimColors[0];
}

type ImageTileProps = {
  active: boolean;
  image: string;
  label: string;
  accent: string;
  onClick: () => void;
};

function ImageTile({ active, image, label, accent, onClick }: ImageTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group min-w-28 rounded-lg border p-2 text-left transition ${
        active
          ? "border-[var(--accent)] bg-white/10"
          : "border-white/10 bg-black/30 hover:border-white/25 hover:bg-white/5"
      }`}
    >
      <span className="relative block aspect-square overflow-hidden rounded-md bg-zinc-950">
        <img src={image} alt={label} className="h-full w-full object-contain p-2" />
        <span
          className="absolute bottom-1.5 right-1.5 h-3 w-3 rounded-full border border-white/50"
          style={{ backgroundColor: accent }}
        />
      </span>
      <span className="mt-2 block truncate text-xs font-bold text-white">{label}</span>
    </button>
  );
}

type BodyTileProps = {
  active: boolean;
  image: string;
  label: string;
  onClick: () => void;
};

function BodyTile({ active, image, label, onClick }: BodyTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid grid-cols-[76px_minmax(0,1fr)] items-center gap-3 rounded-lg border p-2 text-left transition ${
        active
          ? "border-[var(--accent)] bg-white/10"
          : "border-white/10 bg-black/30 hover:border-white/25 hover:bg-white/5"
      }`}
    >
      <span className="block aspect-[4/3] overflow-hidden rounded-md bg-zinc-950">
        <img src={image} alt={label} className="h-full w-full object-contain p-1.5" />
      </span>
      <span className="min-w-0 truncate text-sm font-black text-white">{label}</span>
    </button>
  );
}

export function Lcv8RimMatch() {
  const [bodyShellId, setBodyShellId] = useState<BodyShellId>("cyan_orange");
  const [rimColorId, setRimColorId] = useState<RimColorId>("blue");

  const selectedBodyShell = findBodyShell(bodyShellId);
  const selectedRim = findRimColor(rimColorId);
  const selectedAsset = getPreviewAsset(bodyShellId, rimColorId) ?? getPreviewAsset("cyan_orange", "blue");
  const previewImage = selectedAsset?.previewImage ?? "/visual-builder/lcv8/previews/cyan_orange__blue.png";

  const themeStyle = {
    "--accent": selectedRim.hex,
  } as CSSProperties;

  const whatsappText = useMemo(
    () =>
      [
        "Hi Champion Motor, saya berminat setup ini:",
        "",
        "Model: Yamaha Y15ZR",
        `Body Shell: ${selectedBodyShell.label}`,
        `Rim: LCV8 ${selectedRim.label}`,
        "Rim Design: 5-spoke",
        "Tyre Size: Front 70/90-17, Rear 80/90-17",
        "",
        "Boleh confirm harga, stock dan slot pemasangan?",
      ].join("\n"),
    [selectedBodyShell.label, selectedRim.label],
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    whatsappText,
  )}`;

  return (
    <main style={themeStyle} className="min-h-screen overflow-hidden text-white">
      <div className="showroom-grid pointer-events-none fixed inset-0 opacity-40" />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-stone-300">
              <Sparkles size={15} aria-hidden="true" />
              Champion Motor
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-none text-white sm:text-5xl lg:text-6xl">
              Y15ZR LCV8 Rim Match
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
              Match stock body shell options with LCV8 5-spoke front and rear rim colors.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-zinc-950/70 px-4 py-3 shadow-showroom">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
              Price Placeholder
            </p>
            <p className="mt-1 text-3xl font-black text-white">RM XXX.XX</p>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(330px,0.65fr)]">
          <section className="overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-showroom">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                  Selected Preview
                </p>
                <h2 className="mt-1 text-lg font-black text-white">
                  {selectedBodyShell.label} + {selectedRim.label}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-bold text-stone-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_48%),#080807] p-2 sm:p-4">
              <div className="aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
                <img
                  key={previewImage}
                  src={previewImage}
                  alt={selectedAsset?.id ?? `${bodyShellId}__${rimColorId}`}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <div className="mb-3 flex items-center gap-2">
                <Wrench size={18} className="text-[var(--accent)]" aria-hidden="true" />
                <h2 className="text-sm font-black uppercase tracking-[0.16em]">Stock Body</h2>
              </div>
              <div className="grid gap-2">
                {bodyShells.map((bodyShell) => (
                  <BodyTile
                    key={bodyShell.id}
                    active={bodyShell.id === bodyShellId}
                    image={bodyShell.thumbnail}
                    label={bodyShell.label}
                    onClick={() => setBodyShellId(bodyShell.id)}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[var(--accent)]" aria-hidden="true" />
                <h2 className="text-sm font-black uppercase tracking-[0.16em]">
                  LCV8 5-Spoke Rim
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                {rimColors.map((rimColor) => (
                  <ImageTile
                    key={rimColor.id}
                    active={rimColor.id === rimColorId}
                    image={rimColor.thumbnail}
                    label={rimColor.label}
                    accent={rimColor.hex}
                    onClick={() => setRimColorId(rimColor.id)}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Model</dt>
                  <dd className="text-right font-bold text-white">Yamaha Y15ZR</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Body Shell</dt>
                  <dd className="text-right font-bold text-white">{selectedBodyShell.label}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Rim</dt>
                  <dd className="text-right font-bold text-white">LCV8 {selectedRim.label}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Rim Design</dt>
                  <dd className="text-right font-bold text-white">5-spoke</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Tyre Size</dt>
                  <dd className="text-right font-bold text-white">F 70/90-17 / R 80/90-17</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-400">Estimated Price</dt>
                  <dd className="text-right font-black text-[var(--accent)]">RM XXX.XX</dd>
                </div>
              </dl>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-black text-black transition hover:bg-emerald-400"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp Stock Check
              </a>
            </section>
          </aside>
        </div>

        <p className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-stone-400">
          Visual Preview Only - Final result depends on actual product and installation
        </p>
      </section>
    </main>
  );
}
