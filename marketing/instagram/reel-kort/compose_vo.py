"""Reels do KORT com narração (Kokoro pt-BR) e legendas sincronizadas."""
import json, os, subprocess, textwrap
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

D = '/home/claude/reel'
VOICE = os.environ.get('VOICE', 'pm_alex')
FONT = '/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf'
SR = 24000
LEAD, GAP, TAIL = 0.25, 0.18, 0.35
ENC = ['-c:v', 'libx264', '-crf', '20', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', '30']

# (texto falado, texto da legenda)
SCRIPT = {
    'intro': [('Quer ver como funciona o Kort?', 'Quer ver como funciona o KORT?'),
              ('Olha só, do lado do cliente e do lado do dono.', 'Olha só: do lado do cliente e do lado do dono.')],
    'c1': [('O cliente recebe o link da barbearia e já vê tudo:', 'O cliente recebe o link da barbearia e já vê tudo:'),
           ('endereço, equipe e o cartão fidelidade dele.', 'endereço, equipe e o cartão fidelidade dele.')],
    'c2': [('Aí é só escolher o serviço. Aqui, corte e barba.', 'Aí é só escolher o serviço. Aqui, corte + barba.')],
    'c3': [('Depois escolhe o barbeiro, o dia e um horário livre.', 'Depois escolhe o barbeiro, o dia e um horário livre.'),
           ('Os horários ocupados já aparecem riscados.', 'Os horários ocupados já aparecem riscados.'),
           ('E confirma.', 'E confirma.')],
    'c4': [('Pronto, horário marcado!', 'Pronto, horário marcado!'),
           ('E ainda ganha mais um selo no cartão fidelidade.', 'E ainda ganha +1 selo no cartão fidelidade.')],
    'd1': [('E o dono? Já vê o agendamento na agenda do dia, na mesma hora,', 'E o dono? Já vê o agendamento na agenda do dia, na mesma hora,'),
           ('sem precisar responder mensagem.', 'sem precisar responder mensagem.')],
    'd2': [('E acompanha o faturamento do dia, da semana e do mês, direto no celular.', 'E acompanha o faturamento do dia, da semana e do mês, direto no celular.')],
    'outro': [('Kort, um produto da Tresk Tecnologia.', 'KORT, um produto da TresK Tecnologia.'),
              ('Quer na sua barbearia? Chama a gente no direct.', 'Quer na sua barbearia? Chama a gente no direct.')],
}
ORDER = ['intro', 'c1', 'c2', 'c3', 'c4', 'd1', 'd2', 'outro']
SCREEN = {'c1', 'c2', 'c3', 'c4', 'd1', 'd2'}

def run(cmd, out):
    tmp = out[:-4] + '.tmp' + out[-4:]
    r = subprocess.run(cmd + [tmp], capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-2000:]); raise SystemExit(1)
    os.replace(tmp, out)

def tts():
    k = Kokoro('/home/claude/tts-models/kokoro-v1.0.onnx', '/home/claude/tts-models/voices-v1.0.bin')
    plan = {}
    for sc in ORDER:
        t, parts, cues = LEAD, [np.zeros(int(LEAD * SR), dtype=np.float32)], []
        for spoken, shown in SCRIPT[sc]:
            a, sr = k.create(spoken, voice=VOICE, speed=1.05, lang='pt-br')
            assert sr == SR
            a = a.astype(np.float32)
            d = len(a) / SR
            cues.append((t, t + d, shown))
            parts += [a, np.zeros(int(GAP * SR), dtype=np.float32)]
            t += d + GAP
        plan[sc] = {'audio': np.concatenate(parts), 'need': t - GAP + TAIL, 'cues': cues}
    return plan

def sub_filter(cues, tag, y=1520):
    fs = []
    for i, (a, b, text) in enumerate(cues):
        f = f'{D}/sub_{tag}_{i}.txt'
        open(f, 'w').write('\n'.join(textwrap.wrap(text, 30)))
        fs.append(f"drawtext=fontfile={FONT}:textfile={f}:fontsize=46:fontcolor=white:line_spacing=12:"
                  f"box=1:boxcolor=0x0B0B0C@0.82:boxborderw=26:x=(w-text_w)/2:y={y}-text_h/2:"
                  f"enable='between(t,{a:.2f},{b + 0.12:.2f})'")
    return ','.join(fs)

def main():
    plan = tts()
    log = json.load(open(f'{D}/frames.json'))
    lengths = {}
    for sc in ORDER:
        p = plan[sc]
        subs = sub_filter(p['cues'], sc, 1520 if sc in SCREEN else 1380)
        if sc in SCREEN:
            frames = [dict(x) for x in log if x['scene'] == sc]
            vis = sum(x['dur'] for x in frames)
            if p['need'] > vis:
                frames[0 if sc in ('c1', 'c4', 'd2') else -1]['dur'] += p['need'] - vis
            total = max(vis, p['need'])
            lst = f'{D}/vlist_{sc}.txt'
            with open(lst, 'w') as fh:
                for fr in frames:
                    fh.write(f"file '{fr['file']}'\nduration {fr['dur']:.4f}\n")
                fh.write(f"file '{frames[-1]['file']}'\n")
            fc = ('[1:v]scale=648:1402:flags=lanczos,fps=30,setsar=1[s];'
                  f'[0:v][s]overlay=216:480:shortest=1[a];[a][2:v]overlay=0:0,{subs},format=yuv420p')
            run(['ffmpeg', '-y', '-v', 'error', '-loop', '1', '-framerate', '30', '-i', f'{D}/bg_{sc}.png',
                 '-f', 'concat', '-safe', '0', '-i', lst, '-loop', '1', '-framerate', '30', '-i', f'{D}/bezel.png',
                 '-filter_complex', fc, '-t', f'{total:.3f}'] + ENC, f'{D}/vo_{sc}.mp4')
        else:
            total = max(p['need'], 2.6)
            vf = f'format=yuv420p,loop=-1:1,trim=duration={total:.3f},{subs}'
            vf += ',fade=t=in:st=0:d=0.4' if sc == 'intro' else f',fade=t=out:st={total - 0.5:.3f}:d=0.5'
            run(['ffmpeg', '-y', '-v', 'error', '-framerate', '30', '-i', f'{D}/bg_{sc}.png', '-vf', vf] + ENC, f'{D}/vo_{sc}.mp4')
        lengths[sc] = round(total * 30) / 30
    # trilha: cada cena com a sua narração, completada com silêncio até o tamanho exato do vídeo
    track = []
    for sc in ORDER:
        a = plan[sc]['audio']
        n = int(round(lengths[sc] * SR))
        track.append(np.pad(a, (0, max(0, n - len(a))))[:n])
    audio = np.concatenate(track)
    audio = audio / max(1e-6, np.abs(audio).max()) * 0.89
    sf.write(f'{D}/narracao.wav', audio, SR)
    with open(f'{D}/vo_concat.txt', 'w') as fh:
        for sc in ORDER:
            fh.write(f"file '{D}/vo_{sc}.mp4'\n")
    run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', f'{D}/vo_concat.txt', '-c', 'copy'], f'{D}/vo_silent.mp4')
    run(['ffmpeg', '-y', '-v', 'error', '-i', f'{D}/vo_silent.mp4', '-i', f'{D}/narracao.wav', '-map', '0:v', '-map', '1:a',
         '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-shortest', '-movflags', '+faststart'], f'{D}/kort-reel-narrado.mp4')
    print({k: round(v, 2) for k, v in lengths.items()}, round(sum(lengths.values()), 1))

main()
