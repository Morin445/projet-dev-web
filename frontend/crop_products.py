from PIL import Image, ImageOps
from pathlib import Path

base_dir = Path(r"c:\Users\MORIN-PC\Desktop\Mon Projet Perso\projet-dev-web\frontend\src\assets\images\products")
files = [
    'blazer-celeste.jpg.png',
    'chemise-ebene.jpg.png',
    'jupe-plisse.jpg.png',
    'lunette-solaire.jpg.png',
    'pull.merinos.jpg.png',
    'robe-corail.jpg.png',
    'sac-cabas.jpg.png',
    'sneakers-minimale.jpg.png',
]

for name in files:
    path = base_dir / name
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    w, h = img.size
    crop_w = max(24, int(w * 0.055))
    crop_h = max(24, int(h * 0.055))
    cropped = img.crop((0, 0, w - crop_w, h - crop_h))
    resized = cropped.resize((w, h), Image.Resampling.LANCZOS)
    resized.save(path, optimize=True)
    print(f'processed {name}')
