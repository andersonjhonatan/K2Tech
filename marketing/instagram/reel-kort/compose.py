import asyncio, json, os, subprocess
from playwright.async_api import async_playwright

D = '/home/claude/reel'
CAPS = {
    'c1': ('CLIENTE', 'Abre o link da<br><b>barbearia</b>'),
    'c2': ('CLIENTE', 'Escolhe o<br><b>serviço</b>'),
    'c3': ('CLIENTE', 'Escolhe o barbeiro<br><b>e o horário</b>'),
    'c4': ('CLIENTE', 'Pronto,<br><b>agendado!</b>'),
    'd1': ('DONO', 'Já aparece na<br><b>agenda do dia</b>'),
    'd2': ('DONO', 'E o faturamento<br><b>sempre à mão</b>'),
}
ENC = ['-c:v', 'libx264', '-crf', '20', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', '30']

async def layers():
    html = open(f'{D}/layers.html').read()
    caps = ''.join(
        f'<div id="bg_{k}" class="f bg"><div class="cap"><div class="who"><i></i>{w}</div><div class="txt">{t}</div></div><div class="screen"></div></div>'
        for k, (w, t) in CAPS.items())
    open(f'{D}/layers_built.html', 'w').write(html.replace('<!--CAPTIONS-->', caps))
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        pg = await b.new_page(viewport={'width': 1080, 'height': 1920})
        await pg.goto(f'file://{D}/layers_built.html'); await pg.wait_for_timeout(500)
        await pg.locator('#bezel').screenshot(path=f'{D}/bezel.png', omit_background=True)
        for k in list(CAPS) + ['intro', 'outro']:
            sel = f'#bg_{k}' if k in CAPS else f'#{k}'
            await pg.locator(sel).screenshot(path=f'{D}/bg_{k}.png')
        await b.close()

def run(cmd, out):
    tmp = out.replace('.mp4', '.tmp.mp4')
    r = subprocess.run(cmd + [tmp], capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-1500:]); raise SystemExit(1)
    os.replace(tmp, out)

def still(name, secs, fade_in=False, fade_out=False):
    vf = f'format=yuv420p,loop=-1:1,trim=duration={secs}'
    if fade_in: vf += ',fade=t=in:st=0:d=0.4'
    if fade_out: vf += f',fade=t=out:st={secs-0.5}:d=0.5'
    run(['ffmpeg', '-y', '-v', 'error', '-framerate', '30', '-i', f'{D}/bg_{name}.png', '-vf', vf] + ENC, f'{D}/sc_{name}.mp4')

def scene(k, frames):
    lst = f'{D}/list_{k}.txt'
    with open(lst, 'w') as fh:
        for fr in frames:
            fh.write(f"file '{fr['file']}'\nduration {fr['dur']:.4f}\n")
        fh.write(f"file '{frames[-1]['file']}'\n")
    total = sum(fr['dur'] for fr in frames)
    fc = ('[1:v]scale=648:1402:flags=lanczos,fps=30,setsar=1[s];'
          '[0:v][s]overlay=216:480:shortest=1[a];[a][2:v]overlay=0:0,format=yuv420p')
    run(['ffmpeg', '-y', '-v', 'error', '-loop', '1', '-framerate', '30', '-i', f'{D}/bg_{k}.png',
         '-f', 'concat', '-safe', '0', '-i', lst, '-loop', '1', '-framerate', '30', '-i', f'{D}/bezel.png',
         '-filter_complex', fc, '-t', f'{total:.3f}'] + ENC, f'{D}/sc_{k}.mp4')

def main():
    asyncio.run(layers())
    log = json.load(open(f'{D}/frames.json'))
    order = ['intro'] + list(CAPS) + ['outro']
    still('intro', 2.8, fade_in=True)
    for k in CAPS:
        scene(k, [x for x in log if x['scene'] == k])
    still('outro', 3.5, fade_out=True)
    with open(f'{D}/concat.txt', 'w') as fh:
        for k in order: fh.write(f"file '{D}/sc_{k}.mp4'\n")
    run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', f'{D}/concat.txt', '-c', 'copy', '-movflags', '+faststart'], f'{D}/kort-reel.mp4')
    print('ok')

if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == 'layers':
        asyncio.run(layers())
    else:
        main()
