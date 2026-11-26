"""Narração (Piper Faber pt-BR) linha a linha -> voz.wav + timings.json"""
import json, os, subprocess, tempfile, numpy as np, soundfile as sf
HERE=os.path.dirname(os.path.abspath(__file__))
PIPER='/home/claude/tts-models/piper/pt_BR-faber-medium.onnx'
SPOKEN={'TresK':'Tresk','KFit':'Quêfit','studio':'estúdio','studios':'estúdios','personal':'pérsonal','Personal':'Pérsonal','Pix':'Píks'}
def say(text):
    for a,b in SPOKEN.items(): text=text.replace(a,b)
    f=tempfile.mktemp(suffix='.wav')
    subprocess.run(['piper','--model',PIPER,'--length_scale','0.97','--sentence_silence','0.35','--output_file',f],input=text.encode(),check=True,capture_output=True)
    return sf.read(f)
R=json.load(open(os.path.join(HERE,'roteiro.json')))
t=0.3; pieces=[]; words=[]; SR=22050
for l in R['lines']:
    s,SR=say(l['text']); a=np.abs(s); idx=np.where(a>a.max()*0.02)[0]; s=s[max(0,idx[0]-200):idx[-1]+500]
    d=len(s)/SR; l['start']=round(t,3); l['end']=round(t+d,3)
    ws=l['text'].split(' '); tot=sum(len(w)+1 for w in ws); acc=0
    for w in ws:
        a0=t+d*acc/tot; acc+=len(w)+1; words.append({'text':w,'startSeconds':round(a0,3),'endSeconds':round(t+d*acc/tot,3),'line':l['id']})
    pieces.append((t,s)); t+=d+l['gap']
v=np.zeros(int((t+0.5)*SR),dtype=np.float32)
for st,s in pieces: i=int(st*SR); v[i:i+len(s)]+=s
sf.write(os.path.join(HERE,'voz.wav'),v/np.abs(v).max()*0.9,SR)
R['words']=words; json.dump(R,open(os.path.join(HERE,'timings.json'),'w'),ensure_ascii=False,indent=1)
print('voz total',round(t,2)); [print(l['id'],l['start'],l['end']) for l in R['lines']]
