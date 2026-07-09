"use client";

import { Images, MessageCircle, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  CoverSetId,
  MotorModelId,
  RimColorId,
  RimModelId,
  ShowroomPreviewAsset,
  coverSets,
  getPreviewAsset,
  getPreviewAssetsForSetup,
  motorModels,
  rimColors,
  rimModels,
  showroomPreviewAssets,
} from "@/data/showroom-preview-assets";
import { WHATSAPP_PHONE_NUMBER } from "@/lib/config";

function findMotorModel(id: MotorModelId) {
  return motorModels.find((model) => model.id === id) ?? motorModels[0];
}

function findRimModel(id: RimModelId) {
  return rimModels.find((rimModel) => rimModel.id === id) ?? rimModels[0];
}

function findCoverSet(id: CoverSetId) {
  return coverSets.find((coverSet) => coverSet.id === id) ?? coverSets[0];
}

function findRimColor(id: RimColorId) {
  return rimColors.find((rimColor) => rimColor.id === id) ?? rimColors[0];
}

function getAssetDisplay(asset: ShowroomPreviewAsset) {
  const coverSet = findCoverSet(asset.coverSetId);
  const rimColor = findRimColor(asset.rimColorId);

  return {
    title: `${coverSet.shortLabel} + ${rimColor.label}`,
    subtitle: `${coverSet.label} / ${rimColor.label}`,
    accent: rimColor.hex,
  };
}

type SelectOption = {
  id: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
};

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-stone-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-white/10 bg-black/50 px-3 text-sm font-black text-white outline-none transition hover:border-white/25 focus:border-[var(--accent)]"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id} className="bg-zinc-950 text-white">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Lcv8RimMatch() {
  const [motorModelId, setMotorModelId] = useState<MotorModelId>("y16zr");
  const [rimModelId, setRimModelId] = useState<RimModelId>("lcv8_5spoke");
  const [coverSetId, setCoverSetId] = useState<CoverSetId>("red_black_white");
  const [rimColorId, setRimColorId] = useState<RimColorId>("red");

  const visibleAssets = useMemo(
    () => getPreviewAssetsForSetup(motorModelId, rimModelId),
    [motorModelId, rimModelId],
  );

  const selectedMotorModel = findMotorModel(motorModelId);
  const selectedRimModel = findRimModel(rimModelId);
  const selectedCoverSet = findCoverSet(coverSetId);
  const selectedRimColor = findRimColor(rimColorId);
  const selectedAsset = getPreviewAsset(motorModelId, coverSetId, rimModelId, rimColorId);

  const matchingCombinationCount = visibleAssets.length;
  const totalReadyPreviewCount = showroomPreviewAssets.filter(
    (asset) => asset.motorModelId === motorModelId,
  ).length;

  const themeStyle = {
    "--accent": selectedRimColor.hex,
  } as CSSProperties;

  const selectedImageAlt = `${selectedMotorModel.label} ${selectedCoverSet.label} with ${selectedRimColor.label} ${selectedRimModel.label} rims`;

  const whatsappText = useMemo(
    () =>
      [
        "Hi Champion Motor, saya berminat setup ini:",
        "",
        `Model: ${selectedMotorModel.label}`,
        `Cover Set: ${selectedCoverSet.label}`,
        `Rim Type: ${selectedRimModel.label}`,
        `Rim Color: ${selectedRimColor.label}`,
        "",
        "Boleh confirm harga, stock dan slot pemasangan?",
      ].join("\n"),
    [
      selectedCoverSet.label,
      selectedMotorModel.label,
      selectedRimColor.label,
      selectedRimModel.label,
    ],
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
              Motor Visual Match
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
              Select model, cover set and rim setup to view ready-made showroom previews.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-zinc-950/70 px-4 py-3 shadow-showroom">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
              Ready Images
            </p>
            <p className="mt-1 text-3xl font-black text-white">{totalReadyPreviewCount}</p>
            <p className="mt-1 text-xs font-bold text-stone-500">
              {coverSets.length} covers / {rimModels.length} rim designs
            </p>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.55fr)]">
          <section className="overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-showroom">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                  Selected Preview
                </p>
                <h2 className="mt-1 text-lg font-black text-white">
                  {selectedMotorModel.shortLabel} / {selectedCoverSet.label} /{" "}
                  {selectedRimModel.shortLabel} {selectedRimColor.label}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {[selectedMotorModel.label, selectedRimModel.label, "Finished Image"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-bold text-stone-200"
                    >
                      {badge}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,rgba(250,250,247,0.98),rgba(230,227,220,0.98))] p-2 sm:p-4">
              <div className="aspect-[3/2] overflow-hidden rounded-lg border border-black/10 bg-stone-100 shadow-inner">
                {selectedAsset ? (
                  <Image
                    key={selectedAsset.previewImage}
                    src={selectedAsset.previewImage}
                    width={1536}
                    height={1024}
                    priority
                    sizes="(min-width: 1024px) 68vw, 100vw"
                    alt={selectedImageAlt}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center px-6 text-center text-zinc-900">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                      Preview Image Needed
                    </p>
                    <h3 className="mt-3 max-w-xl text-2xl font-black leading-tight">
                      {selectedCoverSet.label} with {selectedRimModel.label}{" "}
                      {selectedRimColor.label}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm font-bold leading-6 text-zinc-600">
                      This setup is selectable for quotation, but its finished showroom PNG has not
                      been added yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 bg-zinc-950/80 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Images size={18} className="text-[var(--accent)]" aria-hidden="true" />
                  <h3 className="text-sm font-black uppercase tracking-[0.16em]">
                    Ready Gallery
                  </h3>
                </div>
                <span className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-bold text-stone-300">
                  {matchingCombinationCount} finished images for this rim
                </span>
              </div>

              {visibleAssets.length > 0 ? (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                  {visibleAssets.map((asset) => {
                    const display = getAssetDisplay(asset);
                    const isSelected = asset.id === selectedAsset?.id;

                    return (
                      <button
                        key={asset.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setCoverSetId(asset.coverSetId);
                          setRimColorId(asset.rimColorId);
                        }}
                        className={[
                          "group min-h-44 rounded-lg border bg-black/50 p-2 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                          isSelected
                            ? "border-[var(--accent)] shadow-[0_0_0_1px_var(--accent)]"
                            : "border-white/10",
                        ].join(" ")}
                      >
                        <div className="aspect-[3/2] overflow-hidden rounded-md bg-stone-100">
                          <Image
                            src={asset.previewImage}
                            width={360}
                            height={240}
                            sizes="(min-width: 1280px) 12vw, (min-width: 640px) 28vw, 45vw"
                            loading="lazy"
                            alt={display.subtitle}
                            className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-xs font-black text-white">
                              {display.title}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] font-bold text-stone-500">
                              {selectedRimModel.shortLabel}
                            </p>
                          </div>
                          <span
                            className="h-3 w-3 shrink-0 rounded-full border border-white/40"
                            style={{ backgroundColor: display.accent }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-3 rounded-lg border border-dashed border-white/15 bg-black/40 px-4 py-6 text-center">
                  <p className="text-sm font-black text-white">
                    No finished PNGs for {selectedRimModel.label} yet.
                  </p>
                  <p className="mt-2 text-xs font-bold leading-5 text-stone-500">
                    The rim design is ready in the selector. Add finished preview images later to
                    turn this into a clickable gallery.
                  </p>
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <div className="mb-4 flex items-center gap-2">
                <Wrench size={18} className="text-[var(--accent)]" aria-hidden="true" />
                <h2 className="text-sm font-black uppercase tracking-[0.16em]">Selectors</h2>
              </div>
              <div className="space-y-4">
                <SelectField
                  label="Motor Model"
                  value={motorModelId}
                  options={motorModels}
                  onChange={(value) => setMotorModelId(value as MotorModelId)}
                />
                <SelectField
                  label="Rim Type"
                  value={rimModelId}
                  options={rimModels}
                  onChange={(value) => setRimModelId(value as RimModelId)}
                />
                <SelectField
                  label="Cover Set"
                  value={coverSetId}
                  options={coverSets}
                  onChange={(value) => setCoverSetId(value as CoverSetId)}
                />
                <SelectField
                  label="Rim Color"
                  value={rimColorId}
                  options={rimColors}
                  onChange={(value) => setRimColorId(value as RimColorId)}
                />
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[var(--accent)]" aria-hidden="true" />
                <h2 className="text-sm font-black uppercase tracking-[0.16em]">Selection</h2>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Motor</dt>
                  <dd className="text-right font-bold text-white">{selectedMotorModel.label}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Cover Set</dt>
                  <dd className="text-right font-bold text-white">{selectedCoverSet.label}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Rim Type</dt>
                  <dd className="text-right font-bold text-white">{selectedRimModel.label}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-stone-400">Rim Color</dt>
                  <dd className="text-right font-bold text-white">{selectedRimColor.label}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-400">Estimated Price</dt>
                  <dd className="text-right font-black text-[var(--accent)]">RM XXX.XX</dd>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold leading-5 text-stone-400">
                  {selectedAsset
                    ? "This setup has a finished showroom image."
                    : "This setup is selectable, but the finished showroom image still needs to be added."}
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
          Finished preview images are prepared combinations. Missing combinations are hidden until
          image assets are added.
        </p>
      </section>
    </main>
  );
}
