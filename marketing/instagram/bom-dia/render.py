"""Gera a arte do bom dia (1080x1350 JPG).
python3 render.py TEMA "FRASE" "REFERENCIA_OU_VAZIO" AAAA-MM-DD saida.jpg [story]  (story = 1080x1920)
TEMA: carinho | respeito | deus | motivacao"""
import sys, os, urllib.parse
from playwright.sync_api import sync_playwright
from PIL import Image
tema, frase, ref, data, out = sys.argv[1:6]
fmt = sys.argv[6] if len(sys.argv) > 6 else 'feed'; H = 1920 if fmt == 'story' else 1350
here = os.path.dirname(os.path.abspath(__file__))
url = 'file://' + os.path.join(here, 'bom-dia.html') + '?' + urllib.parse.urlencode({'tema': tema, 'frase': frase, 'ref': ref, 'data': data, 'fmt': fmt})
with sync_playwright() as p:
    exe = '/usr/bin/google-chrome' if os.path.exists('/usr/bin/google-chrome') else None
    b = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
    pg = b.new_page(viewport={'width': 1080, 'height': H})
    pg.goto(url); pg.wait_for_timeout(700)
    pg.screenshot(path='/tmp/_bomdia.png'); b.close()
Image.open('/tmp/_bomdia.png').convert('RGB').save(out, quality=92)
print(out)
