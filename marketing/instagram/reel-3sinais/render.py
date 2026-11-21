"""Renderiza reel.html quadro a quadro (30 fps) e monta o MP4 com áudio silencioso.
Uso: python3 render.py [saida.mp4] [--preview t1,t2,...]"""
import asyncio, os, subprocess, sys, shutil
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
FR = '/home/claude/reel3/frames'
FPS = 30

async def main():
    preview = None
    if '--preview' in sys.argv:
        preview = [float(x) for x in sys.argv[sys.argv.index('--preview') + 1].split(',')]
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        pg = await b.new_page(viewport={'width': 1080, 'height': 1920})
        await pg.goto(f'file://{HERE}/reel.html'); await pg.wait_for_timeout(800)
        total = await pg.evaluate('TOTAL')
        if preview:
            for t in preview:
                await pg.evaluate(f'render({t})')
                await pg.screenshot(path=f'/home/claude/reel3/prev_{t:05.2f}.png')
            await b.close(); return
        shutil.rmtree(FR, ignore_errors=True); os.makedirs(FR)
        n = int(round(total * FPS))
        for i in range(n):
            await pg.evaluate(f'render({i / FPS})')
            await pg.screenshot(path=f'{FR}/f{i:05d}.jpg', type='jpeg', quality=93)
        await b.close()
    out = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/reel3/reel.mp4'
    subprocess.run(['ffmpeg', '-y', '-framerate', str(FPS), '-i', f'{FR}/f%05d.jpg',
                    '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo',
                    '-shortest', '-c:v', 'libx264', '-crf', '19', '-preset', 'medium', '-pix_fmt', 'yuv420p',
                    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out], check=True, capture_output=True)
    print('ok', out, n, 'frames')

asyncio.run(main())
