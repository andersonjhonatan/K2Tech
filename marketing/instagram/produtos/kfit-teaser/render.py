"""python3 render.py out_body.mp4 [--preview t1,t2] [--audio score.wav]"""
import asyncio, os, subprocess, sys, shutil, json
from playwright.async_api import async_playwright
HERE=os.path.dirname(os.path.abspath(__file__)); out=sys.argv[1]; FR='/tmp/frames_kfit_teaser'; FPS=30
TM=open(os.path.join(HERE,'timings.json')).read()
async def main():
    prev=[float(x) for x in sys.argv[sys.argv.index('--preview')+1].split(',')] if '--preview' in sys.argv else None
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1080,'height':1920})
        await pg.add_init_script(f'window.TM={TM};')
        await pg.goto(f'file://{HERE}/teaser.html'); await pg.wait_for_timeout(1200)
        total=await pg.evaluate('TOTAL')
        if prev:
            for t in prev:
                await pg.evaluate(f'render({t})'); await pg.screenshot(path=f'{out}_{t:05.2f}.png')
            await b.close(); print('total',total); return
        shutil.rmtree(FR,ignore_errors=True); os.makedirs(FR)
        n=int(round(total*FPS))
        for i in range(n):
            await pg.evaluate(f'render({i/FPS})'); await pg.screenshot(path=f'{FR}/f{i:05d}.jpg',type='jpeg',quality=93)
        await b.close()
    aud=sys.argv[sys.argv.index('--audio')+1] if '--audio' in sys.argv else None
    ain=['-i',aud] if aud else ['-f','lavfi','-i','anullsrc=r=48000:cl=stereo']
    subprocess.run(['ffmpeg','-y','-framerate',str(FPS),'-i',f'{FR}/f%05d.jpg',*ain,'-t',f'{n/FPS:.3f}','-c:v','libx264','-crf','18','-preset','medium','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-ar','48000','-ac','2','-movflags','+faststart',out],check=True,capture_output=True)
    print('ok',out,n,total)
asyncio.run(main())
