import re

def main():
    with open("assets/js/data.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Atualizações precisas
    updates = [
        ("dr-jean-teste", "assets/images/doctors/dr-jean-teste.jpg", None),
        ("dr-jayme-batista", "assets/images/doctors/dr-jayme-batista.jpg", "Dr. Jayme Batista Freire de Carvalho"),
        ("dra-ana-rita", "assets/images/doctors/dra-ana-rita.jpg", "Dra. Ana Rita de Abreu São Pedro"),
        ("dra-kelly-fontes", "assets/images/doctors/dra-kelly-fontes.jpg", "Dra. Kelly Fontes"),
        ("dra-sefora-oliveira", "assets/images/doctors/dra-sefora-oliveira.jpg", "Dra. Séfora Oliveira"),
        ("dra-mariana-rocha", "assets/images/doctors/dra-mariana-rocha.jpg", "Dra. Mariana Rocha Freitas"),
        ("dra-flavia-holanda", "assets/images/doctors/dra-flavia-holanda.jpg", "Dra. Flavia Holanda Lima"),
        ("dr-jose-henrique", "assets/images/doctors/dr-jose-henrique.jpg", "Dr. José Henrique Lima França"),
        ("dr-alexandre-meireles", "assets/images/doctors/dr-alexandre-meireles.jpg", "Dr. Alexandre Meireles"),
        ("dra-carla-ferreira", "assets/images/doctors/dra-carla-ferreira.jpg", "Dra. Carla Ferreira Tavares"),
        ("dra-andrea-carla", "assets/images/doctors/dra-denise-santana.jpg", "Dra. Denise Santana"),
        ("dr-carlos-daniel", "assets/images/doctors/dr-eduardo-doria.jpg", "Dr. Eduardo Doria Pinto Rodrigues da Costa"),
        ("dr-francisco-rego", "assets/images/doctors/dr-francisco-tourinho.jpg", "Dr. Francisco Tourinho Corte Imperial"),
        ("dra-marcia-cristina", "assets/images/doctors/dra-maria-cristina.jpg", "Dra. Maria Cristina Mesquita De Oliveira"),
    ]

    for doc_id, photo_path, new_name in updates:
        # Substituir photo do médico
        pattern = r'(id:\s*"' + doc_id + r'".*?photo:\s*)"[^"]+"'
        if re.search(pattern, content, re.DOTALL):
            content = re.sub(pattern, r'\1"' + photo_path + '"', content, count=1, flags=re.DOTALL)
            print(f"Atualizada foto para {doc_id}: {photo_path}")
        else:
            print(f"Nao encontrado padrao para {doc_id}")

        if new_name:
            name_pattern = r'(id:\s*"' + doc_id + r'".*?name:\s*)"[^"]+"'
            content = re.sub(name_pattern, r'\1"' + new_name + '"', content, count=1, flags=re.DOTALL)
            print(f"  Atualizado nome para {doc_id}: {new_name}")

    with open("assets/js/data.js", "w", encoding="utf-8") as f:
        f.write(content)

    print("\nArquivo data.js atualizado com sucesso!")

if __name__ == "__main__":
    main()
