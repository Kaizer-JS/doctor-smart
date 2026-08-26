import os
from PIL import Image

def process_dr_jean():
    src = r"C:\Users\julio.souza_xcapital\.gemini\antigravity-ide\brain\c7f8d134-c337-44c0-a492-c55ae647356c\.user_uploaded\media_1787760793547.png"
    im = Image.open(src).convert("RGB")
    w, h = im.size
    print(f"Dr. Jean original: {w}x{h}")

    # A imagem enviada tem o Dr. Jean (rosto centralizado no terço superior, cortina azul no fundo)
    # A imagem tem 640x640 com margens/barras borradas laterais (estilo post vertical colocado em quadrado)
    # Vamos verificar se há barras laterais:
    # A parte central da foto está entre x: 35 e x: 605
    crop_jean = im.crop((35, 0, 605, 640))
    
    # Salvar em alta qualidade
    out_path = os.path.join("assets", "images", "doctors", "dr-jean-teste.jpg")
    crop_jean.save(out_path, quality=98)
    print(f"Foto do Dr. Jean atualizada com sucesso em: {crop_jean.size} -> {out_path}")

if __name__ == "__main__":
    process_dr_jean()
