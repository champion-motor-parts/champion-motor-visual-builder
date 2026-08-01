export type Locale = "ms" | "en";

const en = {
  language: "Language",
  title: "Motor Visual Match",
  description: "Select a model, cover set and rim setup to preview the finished look.",
  readyImages: "Ready Images",
  covers: "covers",
  rimDesigns: "rim designs",
  selectedPreview: "Selected Preview",
  finishedImage: "Finished Image",
  view2d: "2D View",
  view3d: "3D View",
  previewNeeded: "Preview Image Needed",
  previewNeededBody: "This setup can be quoted, but its finished showroom PNG is not ready yet.",
  view3dUnavailable: "3D is not available for this exact setup. The 2D preview is still shown.",
  modelLoadFailure: "The 3D model could not be loaded. The matching 2D preview has been restored.",
  openGallery: "Show Ready Gallery",
  closeGallery: "Hide Ready Gallery",
  readyGallery: "Ready Gallery",
  finishedForRim: "finished images for this rim",
  noFinishedImages: "No finished PNGs for this rim yet.",
  noFinishedImagesBody: "The option remains available for quotation and will use 2D fallback.",
  selectors: "Selectors",
  motorModel: "Motor Model",
  rimType: "Rim Type",
  coverSet: "Cover Set",
  rimColor: "Rim Color",
  selection: "Selection",
  motor: "Motor",
  estimatedPrice: "Estimated Price",
  ready2d: "A finished 2D showroom image is available for this setup.",
  missing2d: "This setup is selectable, but its finished 2D image still needs to be added.",
  whatsapp: "WhatsApp Stock Check",
  footer: "Only verified product images and models are shown.",
  loading3d: "Loading 3D model",
  resetCamera: "Reset Camera",
  fullscreen: "Fullscreen",
  model3d: "Interactive 3D motorcycle model",
};

const ms: Record<keyof typeof en, string> = {
  language: "Bahasa",
  title: "Padanan Visual Motosikal",
  description: "Pilih model, set cover dan rim untuk melihat anggaran rupa selepas dipasang.",
  readyImages: "Imej Sedia",
  covers: "set cover",
  rimDesigns: "rekaan rim",
  selectedPreview: "Pratonton Dipilih",
  finishedImage: "Imej Siap",
  view2d: "Paparan 2D",
  view3d: "Paparan 3D",
  previewNeeded: "Imej Pratonton Diperlukan",
  previewNeededBody: "Setup ini boleh diminta harga, tetapi PNG showroom masih belum siap.",
  view3dUnavailable: "Paparan 3D belum tersedia untuk setup tepat ini. Pratonton 2D masih dipaparkan.",
  modelLoadFailure: "Model 3D gagal dimuatkan. Pratonton 2D yang sepadan telah dipulihkan.",
  openGallery: "Buka Galeri Sedia",
  closeGallery: "Tutup Galeri Sedia",
  readyGallery: "Galeri Sedia",
  finishedForRim: "imej siap untuk rim ini",
  noFinishedImages: "Belum ada PNG siap untuk rim ini.",
  noFinishedImagesBody: "Pilihan ini kekal tersedia untuk pertanyaan dan akan menggunakan paparan 2D.",
  selectors: "Pilihan",
  motorModel: "Model Motosikal",
  rimType: "Jenis Rim",
  coverSet: "Set Cover",
  rimColor: "Warna Rim",
  selection: "Pilihan Semasa",
  motor: "Motosikal",
  estimatedPrice: "Anggaran Harga",
  ready2d: "Imej showroom 2D siap tersedia untuk setup ini.",
  missing2d: "Setup ini boleh dipilih, tetapi imej 2D siap masih perlu ditambah.",
  whatsapp: "Semak Stok WhatsApp",
  footer: "Hanya imej dan model produk yang telah disahkan dipaparkan.",
  loading3d: "Memuatkan model 3D",
  resetCamera: "Set Semula Kamera",
  fullscreen: "Skrin Penuh",
  model3d: "Model motosikal 3D interaktif",
};

export const translations = { en, ms };

export function detectPreferredLocale(): Locale {
  const savedLocale = window.localStorage.getItem("champion-motor-locale");
  if (savedLocale === "ms" || savedLocale === "en") {
    return savedLocale;
  }

  const language = window.navigator.language.toLowerCase();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isMalaysian = language.startsWith("ms") || language.endsWith("-my") || timeZone === "Asia/Kuala_Lumpur";

  return isMalaysian ? "ms" : "en";
}
