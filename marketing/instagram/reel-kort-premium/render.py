import asyncio, sys, os
from playwright.async_api import async_playwright
async def main(times=None, outdir='/home/claude/premium/out', fps=30, total=48.0):
    os.makedirs(outdir, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--allow-file-access-from-files'])
        pg = await b.new_page(viewport={'width':1080,'height':1920})
        await pg.goto('file:///home/claude/premium/stage_built.html'); await pg.wait_for_timeout(800)
        print('imgs', await pg.evaluate('ready()'))
        if times is None: times=[i/fps for i in range(int(total*fps))]
        for i,t in enumerate(times):
            await pg.evaluate(f'renderAt({t})')
            await pg.screenshot(path=f'{outdir}/f{i:05d}.jpg', type='jpeg', quality=92)
            if i%300==0: print(i, flush=True)
        await b.close()
if __name__=='__main__':
    if len(sys.argv)>1 and sys.argv[1]=='test':
        asyncio.run(main([float(x) for x in sys.argv[2].split(',')], '/home/claude/premium/test'))
    else:
        asyncio.run(main())
