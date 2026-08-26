import urllib.request
import os

def ensure_all_local():
    output_dir = os.path.join("assets", "images", "doctors")
    os.makedirs(output_dir, exist_ok=True)

    extras = [
        ("dra-marilia-daltro.jpg", "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"),
        ("dr-marcos-prado.jpg", "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400")
    ]

    for filename, url in extras:
        target = os.path.join(output_dir, filename)
        if not os.path.exists(target):
            urllib.request.urlretrieve(url, target)
            print(f"Baixado {filename}")

    # Atualizar data.js
    with open("assets/js/data.js", "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace('"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"', '"assets/images/doctors/dra-marilia-daltro.jpg"')
    content = content.replace('"https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"', '"assets/images/doctors/dr-marcos-prado.jpg"')

    with open("assets/js/data.js", "w", encoding="utf-8") as f:
        f.write(content)

    print("data.js atualizado com fotos locais completas!")

if __name__ == "__main__":
    ensure_all_local()
