import json
import re
import os
import shutil
from PIL import Image

def get_data_doctors():
    with open("assets/js/data.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Procurar blocos de medicos
    doctor_blocks = re.findall(r'\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)"', content)
    return doctor_blocks

def main():
    doctors = get_data_doctors()
    print(f"Total de medicos em data.js: {len(doctors)}")
    for i, (doc_id, name) in enumerate(doctors, 1):
        print(f"{i}. ID: {doc_id} -> Nome: {name}")

    # Verificar imagens extraidas do PDF
    tmp_dir = os.path.join(".tmp", "extracted_pdf_pages")
    files = os.listdir(tmp_dir)
    print("\nArquivos extraidos do PDF:")
    for f in sorted(files):
        print(" ", f)

if __name__ == "__main__":
    main()
