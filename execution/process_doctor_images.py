import os
import re
from PIL import Image

def process_images():
    output_dir = os.path.join("assets", "images", "doctors")
    os.makedirs(output_dir, exist_ok=True)
    tmp_dir = os.path.join(".tmp", "extracted_pdf_pages")

    # Mapeamento do PDF para ID e Nome
    mapping = [
        {"page": 1, "img": "page_1_img_1.jpeg", "id": "dra-sefora-oliveira", "name": "Dra. Séfora Oliveira"},
        {"page": 2, "img": "page_2_img_1.jpeg", "id": "dr-jose-henrique", "name": "Dr. José Henrique Lima França"},
        {"page": 3, "img": "page_3_img_1.jpeg", "id": "dra-maria-cristina", "name": "Dra. Maria Cristina Mesquita De Oliveira"},
        {"page": 4, "img": "page_4_img_1.jpeg", "id": "dr-francisco-tourinho", "name": "Dr. Francisco Tourinho Corte Imperial"},
        {"page": 5, "img": "page_5_img_1.jpeg", "id": "dra-ana-rita", "name": "Dra. Ana Rita de Abreu São Pedro"},
        {"page": 6, "img": "page_6_img_1.jpeg", "id": "dra-carla-ferreira", "name": "Dra. Carla Ferreira Tavares"},
        {"page": 7, "img": "page_7_img_1.jpeg", "id": "dra-denise-santana", "name": "Dra. Denise Santana"},
        {"page": 8, "img": "page_8_img_1.png", "id": "dr-eduardo-doria", "name": "Dr. Eduardo Doria Pinto Rodrigues da Costa"},
        {"page": 9, "img": "page_9_img_1.png", "id": "dr-jayme-batista", "name": "Dr. Jayme Batista Freire de Carvalho"},
        {"page": 10, "img": "page_10_img_1.png", "id": "dr-alexandre-meireles", "name": "Dr. Alexandre Meireles"},
        {"page": 11, "img": "page_11_img_1.jpeg", "id": "dra-mariana-rocha", "name": "Dra. Mariana Rocha Freitas"},
        {"page": 12, "img": "page_12_img_1.jpeg", "id": "dra-flavia-holanda", "name": "Dra. Flavia Holanda Lima"},
        {"page": 13, "img": "page_13_img_1.jpeg", "id": "dra-kelly-fontes", "name": "Dra. Kelly Fontes"}
    ]

    for item in mapping:
        src_path = os.path.join(tmp_dir, item["img"])
        if not os.path.exists(src_path):
            print(f"Aviso: {src_path} nao existe!")
            continue

        im = Image.open(src_path)
        # Se for RGBA e salvar como JPEG, converter para RGB
        if im.mode in ("RGBA", "P"):
            im = im.convert("RGB")

        # Salvar versão original em alta qualidade em assets/images/doctors/
        target_filename = f"{item['id']}.jpg"
        target_path = os.path.join(output_dir, target_filename)
        im.save(target_path, "JPEG", quality=95)
        print(f"Salvo: {target_filename} ({im.size[0]}x{im.size[1]}) para {item['name']}")

if __name__ == "__main__":
    process_images()
