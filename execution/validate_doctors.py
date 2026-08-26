import re
import os

def main():
    with open("assets/js/data.js", "r", encoding="utf-8") as f:
        content = f.read()

    docs = re.findall(r'id:\s*"([^"]+)",\s*name:\s*"([^"]+)",.*?photo:\s*"([^"]+)"', content, re.DOTALL)
    print(f"Total de medicos em data.js: {len(docs)}")
    all_ok = True
    for doc_id, name, photo in docs:
        exists = os.path.exists(photo)
        status = "OK" if exists else "ERRO"
        print(f"[{status}] {name} ({doc_id}) -> {photo}")
        if not exists:
            all_ok = False

    if all_ok:
        print("\nTODAS AS FOTOS LOCAIS FORAM ENCONTRADAS E VERIFICADAS COM SUCESSO!")
    else:
        print("\nATENCAO: Existem fotos ausentes!")

if __name__ == "__main__":
    main()
