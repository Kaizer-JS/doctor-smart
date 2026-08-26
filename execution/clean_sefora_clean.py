import os
from PIL import Image, ImageFilter
import numpy as np

def clean_sefora_background():
    src_path = os.path.join(".tmp", "extracted_pdf_pages", "page_1_img_1.jpeg")
    im = Image.open(src_path).convert("RGB")
    w, h = im.size
    print(f"Dra. Séfora original: {w}x{h}")
    arr = np.array(im)

    # O texto está localizado aproximadamente em:
    # x: de ~680 até ~1180
    # y: de ~250 até ~850 (texto 'Comece o ano...') e y: ~1100 a ~1300 (logo 'AS')
    
    # A parede limpa com as mesmas linhas horizontais está em x: 520 a 660 na mesma faixa Y
    # Vamos fazer uma amostragem limpa da parede em x: 550 a 620 para cada linha Y
    # e preencher a região do texto com suavização gradiente
    
    result = arr.copy()
    
    # Para cada linha y da imagem (de y=100 até y=1400):
    # Onde tem texto/logo no lado direito (x >= 650):
    # Podemos clonar a textura limpa da parede de x in [560:640]
    
    for y in range(120, 1400):
        # Amostra de parede limpa entre o cabelo/braço e o início do texto
        # Pegar fatia limpa de 40 pixels
        sample = arr[y, 570:610, :]
        mean_color = np.mean(sample, axis=0)
        # Preencher de x=650 até x=w com a cor/gradiente correspondente à linha Y
        # Adicionar sutil gradiente horizontal para casar com a iluminação
        for x in range(650, w):
            # Se não for a mão/papel segurado pela médica
            # A mão segurando papel está em x: 600 a 1100, y > 880
            if y < 880:
                # Região do texto superior 'Comece o ano...'
                # Fazer interpolação suave da borda
                alpha = min(1.0, (x - 650) / 30.0)
                result[y, x] = (1 - alpha) * result[y, x] + alpha * mean_color
            elif y >= 880 and x > 950:
                # Região à direita do papel/mão
                alpha = min(1.0, (x - 950) / 20.0)
                result[y, x] = (1 - alpha) * result[y, x] + alpha * mean_color
            elif y >= 1100 and x > 800:
                # Logo inferior 'AS'
                alpha = min(1.0, (x - 800) / 30.0)
                result[y, x] = (1 - alpha) * result[y, x] + alpha * mean_color

    cleaned_im = Image.fromarray(result)
    
    # Agora centralizamos a médica mantendo o enquadramento natural e proporcional
    # Sem zoom exagerado, com a médica perfeitamente no terço central/esquerdo harmonioso
    # Cortar apenas as margens externas desnecessárias para aspecto padrão 3:4 (900x1200)
    # x: de 40 a 1040 (largura 1000), y: de 80 a 1380 (altura 1300)
    final_crop = cleaned_im.crop((40, 80, 1040, 1380))
    
    out_path = "assets/images/doctors/dra-sefora-oliveira.jpg"
    final_crop.save(out_path, quality=98)
    print(f"Dra. Séfora perfeitamente limpa salva em: {final_crop.size}")

if __name__ == "__main__":
    clean_sefora_background()
