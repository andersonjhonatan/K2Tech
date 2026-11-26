"""Narração grátis (Kokoro, voz pm_santa) linha a linha -> voz.wav + timings.json (linhas e palavras)."""
import json, os, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
HERE=os.path.dirname(os.path.abspath(__file__)); VOICE=os.environ.get('VOICE','pm_santa'); SPEED=float(os.environ.get('SPEED','0.92'))
k=Kokoro('/home/claude/tts-models/kokoro-v1.0.onnx','/home/claude/tts-models/voices-v1.0.bin')
TM=json.load(open(os.path.join(HERE,'timings.json')))
SPOKEN={  # grafia para a voz pronunciar bem (legenda continua com o texto original)
 'KFit. Em breve.':'Quêfit. Em breve.',
 'Mais um projeto desenvolvido pela TresK Tecnologia.':'Mais um projeto desenvolvido pela Tresk Tecnologia.',
}
GAPS=[1.0,1.0,1.1,1.2,1.5]
SR=None; pieces=[]; t=0.25; words=[]
for i,l in enumerate(TM['lines']):
    s,sr=k.create(SPOKEN.get(l['text'],l['text']),voice=VOICE,speed=SPEED,lang='pt-br'); SR=sr
    # aparar silêncio das pontas
    a=np.abs(s); thr=a.max()*0.02; idx=np.where(a>thr)[0]; s=s[max(0,idx[0]-200):idx[-1]+400]
    dur=len(s)/sr; l['start']=round(t,3); l['end']=round(t+dur,3)
    ws=l['text'].split(' '); tot=sum(len(w)+1 for w in ws); acc=0
    for w in ws:
        a0=t+dur*acc/tot; acc+=len(w)+1; words.append({'text':w,'startSeconds':round(a0,3),'endSeconds':round(t+dur*acc/tot,3)})
    pieces.append((t,s)); t+=dur+(GAPS[i] if i<len(GAPS) else 0)
N=int((t+0.5)*SR); v=np.zeros(N,dtype=np.float32)
for st,s in pieces: i=int(st*SR); v[i:i+len(s)]+=s
v=v/np.abs(v).max()*0.89
sf.write(os.path.join(HERE,'voz.wav'),v,SR)
TM['words']=words; json.dump(TM,open(os.path.join(HERE,'timings.json'),'w'),ensure_ascii=False,indent=1)
print(VOICE,[ (l['start'],l['end']) for l in TM['lines']])
