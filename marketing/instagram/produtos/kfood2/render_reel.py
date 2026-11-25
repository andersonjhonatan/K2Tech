"""python3 render_reel.py reel.html out.mp4 [--preview t1,t2] """
import asyncio, os, subprocess, sys, shutil
from playwright.async_api import async_playwright
html, out = os.path.abspath(sys.argv[1]), sys.argv[2]
FR = '/tmp/frames_' + os.path.basename(html); FPS = 30
async def main():
    prev = [float(x) for x in sys.argv[sys.argv.index('--preview')+1].split(',')] if '--preview' in sys.argv else None
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        pg = await b.new_page(viewport={'width':1080,'height':1920})
        await pg.goto('file://'+html); await pg.wait_for_timeout(900)
        total = await pg.evaluate('TOTAL')
        if prev:
            for t in prev:
                await pg.evaluate(f'render({t})'); await pg.screenshot(path=f'{out}_{t:05.2f}.png')
            await b.close(); return
        shutil.rmtree(FR, ignore_errors=True); os.makedirs(FR)
        n = int(round(total*FPS))
        for i in range(n):
            await pg.evaluate(f'render({i/FPS})')
            await pg.screenshot(path=f'{FR}/f{i:05d}.jpg', type='jpeg', quality=93)
        await b.close()
    subprocess.run(['ffmpeg','-y','-framerate',str(FPS),'-i',f'{FR}/f%05d.jpg','-f','lavfi','-i','anullsrc=r=48000:cl=stereo',
        '-shortest','-c:v','libx264','-crf','19','-preset','medium','-pix_fmt','yuv420p','-r','30',
        '-c:a','aac','-b:a','128k','-ar','48000','-movflags','+faststart',out],check=True,capture_output=True)
    print('ok', out, n, 'frames', total)
asyncio.run(main())
