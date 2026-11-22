"""Uso: python3 shot.py arquivo.html W H prefixo_saida  -> salva prefixo-N.jpg para cada .s"""
import asyncio, sys, os
from playwright.async_api import async_playwright
from PIL import Image
html, W, H, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
async def m():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        pg = await b.new_page(viewport={'width': W, 'height': H})
        await pg.goto('file://' + os.path.abspath(html)); await pg.wait_for_timeout(700)
        els = await pg.locator('.s').all()
        for i, e in enumerate(els, 1):
            png = f'/tmp/_shot{i}.png'
            await e.screenshot(path=png)
            Image.open(png).convert('RGB').save(f'{out}-{i}.jpg', quality=92)
            print(f'{out}-{i}.jpg')
        await b.close()
asyncio.run(m())
