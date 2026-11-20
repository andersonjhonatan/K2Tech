"""Grava o fluxo do KORT como sequência de JPEGs (com toques visíveis) e um índice de cenas."""
import asyncio, json, os, time
from playwright.async_api import async_playwright

OUT = '/home/claude/reel/frames'
os.makedirs(OUT, exist_ok=True)
BASE = 'http://localhost:3100'
CSS = """nextjs-portal{display:none!important}
.tapdot{position:fixed;z-index:99999;width:64px;height:64px;margin:-32px 0 0 -32px;border-radius:50%;
background:rgba(255,255,255,.55);box-shadow:0 0 0 3px rgba(255,255,255,.8);pointer-events:none;
animation:tap .55s ease-out forwards}
@keyframes tap{0%{transform:scale(.4);opacity:1}100%{transform:scale(1.5);opacity:0}}"""

log = []  # {scene, file, dur}
n = 0
scene = 'x'

async def snap(pg, dur=1 / 30):
    global n
    f = f'{OUT}/f{n:05d}.jpg'
    await pg.screenshot(path=f, type='jpeg', quality=92)
    n += 1
    log.append({'scene': scene, 'file': f, 'dur': dur})

async def hold(pg, seconds):
    await snap(pg, seconds)

async def prep(pg):
    await pg.add_style_tag(content=CSS)

async def scroll_to(pg, y, seconds=1.2, steps=18):
    y0 = await pg.evaluate('window.scrollY')
    for i in range(1, steps + 1):
        t = i / steps
        e = t * t * (3 - 2 * t)
        await pg.evaluate(f'window.scrollTo(0,{y0 + (y - y0) * e})')
        await snap(pg, seconds / steps)

async def tap(pg, locator, after_wait=600):
    await locator.scroll_into_view_if_needed()
    box = await locator.bounding_box()
    x, y = box['x'] + box['width'] / 2, box['y'] + box['height'] / 2
    await pg.evaluate(f"""(()=>{{const d=document.createElement('div');d.className='tapdot';
      d.style.left='{x}px';d.style.top='{y}px';document.body.appendChild(d);setTimeout(()=>d.remove(),700)}})()""")
    for _ in range(3):
        await snap(pg, 0.08)
    await locator.click()
    await pg.wait_for_timeout(after_wait)
    for _ in range(3):
        await snap(pg, 0.08)

async def main():
    global scene
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-proxy-server'])
        ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        await ctx.add_cookies([{'name': 'painel_session', 'value': 'x', 'domain': 'localhost', 'path': '/'}])
        pg = await ctx.new_page()

        # ── Cliente ──
        scene = 'c1'
        await pg.goto(BASE + '/b/barbearia-do-ze'); await prep(pg); await pg.wait_for_timeout(2500)
        await hold(pg, 1.6)
        await scroll_to(pg, 860, 1.4)
        await hold(pg, 0.6)
        scene = 'c2'
        await tap(pg, pg.get_by_role('radio').filter(has_text='Corte + Barba'))
        await hold(pg, 0.7)
        await tap(pg, pg.get_by_role('link', name='Escolher horário'), after_wait=2500)
        await prep(pg)
        scene = 'c3'
        await hold(pg, 1.0)
        await tap(pg, pg.get_by_role('radio').filter(has_text='Zé').first)
        await hold(pg, 0.5)
        await scroll_to(pg, 380, 0.9, 12)
        await tap(pg, pg.get_by_role('radio', name='17:30', exact=True))
        await hold(pg, 0.6)
        await scroll_to(pg, 2000, 1.0, 12)
        await hold(pg, 0.9)
        scene = 'c4'
        await tap(pg, pg.get_by_role('button').filter(has_text='Confirmar'), after_wait=3000)
        await prep(pg)
        await pg.wait_for_timeout(800)
        await hold(pg, 2.4)
        await scroll_to(pg, 500, 1.2, 14)
        await hold(pg, 1.2)

        # ── Dono ──
        scene = 'd1'
        await pg.goto(BASE + '/painel'); await prep(pg); await pg.wait_for_timeout(2500)
        await hold(pg, 1.5)
        y = await pg.evaluate("""(()=>{const el=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='Gabriel Souza');
          return el? el.getBoundingClientRect().top+window.scrollY-330 : 1400})()""")
        await scroll_to(pg, y, 2.0, 26)
        await hold(pg, 2.2)
        scene = 'd2'
        await pg.goto(BASE + '/painel/faturamento'); await prep(pg); await pg.wait_for_timeout(2500)
        await hold(pg, 1.6)
        await scroll_to(pg, 760, 1.6, 20)
        await hold(pg, 1.6)
        await b.close()
    json.dump(log, open('/home/claude/reel/frames.json', 'w'))
    print('frames', n)

asyncio.run(main())
