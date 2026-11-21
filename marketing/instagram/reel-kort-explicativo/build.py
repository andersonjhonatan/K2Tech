"""Reels explicativo do KORT: narração feminina calma (Kokoro pf_dora), legendas e destaques.
Fontes de tela: gravação real do fluxo (tresk-reel-kort.mp4, recortada) + prints de kort-telas/.
Uso: python3 build.py            -> gera tudo
     python3 build.py preview    -> só camadas + um quadro de cada cena
"""
import asyncio, json, os, re, subprocess, sys
import numpy as np, soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
IG = os.path.dirname(HERE)
SRC = f'{IG}/../../public/instagram/tresk-reel-kort.mp4'
TELAS = f'{IG}/kort-telas'
W = '/home/claude/kreel/work'
os.makedirs(W, exist_ok=True)
SR = 24000
VOICE, SPEED = 'pf_dora', 0.92
LEAD, GAP, TAIL = 0.35, 0.42, 0.55
SX, SY, SW, SH = 216, 480, 648, 1402          # posição/tamanho da tela do celular
ENC = ['-c:v', 'libx264', '-crf', '20', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', '30']

# Cada cena: rótulo, título, fonte da tela, falas [(falado, legenda)], destaques [(x,y,w,h em coords da tela, inicia_em_fala)]
# fonte: ('card', id) | ('clip', ini, fim) | ('still', arquivo)
SCENES = [
 dict(id='intro', src=('card', 'intro'), lines=[
   ('Oi! Eu vou te mostrar, com calma, como funciona o Cort, a agenda online para barbearias.',
    'Oi! Eu vou te mostrar, com calma, como funciona o KORT, a agenda online para barbearias.'),
   ('Primeiro, o que o cliente vê. Depois, o que o dono da barbearia vê.',
    'Primeiro, o que o cliente vê. Depois, o que o dono da barbearia vê.')]),
 dict(id='c1', lbl='CLIENTE · PASSO 1', ttl='Abre o link<br>da <b>barbearia</b>', src=('still', 'publica.png'), lines=[
   ('Tudo começa com um link. O dono manda esse link no uótsap, ou coloca na bio do Instagram.',
    'Tudo começa com um link. O dono manda esse link no WhatsApp, ou coloca na bio do Instagram.'),
   ('Quando o cliente abre, ele já vê se a barbearia está aberta, o endereço, a equipe, e os botões para chamar no uótsap e para como chegar.',
    'Quando o cliente abre, ele já vê se a barbearia está aberta, o endereço, a equipe, e os botões de WhatsApp e de como chegar.')],
   hl=[(24, 450, 600, 400, 1)]),
 dict(id='c2', lbl='CLIENTE · PASSO 2', ttl='Vê o seu<br><b>cartão fidelidade</b>', src=('still', 'fidelidade.png'), lines=[
   ('Logo depois, aparece o cartão fidelidade dele.', 'Logo depois, aparece o cartão fidelidade dele.'),
   ('Cada atendimento concluído vira um selo. Aqui, faltam só três para ganhar um corte grátis.',
    'Cada atendimento concluído vira um selo. Aqui, faltam só 3 para ganhar um corte grátis.')],
   hl=[(24, 64, 600, 520, 0)]),
 dict(id='c3', lbl='CLIENTE · PASSO 3', ttl='Escolhe o<br><b>serviço</b>', src=('clip', 5.0, 8.0), lines=[
   ('Aí ele escolhe o serviço: corte, barba, ou o combo.', 'Aí ele escolhe o serviço: corte, barba ou o combo.'),
   ('Cada um já mostra o preço, e quanto tempo demora.', 'Cada um já mostra o preço e quanto tempo demora.')]),
 dict(id='c4', lbl='CLIENTE · PASSO 4', ttl='Escolhe com quem,<br><b>o dia e o horário</b>', src=('clip', 8.0, 12.0), lines=[
   ('Depois, escolhe com quem quer cortar, ou marca tanto faz.', 'Depois, escolhe com quem quer cortar, ou marca "tanto faz".'),
   ('Em seguida, escolhe o dia, e o horário.', 'Em seguida, escolhe o dia e o horário.')]),
 dict(id='c5', lbl='CLIENTE · PASSO 4', ttl='Horário ocupado<br><b>aparece riscado</b>', src=('still', 'horarios.png'), lines=[
   ('Repara: os horários riscados já estão ocupados. Assim, ninguém marca em cima de ninguém.',
    'Repara: os horários riscados já estão ocupados. Assim, ninguém marca em cima de ninguém.'),
   ('E se não achar um horário bom, ele pode entrar na lista de espera.',
    'E se não achar um horário bom, ele pode entrar na lista de espera.')],
   hl=[(20, 200, 608, 500, 0), (20, 726, 520, 56, 1)]),
 dict(id='c6', lbl='CLIENTE · PASSO 5', ttl='Confere e<br><b>confirma</b>', src=('clip', 12.0, 14.0), lines=[
   ('No final, ele confere o resumo: o serviço, o profissional, o dia, o horário e o valor. E toca em confirmar.',
    'No final, ele confere o resumo: serviço, profissional, dia, horário e valor. E toca em confirmar.')]),
 dict(id='c7', lbl='CLIENTE · PRONTO', ttl='Horário<br><b>marcado!</b>', src=('clip', 14.0, 18.8), lines=[
   ('Pronto. Horário marcado, sem precisar mandar mensagem nenhuma.', 'Pronto! Horário marcado, sem precisar mandar mensagem nenhuma.'),
   ('Ele ainda pode colocar na agenda do celular, ou remarcar, se precisar.', 'Ele ainda pode colocar na agenda do celular, ou remarcar, se precisar.')]),
 dict(id='d0', src=('card', 'dono'), lines=[('Agora, vamos para o lado do dono.', 'Agora, vamos para o lado do dono.')]),
 dict(id='d1', lbl='DONO · PASSO 1', ttl='O resumo<br><b>do dia</b>', src=('clip', 19.0, 20.8), lines=[
   ('Assim que abre o painel, ele vê o resumo do dia:', 'Assim que abre o painel, ele vê o resumo do dia:'),
   ('quantos atendimentos tem hoje, quanto deve entrar, os próximos sete dias, e quantos clientes já tem.',
    'quantos atendimentos tem hoje, quanto deve entrar, os próximos 7 dias e quantos clientes já tem.')]),
 dict(id='d2', lbl='DONO · PASSO 2', ttl='A agenda<br><b>do dia</b>', src=('clip', 20.8, 24.9), lines=[
   ('Descendo, está a agenda do dia. O horário que o cliente acabou de marcar já aparece aqui, na hora.',
    'Descendo, está a agenda do dia. O horário que o cliente acabou de marcar já aparece aqui, na hora.'),
   ('Em cada horário, o dono marca se o cliente foi atendido, e aí ele ganha o selo, ou se faltou.',
    'Em cada horário, o dono marca se o cliente foi atendido (e aí ele ganha o selo) ou se faltou.')]),
 dict(id='d3', lbl='DONO · PASSO 3', ttl='Agenda também<br><b>pelo painel</b>', src=('still', 'agenda-dia.png'), lines=[
   ('E quem ligou, ou chegou direto na barbearia, o dono agenda por aqui mesmo.',
    'E quem ligou, ou chegou direto na barbearia, o dono agenda por aqui mesmo.'),
   ('A agenda mostra se o horário veio pelo link, ou pelo painel.', 'A agenda mostra se o horário veio pelo link ou pelo painel.')],
   hl=[(270, 14, 210, 84, 0)]),
 dict(id='d4', lbl='DONO · PASSO 4', ttl='O faturamento<br><b>sempre à mão</b>', src=('clip', 25.0, 27.2), lines=[
   ('No faturamento, ele vê quanto entrou no dia, na semana e no mês, e compara com o mês passado.',
    'No faturamento, ele vê quanto entrou no dia, na semana e no mês, e compara com o mês passado.'),
   ('E também vê quanto ainda vai entrar, dos horários que já estão marcados.',
    'E também vê quanto ainda vai entrar, dos horários que já estão marcados.')]),
 dict(id='d5', lbl='DONO · PASSO 5', ttl='Os números<br><b>do negócio</b>', src=('still', 'faturamento2.png'), lines=[
   ('Tem ainda as faltas, os clientes novos, e as vagas recuperadas pela lista de espera.',
    'Tem ainda as faltas, os clientes novos e as vagas recuperadas pela lista de espera.'),
   ('Ou seja: horário que ia ficar vazio, e virou dinheiro.', 'Ou seja: horário que ia ficar vazio e virou dinheiro.')],
   hl=[(20, 266, 608, 320, 0)]),
 dict(id='outro', src=('card', 'outro'), lines=[
   ('Esse é o Cort, um produto da Tréski Tecnologia, feito aqui no sertão de Pernambuco.',
    'Esse é o KORT, um produto da TresK Tecnologia, feito aqui no Sertão de Pernambuco.'),
   ('Quer usar na sua barbearia? Chama a gente no direct.', 'Quer usar na sua barbearia? Chama a gente no direct.')]),
]

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(' '.join(cmd)[:300]); print(r.stderr[-2000:]); raise SystemExit(1)

# ---------- narração ----------
def tts():
    cache = f'{W}/tts.json'
    from kokoro_onnx import Kokoro
    k = Kokoro('/home/claude/tts-models/kokoro-v1.0.onnx', '/home/claude/tts-models/voices-v1.0.bin')
    for s in SCENES:
        t, parts, cues = LEAD, [np.zeros(int(LEAD * SR), np.float32)], []
        for i, (spoken, shown) in enumerate(s['lines']):
            a, sr = k.create(spoken, voice=VOICE, speed=SPEED, lang='pt-br')
            a = a.astype(np.float32)
            # apara silêncio das pontas
            nz = np.where(np.abs(a) > 0.01)[0]
            a = a[max(0, nz[0] - 600): nz[-1] + 1200]
            d = len(a) / SR
            cues.append((t, t + d, shown, i))
            parts += [a, np.zeros(int(GAP * SR), np.float32)]
            t += d + GAP
        s['audio'] = np.concatenate(parts)
        s['cues'] = cues
        s['need'] = t - GAP + TAIL

def chunks(text, maxc=62):
    """Quebra a legenda em blocos de até ~2 linhas, preferindo cortar em pontuação."""
    if len(text) <= maxc:
        return [text]
    best = None
    for m in re.finditer(r'[,:;.!?] ', text):
        i = m.end()
        if 18 <= i <= maxc and len(text) - i >= 14:
            best = i
    if best is None:
        cut = text.rfind(' ', 0, maxc)
        best = cut + 1
    return [text[:best].strip()] + chunks(text[best:].strip(), maxc)

# ---------- camadas (Playwright) ----------
CSS = """*{margin:0;padding:0;box-sizing:border-box}body{background:transparent}
.f{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:'Inter';color:#F5F5F7}
.bg{background:radial-gradient(1100px 900px at 85% 0%,#14265a 0%,#0B0B0C 60%)}
.cap{position:absolute;left:80px;right:80px;top:250px}
.who{font-size:26px;letter-spacing:.2em;font-weight:600;color:#C8A96A;display:flex;align-items:center;gap:16px}
.who i{display:inline-block;width:46px;height:3px;background:#C8A96A}
.txt{margin-top:14px;font-family:'Poppins';font-weight:700;font-size:58px;line-height:1.06;letter-spacing:-.02em}
.txt b{color:#3B82F6}
.screen{position:absolute;left:216px;top:480px;width:648px;height:1402px;border-radius:56px;box-shadow:0 0 0 18px #1b1b1e,0 0 0 20px #2c2c31,0 40px 120px 20px rgba(0,0,0,.55),0 0 110px 30px rgba(37,99,235,.22)}
.bezel .screen{box-shadow:0 0 0 18px #1b1b1e,0 0 0 20px #2c2c31,0 0 0 400px #0B0B0C00}
.card{display:flex;flex-direction:column;justify-content:center;padding:0 96px 300px}
.card img{width:150px;margin-bottom:70px}
.card .k{font-size:28px;letter-spacing:.22em;color:#C8A96A;font-weight:600}
.card h1{font-family:'Poppins';font-size:100px;line-height:1.04;font-weight:700;letter-spacing:-.025em;margin-top:22px}
.card h1 b{color:#3B82F6}
.card p{margin-top:36px;font-size:40px;line-height:1.45;color:#c4c5cc}
.btn{margin-top:70px;background:#2563EB;border-radius:34px;padding:44px 50px}
.btn h2{font-family:'Poppins';font-size:50px;font-weight:700}.btn p{margin-top:10px;font-size:34px;color:#e2e9ff}
.sub{position:absolute;left:70px;right:70px;top:1490px;display:flex;justify-content:center}
.sub span{background:rgba(11,11,12,.86);border:1px solid rgba(255,255,255,.08);border-radius:22px;padding:20px 30px;
  font-family:'Poppins';font-weight:600;font-size:44px;line-height:1.3;text-align:center;color:#fff;max-width:940px}
.subc{top:1330px}
.hl{position:absolute;border:6px solid #3B82F6;border-radius:30px;box-shadow:0 0 0 6px rgba(59,130,246,.25),0 0 40px rgba(59,130,246,.6)}
"""
import base64
MARK = 'data:image/png;base64,' + base64.b64encode(open(f'{IG}/mark.png','rb').read()).decode()

def html_scene_bg(s):
    return f'<div class="f bg"><div class="cap"><div class="who"><i></i>{s["lbl"]}</div><div class="txt">{s["ttl"]}</div></div><div class="screen"></div></div>'

CARDS = {
 'intro': f'<div class="f bg card"><img src="{MARK}"><div class="k">KORT · AGENDA PARA BARBEARIAS</div><h1>Como funciona,<br><b>passo a passo.</b></h1><p>Do link do cliente ao painel do dono.</p></div>',
 'dono': f'<div class="f bg card"><img src="{MARK}"><div class="k">AGORA</div><h1>O lado do<br><b>dono.</b></h1></div>',
 'outro': f'<div class="f bg card"><img src="{MARK}"><div class="k">FEITO PELA TRESK TECNOLOGIA</div><h1>Quer o KORT na<br><b>sua barbearia?</b></h1><div class="btn"><h2>Chama no direct</h2><p>ou toque no link da bio</p></div></div>',
}

async def layers():
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        pg = await b.new_page(viewport={'width': 1080, 'height': 1920})
        async def shot(body, path, transparent=False):
            await pg.set_content(f'<html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>')
            await pg.wait_for_timeout(150)
            await pg.screenshot(path=path, omit_background=transparent)
        await shot('<div class="f bezel"><div class="screen"></div></div>', f'{W}/bezel.png', True)
        for s in SCENES:
            kind = s['src'][0]
            if kind == 'card':
                await shot(CARDS[s['src'][1]], f'{W}/bg_{s["id"]}.png')
            else:
                await shot(html_scene_bg(s), f'{W}/bg_{s["id"]}.png')
            subs = []
            for (a, e, shown, li) in s['cues']:
                parts = chunks(shown)
                tot = sum(len(x) for x in parts)
                t = a
                for j, ptxt in enumerate(parts):
                    d = (e - a) * len(ptxt) / tot
                    f = f'{W}/sub_{s["id"]}_{li}_{j}.png'
                    cls = 'sub subc' if kind == 'card' else 'sub'
                    await shot(f'<div class="f"><div class="{cls}"><span>{ptxt}</span></div></div>', f, True)
                    subs.append((t, t + d, f))
                    t += d
            s['subs'] = subs
            hls = []
            for k, (x, y, w, h, li) in enumerate(s.get('hl', [])):
                f = f'{W}/hl_{s["id"]}_{k}.png'
                await shot(f'<div class="f"><div class="hl" style="left:{SX + x}px;top:{SY + y}px;width:{w}px;height:{h}px"></div></div>', f, True)
                hls.append((s['cues'][li][0] + 0.2, f))
            s['hls'] = hls
        await b.close()

# ---------- vídeo por cena ----------
def scene_video(s):
    sid, kind = s['id'], s['src'][0]
    out = f'{W}/sc_{sid}.mp4'
    if kind == 'card':
        dur = s['need']
        inputs = ['-loop', '1', '-framerate', '30', '-t', f'{dur:.3f}', '-i', f'{W}/bg_{sid}.png']
        fc, last, n = '', '[0:v]', 1
    else:
        if kind == 'clip':
            a, e = s['src'][1], s['src'][2]
            dur = max(s['need'], e - a)
            hold = dur - (e - a)
            scr = (f'[1:v]trim=start={a}:end={e},setpts=PTS-STARTPTS,crop={SW}:{SH}:{SX}:{SY},fps=30,'
                   f'tpad=stop_mode=clone:stop_duration={hold + 0.1:.3f}[s];')
            src_in = ['-i', SRC]
        else:
            dur = s['need']
            scr = f'[1:v]scale={SW}:{SH}:flags=lanczos,fps=30,setsar=1[s];'
            src_in = ['-loop', '1', '-framerate', '30', '-t', f'{dur:.3f}', '-i', f'{TELAS}/{s["src"][1]}']
        inputs = ['-loop', '1', '-framerate', '30', '-t', f'{dur:.3f}', '-i', f'{W}/bg_{sid}.png'] + src_in + \
                 ['-loop', '1', '-framerate', '30', '-t', f'{dur:.3f}', '-i', f'{W}/bezel.png']
        fc = scr + f'[0:v][s]overlay={SX}:{SY}:shortest=1[a];[a][2:v]overlay=0:0[b];'
        last, n = '[b]', 3
        for k, (t0, f) in enumerate(s['hls']):
            inputs += ['-loop', '1', '-framerate', '30', '-t', f'{dur:.3f}', '-i', f]
            fc += f'[{n}:v]format=rgba,fade=t=in:st={t0:.2f}:d=0.4:alpha=1[h{k}];{last}[h{k}]overlay=0:0[hh{k}];'
            last, n = f'[hh{k}]', n + 1
    for k, (t0, t1, f) in enumerate(s['subs']):
        inputs += ['-loop', '1', '-framerate', '30', '-t', f'{dur:.3f}', '-i', f]
        fc += f"{last}[{n}:v]overlay=0:0:enable='between(t,{t0:.2f},{t1 + 0.08:.2f})'[u{k}];"
        last, n = f'[u{k}]', n + 1
    fade = ''
    if sid == 'intro': fade = ',fade=t=in:st=0:d=0.4'
    if sid == 'outro': fade = f',fade=t=out:st={dur - 0.6:.2f}:d=0.6'
    fc += f'{last}format=yuv420p{fade}[v]'
    run(['ffmpeg', '-y', '-v', 'error'] + inputs + ['-filter_complex', fc, '-map', '[v]', '-t', f'{dur:.3f}'] + ENC + [out])
    s['dur'] = round(dur * 30) / 30
    return out

def main():
    preview = len(sys.argv) > 1 and sys.argv[1] == 'preview'
    tts()
    asyncio.run(layers())
    for s in SCENES:
        scene_video(s)
        print(s['id'], round(s['dur'], 2), flush=True)
        if preview:
            mid = s['cues'][-1][0] + 0.5
            run(['ffmpeg', '-y', '-v', 'error', '-ss', f'{mid:.2f}', '-i', f'{W}/sc_{s["id"]}.mp4', '-frames:v', '1', f'{W}/pv_{s["id"]}.png'])
    track = []
    for s in SCENES:
        n = int(round(s['dur'] * SR))
        track.append(np.pad(s['audio'], (0, max(0, n - len(s['audio']))))[:n])
    audio = np.concatenate(track)
    sf.write(f'{W}/voz.wav', audio / max(1e-6, np.abs(audio).max()) * 0.9, SR)
    with open(f'{W}/concat.txt', 'w') as fh:
        for s in SCENES: fh.write(f"file '{W}/sc_{s['id']}.mp4'\n")
    run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', f'{W}/concat.txt', '-c', 'copy', f'{W}/silent.mp4'])
    # voz: tira graves, leve compressão e normaliza para -14 LUFS (padrão de redes)
    out = sys.argv[2] if len(sys.argv) > 2 else f'{W}/kort-explicativo.mp4'
    run(['ffmpeg', '-y', '-v', 'error', '-i', f'{W}/silent.mp4', '-i', f'{W}/voz.wav', '-map', '0:v', '-map', '1:a',
         '-af', 'highpass=f=80,acompressor=threshold=-20dB:ratio=2.5:attack=10:release=200,loudnorm=I=-14:TP=-1.5:LRA=9',
         '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-shortest', '-movflags', '+faststart', out])
    print('total', round(sum(s['dur'] for s in SCENES), 1), out)

main()
