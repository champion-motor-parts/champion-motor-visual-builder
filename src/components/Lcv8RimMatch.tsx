"use client";

import { MessageCircle, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import {
  BodyShellId,
  RimColorId,
  bodyShells,
  frontTyreSize,
  getPreviewImage,
  rearTyreSize,
  rimColors,
  y15zrModelName,
} from "@/data/lcv8-rim-match";
import { WHATSAPP_PHONE_NUMBER } from "@/lib/config";

const badges = ["Stock Body", "LCV8 5-Spoke", "Front + Rear", "Direct Fit"];

function findBodyShell(id: BodyShellId) {
  return bodyShells.find((bodyShell) => bodyShell.id === id) ?? bodyShells[0];
}

function findRimColor(id: RimColorId) {
  return rimColors.find((rimColor) => rimColor.id === id) ?? rimColors[0];
}

function bodyLabel(id: BodyShellId) {
  return findBodyShell(id).shortName;
}

function rimLabel(id: RimColorId) {
  return findRimColor(id).shortName;
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
        <Image src={image} alt={label} fill sizes="112px" className="object-contain p-2" />
        <span
          className="absolute bottom-1.5 right-1.5 h-3 w-3 rounded-full border border-white/50"
          style={{ backgroundColor: accent }}
        />
      </span>
      <span className="mt-2 block truncate text-xs font-bold text-white">{label}</span>
    </button>
  );
}

type SelectorButtonProps = {
  active: boolean;
  label: string;
  accent: string;
  onClick: () => void;
};

function SelectorButton({ active, label, accent, onClick }: SelectorButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm font-bold transition ${
        active
          ? "border-[var(--accent)] bg-white/10 text-white"
          : "border-white/10 bg-black/30 text-stone-300 hover:border-white/25 hover:bg-white/5"
      }`}
    >
      <span>{label}</span>
      <span
        className="h-3 w-3 shrink-0 rounded-full border border-white/50"
        style={{ backgroundColor: accent }}
      />
    </button>
  );
}

export function Lcv8RimMatch() {
  const [bodyShellId, setBodyShellId] = useState<BodyShellId>("cyan_orange");
  const [rimColorId, setRimColorId] = useState<RimColorId>("magenta");

  const selectedBody = findBodyShell(bodyShellId);
  const selectedRim = findRimColor(rimColorId);
  const previewImage = getPreviewImage(bodyShellId, rimColorId);

  const themeStyle = {
    "--accent": selectedRim.accent,
    "--body-accent": selectedBody.accent,
  } as CSSProperties;

  const whatsappText = useMemo(
    () =>
      [
        "Hi Champion Motor, saya berminat dengan Y15ZR LCV8 Rim Match ini:",
        "",
        `Model: ${y15zrModelName}`,
        `Body: ${selectedBody.shortName}`,
        `Rim Color: ${selectedRim.shortName}`,
        `Rim Design: LCV8 5-Spoke Front + Rear`,
        `Tyre Size: Front ${frontTyreSize}, Rear ${rearTyreSize}`,
        "Estimated Price: RM XXX.XX",
        "",
        "Boleh check stock dan installation slot?",
      ].join("\n"),
    [selectedBody.shortName, selectedRim.shortName],
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
                  {bodyLabel(bodyShellId)} + {rimLabel(rimColorId)}
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
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
                <Image
                  src={previewImage}
                  alt={`${y15zrModelName} ${bodyLabel(bodyShellId)} with ${rimLabel(
                    rimColorId,
                  )} LCV8 5-spoke rims`}
                  fill
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  className="object-contain"
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
                  <SelectorButton
                    key={bodyShell.id}
                    active={bodyShell.id === bodyShellId}
                    label={bodyShell.shortName}
                    accent={bodyShell.accent}
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
                    image={rimColor.image}
                    label={rimColor.shortName}
                    accent={rimColor.accent}
                    onClick={() => setRimColorId(rimColor.id)}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Model</dt>
                  <dd className="text-right font-bold text-white">{y15zrModelName}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Body</dt>
                  <dd className="text-right font-bold text-white">{selectedBody.shortName}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Rim Color</dt>
                  <dd className="text-right font-bold text-white">{selectedRim.shortName}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Tyre Size</dt>
                  <dd className="text-right font-bold text-white">
                    F {frontTyreSize} / R {rearTyreSize}
                  </dd>
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
          Visual Preview Only • Final result depends on actual product and installation
        </p>
      </section>
    </main>
  );
}
