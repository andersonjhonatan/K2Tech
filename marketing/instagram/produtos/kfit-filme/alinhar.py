"""Alinha a narração gravada (voz-elevenlabs.mp3) às linhas do roteiro pelas pausas -> voz.wav + timings.json"""
import json, os, re, subprocess, numpy as np, soundfile as sf
HERE=os.path.dirname(os.path.abspath(__file__)); SRC=os.path.join(HERE,'voz-elevenlabs.mp3')
log=subprocess.run(['ffmpeg','-i',SRC,'-af','silencedetect=n=-38dB:d=0.18','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',log)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',log)]
subprocess.run(['ffmpeg','-y','-v','error','-i',SRC,'-ac','1','-ar','44100',os.path.join(HERE,'voz.wav')],check=True)
s,SR=sf.read(os.path.join(HERE,'voz.wav')); a=np.abs(s); idx=np.where(a>a.max()*0.02)[0]; t0=idx[0]/SR; t1=idx[-1]/SR
P=[(x,y) for x,y in zip(st,en) if x>t0+0.3 and y<t1-0.3]          # pausas internas
R=json.load(open(os.path.join(HERE,'roteiro.json'))); Ls=R['lines']
w=np.array([len(l['text']) for l in Ls],float)
# DP: escolher len(Ls)-1 pausas como fronteiras, minimizando erro relativo de duração (com pausa maior = mais provável)
n=len(Ls); m=len(P); bounds=[t0]+[None]*0
speech=t1-t0; rate=w.sum()/speech
INF=1e9; dp=np.full((n,m+1),INF); bk=np.zeros((n,m+1),int)
def cost(a0,a1,i): d=a1-a0; e=w[i]/rate; return ((d-e)/e)**2
ends=[p[0] for p in P]; starts=[p[1] for p in P]
for j in range(m): dp[0,j]=cost(t0,ends[j],0)-0.3*(P[j][1]-P[j][0])
for i in range(1,n-1):
    for j in range(i,m):
        best=INF
        for k in range(i-1,j):
            c=dp[i-1,k]+cost(starts[k],ends[j],i)-0.3*(P[j][1]-P[j][0])
            if c<best: best=c; bk[i,j]=k
        dp[i,j]=best
best=INF; kb=0
for k in range(n-2,m):
    c=dp[n-2,k]+cost(starts[k],t1,n-1)
    if c<best: best=c; kb=k
ch=[kb]
for i in range(n-2,0,-1): ch.append(bk[i,ch[-1]])
ch=ch[::-1]
seg=[]; a0=t0
for j in ch: seg.append((a0,ends[j])); a0=starts[j]
seg.append((a0,t1))
words=[]
for l,(x,y) in zip(Ls,seg):
    l['start']=round(x,3); l['end']=round(y+0.05,3)
    inner=[p for p in P if p[0]>x+0.1 and p[1]<y-0.1]
    # sub-trechos dentro da linha (pausas internas) para palavras mais precisas
    pieces=[]; b=x
    for p in inner: pieces.append((b,p[0])); b=p[1]
    pieces.append((b,y))
    ws=l['text'].split(' ')
    # divide as palavras entre sub-trechos por proporção de caracteres
    tot=sum(len(q)+1 for q in ws); D=sum(e-s_ for s_,e in pieces)
    acc=0
    def at(frac):
        tgt=frac*D
        for s_,e in pieces:
            if tgt<=e-s_: return s_+tgt
            tgt-=e-s_
        return pieces[-1][1]
    for q in ws:
        f0=acc/tot; acc+=len(q)+1
        words.append({'text':q,'startSeconds':round(at(f0),3),'endSeconds':round(at(acc/tot),3),'line':l['id']})
R['words']=words; json.dump(R,open(os.path.join(HERE,'timings.json'),'w'),ensure_ascii=False,indent=1)
for l in Ls: print(l['id'],l['start'],l['end'],round(l['end']-l['start'],2),round(len(l['text'])/rate,2),l['text'][:40])
