"use client";

import { MessageCircle, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  CoverSetId,
  MotorModelId,
  RimColorId,
  RimModelId,
  coverSets,
  getAvailableCoverSets,
  getAvailableRimColors,
  getPreviewAsset,
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

  const availableCoverSets = useMemo(
    () => getAvailableCoverSets(motorModelId, rimModelId),
    [motorModelId, rimModelId],
  );

  const availableRimColors = useMemo(
    () => getAvailableRimColors(motorModelId, coverSetId, rimModelId),
    [motorModelId, coverSetId, rimModelId],
  );

  useEffect(() => {
    if (!availableCoverSets.some((coverSet) => coverSet.id === coverSetId)) {
      const firstCoverSet = availableCoverSets[0];
      if (firstCoverSet) {
        setCoverSetId(firstCoverSet.id);
      }
    }
  }, [availableCoverSets, coverSetId]);

  useEffect(() => {
    if (!availableRimColors.some((rimColor) => rimColor.id === rimColorId)) {
      const firstRimColor = availableRimColors[0];
      if (firstRimColor) {
        setRimColorId(firstRimColor.id);
      }
    }
  }, [availableRimColors, rimColorId]);

  const selectedMotorModel = findMotorModel(motorModelId);
  const selectedRimModel = findRimModel(rimModelId);
  const selectedCoverSet = findCoverSet(coverSetId);
  const selectedRimColor = findRimColor(rimColorId);
  const selectedAsset =
    getPreviewAsset(motorModelId, coverSetId, rimModelId, rimColorId) ?? showroomPreviewAssets[0];

  const matchingCombinationCount = showroomPreviewAssets.filter(
    (asset) => asset.motorModelId === motorModelId && asset.rimModelId === rimModelId,
  ).length;

  const themeStyle = {
    "--accent": selectedRimColor.hex,
  } as CSSProperties;

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
              Ready Previews
            </p>
            <p className="mt-1 text-3xl font-black text-white">{matchingCombinationCount}</p>
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
                <img
                  key={selectedAsset.previewImage}
                  src={selectedAsset.previewImage}
                  alt={selectedAsset.id}
                  className="h-full w-full object-contain"
                />
              </div>
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
                  options={availableCoverSets}
                  onChange={(value) => setCoverSetId(value as CoverSetId)}
                />
                <SelectField
                  label="Rim Color"
                  value={rimColorId}
                  options={availableRimColors}
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
