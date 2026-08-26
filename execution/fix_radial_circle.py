import os
from PIL import Image
import numpy as np

def fix_circle_mask_perfect(src_img_name, out_img_name):
    src_path = os.path.join(".tmp", "extracted_pdf_pages", src_img_name)
    im = Image.open(src_path).convert("RGB")
    w, h = im.size
    arr = np.array(im, dtype=np.uint8)

    cx, cy = w / 2.0, h / 2.0
    R = (min(w, h) / 2.0) - 6

    # Criar uma imagem preenchida com o gradiente de fundo
    # Pegar cor de fundo nas bordas do círculo
    # Vamos verificar onde está o médico e onde está o fundo
    # Fundo superior/lateral é azul vibrante (ex: [20, 50, 200])
    # Vamos criar uma máscara dos pixels fora do círculo
    Y, X = np.ogrid[:h, :w]
    dist = np.sqrt((X - cx)**2 + (Y - cy)**2)
    outside = dist >= R

    # Para substituir os pixels fora do círculo:
    # Pegamos o pixel válido mais próximo na borda do círculo (radial)
    result = arr.copy()
    
    # Preenchimento radial dos cantos pretos com a cor da borda do círculo
    # Normalizar vetor radial
    angle = np.arctan2(Y - cy, X - cx)
    border_x = np.clip((cx + (R - 5) * np.cos(angle)).astype(int), 0, w - 1)
    border_y = np.clip((cy + (R - 5) * np.sin(angle)).astype(int), 0, h - 1)

    for y in range(h):
        for x in range(w):
            if outside[y, x]:
                bx = border_x[y, x]
                by = border_y[y, x]
                result[y, x] = arr[by, bx]

    # Agora fazemos um crop elegante portrait (ex: largura 760, altura 1000) centrado no médico
    fixed_im = Image.fromarray(result)
    crop_w = int(w * 0.72)
    crop_h = int(h * 0.90)
    left = int((w - crop_w) / 2)
    top = int(h * 0.05)
    right = left + crop_w
    bottom = top + crop_h
    
    final_cropped = fixed_im.crop((left, top, right, bottom))
    
    out_path = os.path.join("assets", "images", "doctors", out_img_name)
    final_cropped.save(out_path, quality=98)
    print(f"Salvo {out_img_name}: {final_cropped.size} com fundo totalmente preenchido e sem cantos pretos!")

if __name__ == "__main__":
    fix_circle_mask_perfect("page_10_img_1.png", "dr-alexandre-meireles.jpg")
    fix_circle_mask_perfect("page_9_img_1.png", "dr-jayme-batista.jpg")
