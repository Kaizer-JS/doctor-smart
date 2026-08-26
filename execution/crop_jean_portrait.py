import os
from PIL import Image

def crop_jean_portrait():
    src = r"C:\Users\julio.souza_xcapital\.gemini\antigravity-ide\brain\c7f8d134-c337-44c0-a492-c55ae647356c\.user_uploaded\media_1787760793547.png"
    im = Image.open(src).convert("RGB")
    w, h = im.size
    print(f"Dr. Jean original: {w}x{h}")

    # Enquadramento focado no rosto e busto do Dr. Jean
    # Rosto e cabeça: x: 180 a 460, y: 30 a 350
    # Busto e ombros: x: 100 a 540, y: 10 a 520
    # Cortar o excesso de laptop cinza embaixo e focar na postura médica/executiva do Dr. Jean
    crop_box = (90, 10, 550, 550) # 460x540
    cropped = im.crop(crop_box)

    out_path = os.path.join("assets", "images", "doctors", "dr-jean-teste.jpg")
    cropped.save(out_path, quality=98)
    print(f"Dr. Jean com enquadramento de busto/rosto perfeito: {cropped.size} salvo em {out_path}")

if __name__ == "__main__":
    crop_jean_portrait()
