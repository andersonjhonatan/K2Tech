import asyncio,sys
from playwright.async_api import async_playwright
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        pg=await b.new_page(viewport={'width':1080,'height':1350})
        await pg.goto('file:///home/claude/k2tech/marketing/instagram/template-post1.html'); await pg.wait_for_timeout(500)
        for i in (1,2,3):
            await pg.locator(f'#s{i}').screenshot(path=f'/home/claude/k2tech/marketing/instagram/slide{i}.png')
        await b.close()
asyncio.run(m())
