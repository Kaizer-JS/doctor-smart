import os
from PIL import Image

def crop_sefora_zoom():
    src_path = os.path.join(".tmp", "extracted_pdf_pages", "page_1_img_1.jpeg")
    im = Image.open(src_path).convert("RGB")
    w, h = im.size
    print(f"Original: {w}x{h}")

    # Rosto e busto da Dra. Séfora (foco total sem pegar o texto da direita)
    # x de 40 a 580 (largura 540)
    # y de 100 a 820 (altura 720)
    # Proporção portrait clássica 3:4 (540x720)
    crop_box = (40, 100, 580, 820)
    cropped = im.crop(crop_box)
    
    out_path = "assets/images/doctors/dra-sefora-oliveira.jpg"
    cropped.save(out_path, quality=98)
    print(f"Salva com zoom perfeito e limpo: {cropped.size} em {out_path}")

if __name__ == "__main__":
    crop_sefora_zoom()
