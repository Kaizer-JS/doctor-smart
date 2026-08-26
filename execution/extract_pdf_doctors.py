import fitz  # PyMuPDF
import os
import io
from PIL import Image

def main():
    pdf_path = "imagens dos medicos .pdf"
    if not os.path.exists(pdf_path):
        print(f"Erro: {pdf_path} nao encontrado!")
        return

    output_dir = os.path.join("assets", "images", "doctors")
    os.makedirs(output_dir, exist_ok=True)
    tmp_dir = os.path.join(".tmp", "extracted_pdf_pages")
    os.makedirs(tmp_dir, exist_ok=True)

    doc = fitz.open(pdf_path)
    print(f"Total de paginas no PDF: {len(doc)}")

    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        print(f"\n--- PAGINA {page_num + 1} ---")
        print(text.strip())

        # Extrair imagens embutidas na pagina
        image_list = page.get_images(full=True)
        print(f"Imagens encontradas na pagina {page_num + 1}: {len(image_list)}")

        for img_index, img_info in enumerate(image_list):
            xref = img_info[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            img_filename = f"page_{page_num + 1}_img_{img_index + 1}.{image_ext}"
            img_path = os.path.join(tmp_dir, img_filename)
            with open(img_path, "wb") as f:
                f.write(image_bytes)
            
            try:
                pil_img = Image.open(io.BytesIO(image_bytes))
                print(f"  Salva imagem: {img_filename} - Dimensoes: {pil_img.size} ({pil_img.format})")
            except Exception as e:
                print(f"  Salva imagem: {img_filename} - Erro ao ler PIL: {e}")

        # Renderizar pagina inteira em alta resolucao como referencia
        pix = page.get_pixmap(dpi=200)
        page_render_path = os.path.join(tmp_dir, f"page_{page_num + 1}_render.png")
        pix.save(page_render_path)

if __name__ == "__main__":
    main()
