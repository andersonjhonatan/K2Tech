"""Narração grátis linha a linha -> voz.wav + timings.json (linhas e palavras).
ENGINE=piper (padrão, voz Faber pt-BR) ou ENGINE=kokoro (VOICE=pm_santa)."""
import json, os, numpy as np, soundfile as sf
import subprocess, tempfile
HERE=os.path.dirname(os.path.abspath(__file__)); VOICE=os.environ.get('VOICE','pm_santa'); SPEED=float(os.environ.get('SPEED','0.92'))
ENGINE=os.environ.get('ENGINE','piper')
PIPER=os.environ.get('PIPER_MODEL','/home/claude/tts-models/piper/pt_BR-faber-medium.onnx')
def tts(text):
    if ENGINE=='kokoro':
        from kokoro_onnx import Kokoro
        k=Kokoro('/home/claude/tts-models/kokoro-v1.0.onnx','/home/claude/tts-models/voices-v1.0.bin')
        return k.create(text,voice=VOICE,speed=SPEED,lang='pt-br')
    f=tempfile.mktemp(suffix='.wav')
    subprocess.run(['piper','--model',PIPER,'--length_scale',os.environ.get('LENGTH','1.08'),'--output_file',f],input=text.encode(),check=True,capture_output=True)
    return sf.read(f)
TM=json.load(open(os.path.join(HERE,'timings.json')))
SPOKEN={  # grafia para a voz pronunciar bem (legenda continua com o texto original)
 'KFit. Em breve.':'Quêfit. Em breve.',
 'Mais um projeto desenvolvido pela TresK Tecnologia.':'Mais um projeto desenvolvido pela Tresk Tecnologia.',
}
GAPS=[1.45,1.3,1.5,1.5,1.8]
SR=None; pieces=[]; t=0.25; words=[]
for i,l in enumerate(TM['lines']):
    s,sr=tts(SPOKEN.get(l['text'],l['text'])); SR=sr
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
print(ENGINE,[ (l['start'],l['end']) for l in TM['lines']])
