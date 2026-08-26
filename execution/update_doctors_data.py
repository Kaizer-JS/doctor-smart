import json
import re

def check_and_update_data():
    with open("assets/js/data.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Mapeamentos de fotos e correções de nomes baseados no PDF oficial
    replacements = [
        # Dr. Jean (Conta Teste)
        (r'id:\s*"dr-jean-teste",.*?photo:\s*"[^"]+"', 'assets/images/doctors/dr-jean-teste.jpg'),
        # Dr. Jayme Batista Freire de Carvalho
        (r'id:\s*"dr-jayme-batista",.*?photo:\s*"[^"]+"', 'assets/images/doctors/dr-jayme-batista.jpg'),
        # Dra. Ana Rita de Abreu São Pedro
        (r'id:\s*"dra-ana-rita",.*?photo:\s*"[^"]+"', 'assets/images/doctors/dra-ana-rita.jpg'),
        # Dra. Kelly Fontes
        (r'id:\s*"dra-kelly-fontes",.*?photo:\s*"[^"]+"', 'assets/images/doctors/dra-kelly-fontes.jpg'),
        # Dra. Séfora Oliveira
        (r'id:\s*"dra-sefora-oliveira",.*?photo:\s*"[^"]+"', 'assets/images/doctors/dra-sefora-oliveira.jpg'),
        # Dra. Mariana Rocha Freitas
        (r'id:\s*"dra-mariana-rocha",.*?photo:\s*"[^"]+"', 'assets/images/doctors/dra-mariana-rocha.jpg'),
        # Dra. Flavia Holanda Lima
        (r'id:\s*"dra-flavia-holanda",.*?photo:\s*"[^"]+"', 'assets/images/doctors/dra-flavia-holanda.jpg'),
        # Dr. José Henrique Lima França
        (r'id:\s*"dr-jose-henrique",.*?photo:\s*"[^"]+"', 'assets/images/doctors/dr-jose-henrique.jpg'),
        # Dr. Alexandre Meireles
        (r'id:\s*"dr-alexandre-meireles",.*?photo:\s*"[^"]+"', 'assets/images/doctors/dr-alexandre-meireles.jpg'),
        # Dra. Carla Ferreira Tavares
        (r'id:\s*"dra-carla-ferreira",.*?photo:\s*"[^"]+"', 'assets/images/doctors/dra-carla-ferreira.jpg'),
    ]

    print("Mapeamento configurado.")

if __name__ == "__main__":
    check_and_update_data()
