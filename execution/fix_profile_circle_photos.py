import os
from PIL import Image, ImageOps
import numpy as np

def fix_all_photos_for_circle_and_card():
    tmp_dir = os.path.join(".tmp", "extracted_pdf_pages")
    output_dir = os.path.join("assets", "images", "doctors")

    # Mapeamento com ajustes finos de cada médico:
    # (src_file, target_filename, top_margin_needed, crop_tuple)
    
    # 1. Dra. Maria Cristina (page_3_img_1.jpeg: 720x1280)
    # A cabeça está encostada no topo. Vamos adicionar 90px de fundo no topo (copiando a cor do topo)
    im = Image.open(os.path.join(tmp_dir, "page_3_img_1.jpeg")).convert("RGB")
    w, h = im.size
    top_color = tuple(np.mean(np.array(im)[0:10, :, :], axis=(0, 1)).astype(int))
    # Criar nova imagem com margem superior
    new_im = Image.new("RGB", (w, h + 100), top_color)
    new_im.paste(im, (0, 100))
    # Crop focado no busto com a cabeça centralizada
    crop_mc = new_im.crop((0, 0, w, int(w * 1.25)))
    crop_mc.save(os.path.join(output_dir, "dra-maria-cristina.jpg"), quality=98)
    print("Dra. Maria Cristina corrigida com margem no topo.")

    # 2. Dr. José Henrique (page_2_img_1.jpeg: 720x1280)
    im = Image.open(os.path.join(tmp_dir, "page_2_img_1.jpeg")).convert("RGB")
    w, h = im.size
    top_color = tuple(np.mean(np.array(im)[0:10, :, :], axis=(0, 1)).astype(int))
    new_im = Image.new("RGB", (w, h + 100), top_color)
    new_im.paste(im, (0, 100))
    crop_jh = new_im.crop((0, 0, w, int(w * 1.25)))
    crop_jh.save(os.path.join(output_dir, "dr-jose-henrique.jpg"), quality=98)
    print("Dr. José Henrique corrigido.")

    # 3. Dr. Francisco Tourinho (page_4_img_1.jpeg: 720x1280)
    im = Image.open(os.path.join(tmp_dir, "page_4_img_1.jpeg")).convert("RGB")
    w, h = im.size
    top_color = tuple(np.mean(np.array(im)[0:10, :, :], axis=(0, 1)).astype(int))
    new_im = Image.new("RGB", (w, h + 100), top_color)
    new_im.paste(im, (0, 100))
    crop_ft = new_im.crop((0, 0, w, int(w * 1.25)))
    crop_ft.save(os.path.join(output_dir, "dr-francisco-tourinho.jpg"), quality=98)
    print("Dr. Francisco Tourinho corrigido.")

    # 4. Dra. Ana Rita (page_5_img_1.jpeg: 720x1280)
    im = Image.open(os.path.join(tmp_dir, "page_5_img_1.jpeg")).convert("RGB")
    w, h = im.size
    top_color = tuple(np.mean(np.array(im)[0:10, :, :], axis=(0, 1)).astype(int))
    new_im = Image.new("RGB", (w, h + 100), top_color)
    new_im.paste(im, (0, 100))
    crop_ar = new_im.crop((0, 0, w, int(w * 1.25)))
    crop_ar.save(os.path.join(output_dir, "dra-ana-rita.jpg"), quality=98)
    print("Dra. Ana Rita corrigida.")

    # 5. Dra. Carla Ferreira (page_6_img_1.jpeg: 720x1280)
    im = Image.open(os.path.join(tmp_dir, "page_6_img_1.jpeg")).convert("RGB")
    w, h = im.size
    top_color = tuple(np.mean(np.array(im)[0:10, :, :], axis=(0, 1)).astype(int))
    new_im = Image.new("RGB", (w, h + 100), top_color)
    new_im.paste(im, (0, 100))
    crop_cf = new_im.crop((0, 0, w, int(w * 1.25)))
    crop_cf.save(os.path.join(output_dir, "dra-carla-ferreira.jpg"), quality=98)
    print("Dra. Carla Ferreira corrigida.")

    # 6. Dra. Denise Santana (page_7_img_1.jpeg: 720x1280)
    im = Image.open(os.path.join(tmp_dir, "page_7_img_1.jpeg")).convert("RGB")
    w, h = im.size
    top_color = tuple(np.mean(np.array(im)[0:10, :, :], axis=(0, 1)).astype(int))
    new_im = Image.new("RGB", (w, h + 100), top_color)
    new_im.paste(im, (0, 100))
    crop_ds = new_im.crop((0, 0, w, int(w * 1.25)))
    crop_ds.save(os.path.join(output_dir, "dra-denise-santana.jpg"), quality=98)
    print("Dra. Denise Santana corrigida.")

    # 7. Dra. Mariana Rocha (page_11_img_1.jpeg: 720x1280)
    im = Image.open(os.path.join(tmp_dir, "page_11_img_1.jpeg")).convert("RGB")
    w, h = im.size
    top_color = tuple(np.mean(np.array(im)[0:10, :, :], axis=(0, 1)).astype(int))
    new_im = Image.new("RGB", (w, h + 100), top_color)
    new_im.paste(im, (0, 100))
    crop_mr = new_im.crop((0, 0, w, int(w * 1.25)))
    crop_mr.save(os.path.join(output_dir, "dra-mariana-rocha.jpg"), quality=98)
    print("Dra. Mariana Rocha corrigida.")

    # 8. Dra. Flavia Holanda (page_12_img_1.jpeg: 720x1280)
    im = Image.open(os.path.join(tmp_dir, "page_12_img_1.jpeg")).convert("RGB")
    w, h = im.size
    top_color = tuple(np.mean(np.array(im)[0:10, :, :], axis=(0, 1)).astype(int))
    new_im = Image.new("RGB", (w, h + 100), top_color)
    new_im.paste(im, (0, 100))
    crop_fh = new_im.crop((0, 0, w, int(w * 1.25)))
    crop_fh.save(os.path.join(output_dir, "dra-flavia-holanda.jpg"), quality=98)
    print("Dra. Flavia Holanda corrigida.")

    # 9. Dra. Kelly Fontes (page_13_img_1.jpeg: 720x1280)
    im = Image.open(os.path.join(tmp_dir, "page_13_img_1.jpeg")).convert("RGB")
    w, h = im.size
    top_color = tuple(np.mean(np.array(im)[0:10, :, :], axis=(0, 1)).astype(int))
    new_im = Image.new("RGB", (w, h + 100), top_color)
    new_im.paste(im, (0, 100))
    crop_kf = new_im.crop((0, 0, w, int(w * 1.25)))
    crop_kf.save(os.path.join(output_dir, "dra-kelly-fontes.jpg"), quality=98)
    print("Dra. Kelly Fontes corrigida.")

    # 10. Dr. Eduardo Doria (page_8_img_1.png: 799x1968)
    im = Image.open(os.path.join(tmp_dir, "page_8_img_1.png")).convert("RGB")
    w, h = im.size
    # Dr. Doria: rosto em y=200 a 700, x=150 a 700. Margem superior de 60px
    crop_ed = im.crop((100, 100, 780, 1000))
    crop_ed.save(os.path.join(output_dir, "dr-eduardo-doria.jpg"), quality=98)
    print("Dr. Eduardo Doria ajustado.")

    # 11. Dra. Séfora Oliveira (page_1_img_1.jpeg)
    im_sef = Image.open(os.path.join(tmp_dir, "page_1_img_1.jpeg")).convert("RGB")
    w, h = im_sef.size
    arr_sef = np.array(im_sef)
    # Limpar texto
    for y in range(100, 1400):
        sample = arr_sef[y, 570:610, :]
        mean_color = np.mean(sample, axis=0)
        for x in range(650, w):
            if y < 880:
                alpha = min(1.0, (x - 650) / 30.0)
                arr_sef[y, x] = (1 - alpha) * arr_sef[y, x] + alpha * mean_color
            elif y >= 880 and x > 950:
                alpha = min(1.0, (x - 950) / 20.0)
                arr_sef[y, x] = (1 - alpha) * arr_sef[y, x] + alpha * mean_color
            elif y >= 1100 and x > 800:
                alpha = min(1.0, (x - 800) / 30.0)
                arr_sef[y, x] = (1 - alpha) * arr_sef[y, x] + alpha * mean_color

    clean_sef = Image.fromarray(arr_sef)
    # Fazer crop com margem acima da cabeça para o círculo não cortar o topo
    crop_sef = clean_sef.crop((30, 20, 950, 1200))
    crop_sef.save(os.path.join(output_dir, "dra-sefora-oliveira.jpg"), quality=98)
    print("Dra. Séfora perfeitamente enquadrada com folga no topo.")

    # 12. Dr. Alexandre Meireles (page_10_img_1.png: 1254x1254)
    im_al = Image.open(os.path.join(tmp_dir, "page_10_img_1.png")).convert("RGB")
    w, h = im_al.size
    arr_al = np.array(im_al)
    cx, cy, R = w / 2.0, h / 2.0, (w / 2.0) - 6
    Y, X = np.ogrid[:h, :w]
    angle = np.arctan2(Y - cy, X - cx)
    bx = np.clip((cx + (R - 6) * np.cos(angle)).astype(int), 0, w - 1)
    by = np.clip((cy + (R - 6) * np.sin(angle)).astype(int), 0, h - 1)
    arr_al[np.sqrt((X - cx)**2 + (Y - cy)**2) >= R] = arr_al[by[np.sqrt((X - cx)**2 + (Y - cy)**2) >= R], bx[np.sqrt((X - cx)**2 + (Y - cy)**2) >= R]]
    crop_al = Image.fromarray(arr_al).crop((140, 20, 1114, 1220))
    crop_al.save(os.path.join(output_dir, "dr-alexandre-meireles.jpg"), quality=98)
    print("Dr. Alexandre Meireles com folga no topo e sem bordas.")

    # 13. Dr. Jayme Batista (page_9_img_1.png: 1254x1254)
    im_jb = Image.open(os.path.join(tmp_dir, "page_9_img_1.png")).convert("RGB")
    w, h = im_jb.size
    arr_jb = np.array(im_jb)
    cx, cy, R = w / 2.0, h / 2.0, (w / 2.0) - 6
    Y, X = np.ogrid[:h, :w]
    angle = np.arctan2(Y - cy, X - cx)
    bx = np.clip((cx + (R - 6) * np.cos(angle)).astype(int), 0, w - 1)
    by = np.clip((cy + (R - 6) * np.sin(angle)).astype(int), 0, h - 1)
    arr_jb[np.sqrt((X - cx)**2 + (Y - cy)**2) >= R] = arr_jb[by[np.sqrt((X - cx)**2 + (Y - cy)**2) >= R], bx[np.sqrt((X - cx)**2 + (Y - cy)**2) >= R]]
    crop_jb = Image.fromarray(arr_jb).crop((140, 20, 1114, 1220))
    crop_jb.save(os.path.join(output_dir, "dr-jayme-batista.jpg"), quality=98)
    print("Dr. Jayme Batista com folga no topo e sem bordas.")

if __name__ == "__main__":
    fix_all_photos_for_circle_and_card()
