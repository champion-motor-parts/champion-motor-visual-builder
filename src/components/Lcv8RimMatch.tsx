"use client";

import {
  Box,
  ChevronDown,
  Globe2,
  ImageIcon,
  Images,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CoverSetId,
  MotorModelId,
  RimColorId,
  RimModelId,
  ShowroomPreviewAsset,
  coverSets,
  getCoverSetsForMotorModel,
  getPreviewAsset,
  getPreviewAssetsForSetup,
  getRimColorsForSetup,
  getRimModelsForMotorModel,
  getThreeDVariant,
  motorModels,
  rimColors,
  rimModels,
  showroomPreviewAssets,
} from "@/data/showroom";
import { WHATSAPP_PHONE_NUMBER } from "@/lib/config";
import {
  Locale,
  detectPreferredLocale,
  translations,
} from "@/lib/translations";

const MotorcycleModelViewer = dynamic(
  () =>
    import("@/components/MotorcycleModelViewer").then(
      (module) => module.MotorcycleModelViewer,
    ),
  { ssr: false },
);
const ModularMotorcycleViewer = dynamic(
  () =>
    import("@/components/ModularMotorcycleViewer").then(
      (module) => module.ModularMotorcycleViewer,
    ),
  { ssr: false },
);

type ViewMode = "2d" | "3d";

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
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full touch-manipulation rounded-lg border border-white/10 bg-black/50 px-3 text-base font-black text-white outline-none transition hover:border-white/25 focus:border-[var(--accent)] sm:text-sm"
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

type GalleryGridProps = {
  assets: readonly ShowroomPreviewAsset[];
  selectedAsset?: ShowroomPreviewAsset;
  selectedRimModelLabel: string;
  onSelect: (asset: ShowroomPreviewAsset) => void;
};

function GalleryGrid({
  assets,
  selectedAsset,
  selectedRimModelLabel,
  onSelect,
}: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      {assets.map((asset) => {
        const display = getAssetDisplay(asset);
        const isSelected = asset.id === selectedAsset?.id;

        return (
          <button
            key={asset.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(asset)}
            className={[
              "group min-h-44 touch-manipulation rounded-lg border bg-black/50 p-2 text-left transition duration-200 hover:border-[var(--accent)] hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
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
                className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-xs font-black text-white">{display.title}</p>
                <p className="mt-0.5 truncate text-[11px] font-bold text-stone-500">
                  {selectedRimModelLabel}
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
  );
}

export function Lcv8RimMatch() {
  const [locale, setLocale] = useState<Locale>("ms");
  const [motorModelId, setMotorModelId] = useState<MotorModelId>("y15zr");
  const [rimModelId, setRimModelId] = useState<RimModelId>("lcv8_5spoke");
  const [coverSetId, setCoverSetId] = useState<CoverSetId>("mx_blue");
  const [rimColorId, setRimColorId] = useState<RimColorId>("matt_black");
  const [viewMode, setViewMode] = useState<ViewMode>("3d");
  const [viewNotice, setViewNotice] = useState("");
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);

  const t = translations[locale];
  const availableCoverSets = useMemo(
    () => getCoverSetsForMotorModel(motorModelId),
    [motorModelId],
  );
  const availableRimModels = useMemo(
    () => getRimModelsForMotorModel(motorModelId),
    [motorModelId],
  );
  const availableRimColors = useMemo(
    () => getRimColorsForSetup(motorModelId, coverSetId, rimModelId),
    [coverSetId, motorModelId, rimModelId],
  );
  const visibleAssets = useMemo(
    () => getPreviewAssetsForSetup(motorModelId, rimModelId),
    [motorModelId, rimModelId],
  );

  const selectedMotorModel = findMotorModel(motorModelId);
  const selectedRimModel = findRimModel(rimModelId);
  const selectedCoverSet = findCoverSet(coverSetId);
  const selectedRimColor = findRimColor(rimColorId);
  const selectedAsset = getPreviewAsset(motorModelId, coverSetId, rimModelId, rimColorId);
  const selectedThreeDVariant = getThreeDVariant(
    motorModelId,
    coverSetId,
    rimModelId,
    rimColorId,
  );

  const matchingCombinationCount = visibleAssets.length;
  const totalReadyPreviewCount = showroomPreviewAssets.filter(
    (asset) => asset.motorModelId === motorModelId,
  ).length;

  const themeStyle = {
    "--accent": selectedRimColor.hex,
  } as CSSProperties;

  const selectedImageAlt = `${selectedMotorModel.label} ${selectedCoverSet.label} with ${selectedRimColor.label} ${selectedRimModel.label} rims`;

  useEffect(() => {
    const preferredLocale = detectPreferredLocale();
    setLocale(preferredLocale);
    document.documentElement.lang = preferredLocale;
  }, []);

  useEffect(() => {
    if (!availableCoverSets.some((coverSet) => coverSet.id === coverSetId)) {
      setCoverSetId(availableCoverSets[0]?.id ?? coverSets[0].id);
    }
  }, [availableCoverSets, coverSetId]);

  useEffect(() => {
    if (!availableRimModels.some((rimModel) => rimModel.id === rimModelId)) {
      setRimModelId(availableRimModels[0]?.id ?? rimModels[0].id);
    }
  }, [availableRimModels, rimModelId]);

  useEffect(() => {
    if (!availableRimColors.some((rimColor) => rimColor.id === rimColorId)) {
      setRimColorId(availableRimColors[0]?.id ?? rimColors[0].id);
    }
  }, [availableRimColors, rimColorId]);

  useEffect(() => {
    if (viewMode === "3d" && !selectedThreeDVariant) {
      setViewMode("2d");
      setViewNotice(t.view3dUnavailable);
    }
  }, [selectedThreeDVariant, t.view3dUnavailable, viewMode]);

  const handle3DLoadFailure = useCallback(() => {
    setViewMode("2d");
    setViewNotice(translations[locale].modelLoadFailure);
  }, [locale]);

  const whatsappText = useMemo(() => {
    const lines =
      locale === "ms"
        ? [
            "Hi Champion Motor, saya berminat dengan setup ini:",
            "",
            `Model: ${selectedMotorModel.label}`,
            `Set cover: ${selectedCoverSet.label}`,
            `Jenis rim: ${selectedRimModel.label}`,
            `Warna rim: ${selectedRimColor.label}`,
            "",
            "Boleh sahkan harga, stok dan slot pemasangan?",
          ]
        : [
            "Hi Champion Motor, I am interested in this setup:",
            "",
            `Model: ${selectedMotorModel.label}`,
            `Cover set: ${selectedCoverSet.label}`,
            `Rim type: ${selectedRimModel.label}`,
            `Rim colour: ${selectedRimColor.label}`,
            "",
            "Can you confirm the price, stock and installation slot?",
          ];

    return lines.join("\n");
  }, [
    locale,
    selectedCoverSet.label,
    selectedMotorModel.label,
    selectedRimColor.label,
    selectedRimModel.label,
  ]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    whatsappText,
  )}`;

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem("champion-motor-locale", nextLocale);
    document.documentElement.lang = nextLocale;
  }

  function requestThreeDView() {
    if (!selectedThreeDVariant) {
      setViewMode("2d");
      setViewNotice(t.view3dUnavailable);
      return;
    }

    setViewNotice("");
    setViewMode("3d");
  }

  function selectGalleryAsset(asset: ShowroomPreviewAsset) {
    setCoverSetId(asset.coverSetId);
    setRimColorId(asset.rimColorId);
    setViewMode("2d");
    setViewNotice("");
  }

  function changeRimModel(nextRimModelId: RimModelId) {
    setRimModelId(nextRimModelId);
    setViewNotice("");

    if (nextRimModelId === "sp522") {
      if (
        rimColorId !== "matt_black" &&
        rimColorId !== "gloss_black" &&
        rimColorId !== "gold"
      ) {
        setRimColorId("gold");
      }
      setViewMode("3d");
      return;
    }

    if (nextRimModelId === "lcv8_5spoke") {
      if (
        rimColorId !== "matt_black" &&
        rimColorId !== "gloss_black" &&
        rimColorId !== "white"
      ) {
        setRimColorId("matt_black");
      }
      setViewMode("3d");
    }
  }

  function changeCoverSet(nextCoverSetId: CoverSetId) {
    setCoverSetId(nextCoverSetId);
    setViewNotice("");

    const nextAsset = getPreviewAsset(
      motorModelId,
      nextCoverSetId,
      rimModelId,
      rimColorId,
    );
    const nextThreeDVariant = getThreeDVariant(
      motorModelId,
      nextCoverSetId,
      rimModelId,
      rimColorId,
    );

    if (!nextAsset && nextThreeDVariant) {
      setViewMode("3d");
    }
  }

  return (
    <main style={themeStyle} className="min-h-dvh overflow-x-hidden text-white">
      <div className="showroom-grid pointer-events-none fixed inset-0 opacity-40" />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-stone-300">
              <Sparkles size={15} aria-hidden="true" />
              Champion Motor
            </div>
            <h1 className="max-w-3xl text-3xl font-black leading-none text-white sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-6 text-stone-300 sm:mt-4 sm:text-lg sm:leading-7">
              {t.description}
            </p>
          </div>

          <div className="flex items-end justify-between gap-3 sm:flex-col sm:items-end">
            <div
              className="inline-flex rounded-lg border border-white/10 bg-black/50 p-1"
              aria-label={t.language}
            >
              {(["ms", "en"] as const).map((language) => (
                <button
                  key={language}
                  type="button"
                  aria-pressed={locale === language}
                  onClick={() => changeLocale(language)}
                  className={`inline-flex min-h-11 min-w-12 touch-manipulation items-center justify-center gap-1.5 rounded-md px-3 text-xs font-black transition ${
                    locale === language
                      ? "bg-white text-black"
                      : "text-stone-300 hover:bg-white/10"
                  }`}
                >
                  <Globe2 size={15} aria-hidden="true" />
                  {language === "ms" ? "BM" : "EN"}
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/70 px-4 py-3 shadow-showroom">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
                {t.readyImages}
              </p>
              <p className="mt-1 text-2xl font-black text-white sm:text-3xl">
                {totalReadyPreviewCount}
              </p>
              <p className="mt-1 text-xs font-bold text-stone-500">
                {availableCoverSets.length} {t.covers} / {availableRimModels.length} {t.rimDesigns}
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.55fr)]">
          <section className="overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-showroom">
            <div className="border-b border-white/10 px-3 py-3 sm:px-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                    {t.selectedPreview}
                  </p>
                  <h2 className="mt-1 text-base font-black leading-6 text-white sm:text-lg">
                    {selectedMotorModel.shortLabel} / {selectedCoverSet.label} /{" "}
                    {selectedRimModel.shortLabel} {selectedRimColor.label}
                  </h2>
                </div>

                <div
                  className="inline-flex w-full rounded-lg border border-white/10 bg-black/60 p-1 sm:w-auto"
                  aria-label={`${t.view2d} / ${t.view3d}`}
                >
                  <button
                    type="button"
                    aria-pressed={viewMode === "2d"}
                    onClick={() => {
                      setViewMode("2d");
                      setViewNotice("");
                    }}
                    className={`inline-flex min-h-11 flex-1 touch-manipulation items-center justify-center gap-2 rounded-md px-3 text-xs font-black transition sm:flex-none ${
                      viewMode === "2d"
                        ? "bg-white text-black"
                        : "text-stone-300 hover:bg-white/10"
                    }`}
                  >
                    <ImageIcon size={16} aria-hidden="true" />
                    {t.view2d}
                  </button>
                  <button
                    type="button"
                    aria-pressed={viewMode === "3d"}
                    onClick={requestThreeDView}
                    className={`inline-flex min-h-11 flex-1 touch-manipulation items-center justify-center gap-2 rounded-md px-3 text-xs font-black transition sm:flex-none ${
                      viewMode === "3d"
                        ? "bg-[var(--accent)] text-black"
                        : "text-stone-300 hover:bg-white/10"
                    }`}
                  >
                    <Box size={16} aria-hidden="true" />
                    {t.view3d}
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {[selectedMotorModel.label, selectedRimModel.label, t.finishedImage].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-bold text-stone-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,rgba(250,250,247,0.98),rgba(230,227,220,0.98))] p-2 sm:p-4">
              <div className="aspect-[3/2] overflow-hidden rounded-lg border border-black/10 bg-stone-100 shadow-inner">
                {viewMode === "3d" && selectedThreeDVariant?.modular ? (
                  <ModularMotorcycleViewer
                    baseSrc={selectedThreeDVariant.modular.base}
                    coverSetSrc={selectedThreeDVariant.modular.coverSet}
                    frontRimSrc={selectedThreeDVariant.modular.frontRim}
                    rearRimSrc={selectedThreeDVariant.modular.rearRim}
                    rimColor={selectedRimColor.materialHex ?? selectedRimColor.hex}
                    rimFinish={selectedRimColor.finish ?? "metallic"}
                    alt={t.model3d}
                    fallbackImage={selectedAsset?.previewImage}
                    loadingLabel={t.loading3d}
                    resetLabel={t.resetCamera}
                    fullscreenLabel={t.fullscreen}
                    showRimsLabel={t.showRims}
                    hideRimsLabel={t.hideRims}
                    failureLabel={t.modelLoadFailure}
                    onLoadFailure={handle3DLoadFailure}
                  />
                ) : viewMode === "3d" && selectedThreeDVariant?.glb ? (
                  <MotorcycleModelViewer
                    src={selectedThreeDVariant.glb}
                    alt={t.model3d}
                    fallbackImage={selectedAsset?.previewImage}
                    cameraOrbit={selectedThreeDVariant.cameraOrbit}
                    mobileCameraOrbit={selectedThreeDVariant.mobileCameraOrbit}
                    loadingLabel={t.loading3d}
                    resetLabel={t.resetCamera}
                    fullscreenLabel={t.fullscreen}
                    failureLabel={t.modelLoadFailure}
                    onLoadFailure={handle3DLoadFailure}
                  />
                ) : selectedAsset ? (
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
                      {t.previewNeeded}
                    </p>
                    <h3 className="mt-3 max-w-xl text-xl font-black leading-tight sm:text-2xl">
                      {selectedCoverSet.label} / {selectedRimModel.label} / {selectedRimColor.label}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm font-bold leading-6 text-zinc-600">
                      {t.previewNeededBody}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {viewNotice ? (
              <div
                role="status"
                className="border-t border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm font-bold leading-6 text-amber-100"
              >
                {viewNotice}
              </div>
            ) : null}

            <button
              type="button"
              aria-label={mobileGalleryOpen ? t.closeGallery : t.openGallery}
              aria-expanded={mobileGalleryOpen}
              aria-controls="ready-gallery"
              onClick={() => setMobileGalleryOpen((isOpen) => !isOpen)}
              className="flex min-h-12 w-full touch-manipulation items-center justify-between gap-3 border-t border-white/10 bg-zinc-950/90 px-4 text-sm font-black text-white lg:hidden"
            >
              <span className="inline-flex items-center gap-2">
                <Images size={18} className="text-[var(--accent)]" aria-hidden="true" />
                {mobileGalleryOpen ? t.closeGallery : t.openGallery}
              </span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                className={`transition-transform ${mobileGalleryOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id="ready-gallery"
              className={`${mobileGalleryOpen ? "block" : "hidden"} border-t border-white/10 bg-zinc-950/80 p-4 lg:block`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Images size={18} className="text-[var(--accent)]" aria-hidden="true" />
                  <h3 className="text-sm font-black uppercase tracking-[0.16em]">
                    {t.readyGallery}
                  </h3>
                </div>
                <span className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-bold text-stone-300">
                  {matchingCombinationCount} {t.finishedForRim}
                </span>
              </div>

              {visibleAssets.length > 0 ? (
                <div className="mt-3">
                  <GalleryGrid
                    assets={visibleAssets}
                    selectedAsset={selectedAsset}
                    selectedRimModelLabel={selectedRimModel.shortLabel}
                    onSelect={selectGalleryAsset}
                  />
                </div>
              ) : (
                <div className="mt-3 rounded-lg border border-dashed border-white/15 bg-black/40 px-4 py-6 text-center">
                  <p className="text-sm font-black text-white">{t.noFinishedImages}</p>
                  <p className="mt-2 text-xs font-bold leading-5 text-stone-500">
                    {t.noFinishedImagesBody}
                  </p>
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <div className="mb-4 flex items-center gap-2">
                <Wrench size={18} className="text-[var(--accent)]" aria-hidden="true" />
                <h2 className="text-sm font-black uppercase tracking-[0.16em]">{t.selectors}</h2>
              </div>
              <div className="space-y-4">
                <SelectField
                  label={t.motorModel}
                  value={motorModelId}
                  options={motorModels}
                  onChange={(value) => setMotorModelId(value as MotorModelId)}
                />
                <SelectField
                  label={t.rimType}
                  value={rimModelId}
                  options={availableRimModels}
                  onChange={(value) => changeRimModel(value as RimModelId)}
                />
                <SelectField
                  label={t.coverSet}
                  value={coverSetId}
                  options={availableCoverSets}
                  onChange={(value) => changeCoverSet(value as CoverSetId)}
                />
                <SelectField
                  label={t.rimColor}
                  value={rimColorId}
                  options={availableRimColors}
                  onChange={(value) => setRimColorId(value as RimColorId)}
                />
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 shadow-showroom">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[var(--accent)]" aria-hidden="true" />
                <h2 className="text-sm font-black uppercase tracking-[0.16em]">{t.selection}</h2>
              </div>
              <dl className="space-y-3 text-sm">
                {[
                  [t.motor, selectedMotorModel.label],
                  [t.coverSet, selectedCoverSet.label],
                  [t.rimType, selectedRimModel.label],
                  [t.rimColor, selectedRimColor.label],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-white/10 pb-3"
                  >
                    <dt className="text-stone-400">{label}</dt>
                    <dd className="text-right font-bold text-white">{value}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-400">{t.estimatedPrice}</dt>
                  <dd className="text-right font-black text-[var(--accent)]">RM XXX.XX</dd>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold leading-5 text-stone-400">
                  {selectedAsset ? t.ready2d : t.missing2d}
                </div>
              </dl>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-black text-black transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {t.whatsapp}
              </a>
            </section>
          </aside>
        </div>

        <p className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-stone-400">
          {t.footer}
        </p>
      </section>
    </main>
  );
}
