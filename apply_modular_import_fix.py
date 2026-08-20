from pathlib import Path

path = Path("src/components/ModularMotorcycleViewer.tsx")
text = path.read_text(encoding="utf-8")

text = text.replace(
    'from "three/examples/jsm/controls/OrbitControls.js";',
    'from "three/addons/controls/OrbitControls.js";',
)
text = text.replace(
    'from "three/examples/jsm/loaders/DRACOLoader.js";',
    'from "three/addons/loaders/DRACOLoader.js";',
)
text = text.replace(
    'from "three/examples/jsm/loaders/GLTFLoader.js";',
    'from "three/addons/loaders/GLTFLoader.js";',
)

path.write_text(text, encoding="utf-8")
print("Patched src/components/ModularMotorcycleViewer.tsx")
