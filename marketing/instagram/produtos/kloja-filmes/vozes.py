"""Vozes grátis para a conversa (v3): Rita e Joana com Kokoro pf_dora (timbres diferentes), locutor com Piper Faber.
Gera vozes-v3.wav e v3-tempos.js (início/fim de cada fala)."""
import subprocess, tempfile, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
SR=24000
LINES=[('R','Ai, Joana… mais um dia procurando o caderno do fiado. Sumiu de novo!'),
('J','Caderno? Mulher, eu aposentei o meu.'),
('R','Aposentou como? E quem te deve?'),
('J','Tá tudo aqui, ó. No KLOJA: cada cliente, cada parcela, quem pagou e quem tá atrasada.'),
('R','E as clientes, como é que ficam sabendo?'),
('J','Elas têm o app Meu Crediário, com o nome da minha loja. Veem a parcela e pagam no Pix.'),
('R','Sem eu ter que ficar cobrando?!'),
('R','E o estoque? Eu nunca sei se tem o M.'),
('J','Vendeu no caixa, baixa sozinho. E as clientes veem as peças no meu catálogo, pelo link.'),
('R','Hum… isso deve ser caro.'),
('J','Que nada! Dá pra testar dez dias grátis. E quem fez foi a TresK, aqui do Sertão.'),
('R','Pois amanhã eu fecho o caderno… e abro o KLOJA!'),
('J','Bem-vinda ao clube!'),
('L','KLOJA. A sua loja inteira num sistema só. Teste grátis por dez dias.')]
SAY={'KLOJA':'Ká Lója','TresK':'Tresk','Pix':'Píks','app':'aplicativo',' M.':' tamanho M.','…':','}
k=Kokoro('/home/claude/tts-models/kokoro-v1.0.onnx','/home/claude/tts-models/voices-v1.0.bin')
def fx(s,sr,semi):
    f=tempfile.mktemp(suffix='.wav'); g=tempfile.mktemp(suffix='.wav'); sf.write(f,s,sr)
    r=2**(semi/12)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f,'-af',f'asetrate={int(sr*r)},aresample={SR},atempo={1/r:.4f}','-ac','1',g],check=True)
    x,_=sf.read(g); return x
def piper(t):
    f=tempfile.mktemp(suffix='.wav')
    subprocess.run(['piper','--model','/home/claude/tts-models/piper/pt_BR-faber-medium.onnx','--length_scale','1.08','--noise_scale','0.4','--noise_w','0.45','--output_file',f],input=t.encode(),check=True,capture_output=True)
    x,sr=sf.read(f); g=tempfile.mktemp(suffix='.wav')
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f,'-ar',str(SR),'-ac','1',g],check=True); x,_=sf.read(g); return x
def trim(x):
    a=np.abs(x); i=np.where(a>a.max()*.02)[0]; return x[max(0,i[0]-200):i[-1]+600]
t=1.2; segs=[]; tempos=[]
for who,txt in LINES:
    s=txt
    for a,b in SAY.items(): s=s.replace(a,b)
    if who=='L': x=piper(s)
    else:
        y,sr=k.create(s,voice='pf_dora',speed=1.06 if who=='R' else 0.96,lang='pt-br')
        x=fx(y,sr,+1.8 if who=='R' else -2.2)
    x=trim(x); d=len(x)/SR
    segs.append((t,x)); tempos.append([round(t,3),round(t+d,3)]); t+=d+(0.9 if who=='L' else 0.38)
END=t+0.2
v=np.zeros(int((END+7)*SR))
for st,x in segs: i=int(st*SR); v[i:i+len(x)]+=x*0.9/np.abs(x).max()
sf.write('vozes-v3.wav',v,SR)
open('v3-tempos.js','w').write('window.VOZ='+json.dumps(tempos)+';')
print('fim das falas',round(tempos[-2][1],2),'locutor',tempos[-1])
