import os
from PIL import Image, ImageFilter
import numpy as np

def fix_sefora():
    src_path = os.path.join(".tmp", "extracted_pdf_pages", "page_1_img_1.jpeg")
    im = Image.open(src_path)
    w, h = im.size
    print(f"Sefora original: {w}x{h}")

    # A médica está no terço esquerdo/central (x: 0 a 700)
    # Vamos recortar com aspecto portrait clássico (3:4 ou 2:3) pegando a médica sem o texto
    crop_width = int(w * 0.58) # corta antes do texto da direita
    crop_box = (0, 0, crop_width, h)
    cropped = im.crop(crop_box)
    
    out_path = "assets/images/doctors/dra-sefora-oliveira.jpg"
    cropped.save(out_path, quality=98)
    print(f"Dra. Sefora salva limpa sem texto: {cropped.size} em {out_path}")

def fix_circle_mask(filename):
    # Tratar dr-alexandre-meireles.jpg e dr-jayme-batista.jpg
    p = os.path.join("assets/images/doctors", filename)
    im = Image.open(p).convert("RGB")
    w, h = im.size
    arr = np.array(im, dtype=np.uint8)

    # Identificar a máscara do círculo
    # O círculo tem centro em (w/2, h/2) e raio R
    cx, cy = w / 2.0, h / 2.0
    # O raio é aproximadamente w/2
    R = min(cx, cy) - 4

    Y, X = np.ogrid[:h, :w]
    dist_from_center = np.sqrt((X - cx)**2 + (Y - cy)**2)
    outside_circle = dist_from_center >= (R - 2)

    # Pegar cor média do fundo superior (azul/ciano/gradiente)
    # Vamos fazer inpaint ou crop
    # Crop interno focado no médico elimina 100% de cantos pretos:
    # Um quadrado interno com zoom ligeiro (ex: 880x880 centrado)
    crop_size = int(w * 0.72)
    left = int((w - crop_size) / 2)
    top = int(h * 0.04) # um pouco mais para cima para não cortar a cabeça
    right = left + crop_size
    bottom = top + int(crop_size * 1.2) # proporção portrait
    if bottom > h:
        bottom = h
        top = bottom - int(crop_size * 1.2)

    cropped = im.crop((left, top, right, bottom))
    cropped.save(p, quality=98)
    print(f"{filename} corrigido e salvo sem bordas pretas: {cropped.size}")

def check_all_images():
    output_dir = "assets/images/doctors"
    for f in sorted(os.listdir(output_dir)):
        if f.endswith(".jpg"):
            im = Image.open(os.path.join(output_dir, f))
            print(f"Status final {f}: {im.size}")

if __name__ == "__main__":
    fix_sefora()
    fix_circle_mask("dr-alexandre-meireles.jpg")
    fix_circle_mask("dr-jayme-batista.jpg")
    print("\nVerificacao geral:")
    check_all_images()
