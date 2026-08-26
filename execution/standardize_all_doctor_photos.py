import os
from PIL import Image, ImageFilter
import numpy as np

def standardize_all_doctor_photos():
    output_dir = os.path.join("assets", "images", "doctors")
    tmp_dir = os.path.join(".tmp", "extracted_pdf_pages")
    os.makedirs(output_dir, exist_ok=True)

    # 1. Dra. Séfora Oliveira (page_1_img_1.jpeg: 1206x1468)
    # Foco no rosto e busto da médica (cortar texto da direita e enquadrar busto)
    im_sefora = Image.open(os.path.join(tmp_dir, "page_1_img_1.jpeg")).convert("RGB")
    # Coordenadas do busto: x: 100 a 750, y: 150 a 1050
    w, h = im_sefora.size
    crop_sefora = im_sefora.crop((60, 120, 760, 1050))
    crop_sefora.save(os.path.join(output_dir, "dra-sefora-oliveira.jpg"), quality=98)
    print(f"Dra. Séfora padronizada: {crop_sefora.size}")

    # 2. Dr. Eduardo Doria (page_8_img_1.png: 799x1968)
    # Foco apenas no rosto/busto do médico no jaleco (remover pessoa da esquerda e corpo inteiro)
    im_doria = Image.open(os.path.join(tmp_dir, "page_8_img_1.png")).convert("RGB")
    w, h = im_doria.size
    # Dr. Doria está no topo: x de 130 a 760, y de 180 a 980
    crop_doria = im_doria.crop((120, 160, 780, 1020))
    crop_doria.save(os.path.join(output_dir, "dr-eduardo-doria.jpg"), quality=98)
    print(f"Dr. Eduardo Doria padronizado: {crop_doria.size}")

    # 3. Dr. Alexandre Meireles (page_10_img_1.png: 1254x1254)
    # Preencher cantos pretos da máscara circular e enquadrar busto
    im_alex = Image.open(os.path.join(tmp_dir, "page_10_img_1.png")).convert("RGB")
    w, h = im_alex.size
    arr_alex = np.array(im_alex)
    cx, cy, R = w / 2.0, h / 2.0, (w / 2.0) - 6
    Y, X = np.ogrid[:h, :w]
    angle = np.arctan2(Y - cy, X - cx)
    border_x = np.clip((cx + (R - 6) * np.cos(angle)).astype(int), 0, w - 1)
    border_y = np.clip((cy + (R - 6) * np.sin(angle)).astype(int), 0, h - 1)
    outside = np.sqrt((X - cx)**2 + (Y - cy)**2) >= R
    arr_alex[outside] = arr_alex[border_y[outside], border_x[outside]]
    clean_alex = Image.fromarray(arr_alex)
    # Crop portrait limpo focado no busto
    crop_alex = clean_alex.crop((160, 80, 1094, 1200))
    crop_alex.save(os.path.join(output_dir, "dr-alexandre-meireles.jpg"), quality=98)
    print(f"Dr. Alexandre Meireles padronizado: {crop_alex.size}")

    # 4. Dr. Jayme Batista (page_9_img_1.png: 1254x1254)
    im_jayme = Image.open(os.path.join(tmp_dir, "page_9_img_1.png")).convert("RGB")
    w, h = im_jayme.size
    arr_jayme = np.array(im_jayme)
    cx, cy, R = w / 2.0, h / 2.0, (w / 2.0) - 6
    Y, X = np.ogrid[:h, :w]
    angle = np.arctan2(Y - cy, X - cx)
    border_x = np.clip((cx + (R - 6) * np.cos(angle)).astype(int), 0, w - 1)
    border_y = np.clip((cy + (R - 6) * np.sin(angle)).astype(int), 0, h - 1)
    outside = np.sqrt((X - cx)**2 + (Y - cy)**2) >= R
    arr_jayme[outside] = arr_jayme[border_y[outside], border_x[outside]]
    clean_jayme = Image.fromarray(arr_jayme)
    crop_jayme = clean_jayme.crop((160, 80, 1094, 1200))
    crop_jayme.save(os.path.join(output_dir, "dr-jayme-batista.jpg"), quality=98)
    print(f"Dr. Jayme Batista padronizado: {crop_jayme.size}")

    # 5. Dra. Denise Santana (page_7_img_1.jpeg: 720x1280)
    im_denise = Image.open(os.path.join(tmp_dir, "page_7_img_1.jpeg")).convert("RGB")
    crop_denise = im_denise.crop((0, 0, 720, 960))
    crop_denise.save(os.path.join(output_dir, "dra-denise-santana.jpg"), quality=98)

    # 6. Dr. José Henrique (page_2_img_1.jpeg: 720x1280)
    im_jose = Image.open(os.path.join(tmp_dir, "page_2_img_1.jpeg")).convert("RGB")
    crop_jose = im_jose.crop((0, 0, 720, 960))
    crop_jose.save(os.path.join(output_dir, "dr-jose-henrique.jpg"), quality=98)

    # 7. Dra. Maria Cristina (page_3_img_1.jpeg: 720x1280)
    im_maria = Image.open(os.path.join(tmp_dir, "page_3_img_1.jpeg")).convert("RGB")
    crop_maria = im_maria.crop((0, 0, 720, 960))
    crop_maria.save(os.path.join(output_dir, "dra-maria-cristina.jpg"), quality=98)

    # 8. Dr. Francisco Tourinho (page_4_img_1.jpeg: 720x1280)
    im_tour = Image.open(os.path.join(tmp_dir, "page_4_img_1.jpeg")).convert("RGB")
    crop_tour = im_tour.crop((0, 0, 720, 960))
    crop_tour.save(os.path.join(output_dir, "dr-francisco-tourinho.jpg"), quality=98)

    # 9. Dra. Ana Rita (page_5_img_1.jpeg: 720x1280)
    im_anarita = Image.open(os.path.join(tmp_dir, "page_5_img_1.jpeg")).convert("RGB")
    crop_anarita = im_anarita.crop((0, 0, 720, 960))
    crop_anarita.save(os.path.join(output_dir, "dra-ana-rita.jpg"), quality=98)

    # 10. Dra. Carla Ferreira (page_6_img_1.jpeg: 720x1280)
    im_carla = Image.open(os.path.join(tmp_dir, "page_6_img_1.jpeg")).convert("RGB")
    crop_carla = im_carla.crop((0, 0, 720, 960))
    crop_carla.save(os.path.join(output_dir, "dra-carla-ferreira.jpg"), quality=98)

    # 11. Dra. Mariana Rocha (page_11_img_1.jpeg: 720x1280)
    im_mariana = Image.open(os.path.join(tmp_dir, "page_11_img_1.jpeg")).convert("RGB")
    crop_mariana = im_mariana.crop((0, 0, 720, 960))
    crop_mariana.save(os.path.join(output_dir, "dra-mariana-rocha.jpg"), quality=98)

    # 12. Dra. Flavia Holanda (page_12_img_1.jpeg: 720x1280)
    im_flavia = Image.open(os.path.join(tmp_dir, "page_12_img_1.jpeg")).convert("RGB")
    crop_flavia = im_flavia.crop((0, 0, 720, 960))
    crop_flavia.save(os.path.join(output_dir, "dra-flavia-holanda.jpg"), quality=98)

    # 13. Dra. Kelly Fontes (page_13_img_1.jpeg: 720x1280)
    im_kelly = Image.open(os.path.join(tmp_dir, "page_13_img_1.jpeg")).convert("RGB")
    crop_kelly = im_kelly.crop((0, 0, 720, 960))
    crop_kelly.save(os.path.join(output_dir, "dra-kelly-fontes.jpg"), quality=98)

    print("\nTodas as fotos foram calibradas e padronizadas com sucesso!")

if __name__ == "__main__":
    standardize_all_doctor_photos()
