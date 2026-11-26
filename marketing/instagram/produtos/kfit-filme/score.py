"""Trilha acolhedora e otimista (sintetizada) a partir de timings.json -> score.wav"""
import json, os, numpy as np, wave
from scipy.signal import lfilter
HERE=os.path.dirname(os.path.abspath(__file__)); SR=48000
TM=json.load(open(os.path.join(HERE,'timings.json'))); V=TM['voff']
L={l['id']:(l['start']+V,l['end']+V) for l in TM['lines']}
END=L['l16'][1]+TM['tail']; N=int(END*SR); out=np.zeros((N,2)); rng=np.random.default_rng(5)
S={'S1':L['l2'][0]-.3,'S2':L['l3'][0]-.3,'S3':L['l4'][0]-.3,'S4':L['l5'][0]-.3,'S5':L['l6'][0]-.3,'S6':L['l7'][0]-.4,'S7':L['l8'][0]-.3,'S14':L['l15'][0]-.4,'S15':L['l16'][0]-.3}
def lp(x,fc): a=np.exp(-2*np.pi*fc/SR); return lfilter([1-a],[1,-a],x)
def hp(x,fc): return x-lp(x,fc)
def add(sig,at,g=1.,pan=0.):
    i=int(at*SR); j=min(N,i+len(sig))
    if i>=N or j<=0: return
    s=sig[:j-i]*g; out[i:j,0]+=s*np.sqrt((1-pan)/2); out[i:j,1]+=s*np.sqrt((1+pan)/2)
def note(f,dur,kind='piano'):
    n=int(dur*SR); x=np.arange(n)/SR
    if kind=='piano': s=(np.sin(2*np.pi*f*x)+.45*np.sin(4*np.pi*f*x)+.18*np.sin(6*np.pi*f*x))*np.exp(-x*2.6)*np.clip(x/.004,0,1)
    elif kind=='pluck': s=(np.sin(2*np.pi*f*x)+.3*np.sin(4*np.pi*f*x))*np.exp(-x*7)*np.clip(x/.002,0,1)
    elif kind=='pad':
        s=sum(np.sin(2*np.pi*(f+d)*x+rng.random()*6) for d in (-.7,0,.7))/3; s=lp(s,1800)*np.clip(x/1.2,0,1)*np.clip((dur-x)/1.2,0,1)
    elif kind=='bass': s=np.sin(2*np.pi*f*x)*np.exp(-x*1.4)*np.clip(x/.01,0,1)
    return s
hz=lambda m:440*2**((m-69)/12)
# chords (midi roots)
minor=[(57,[57,60,64]),(53,[53,57,60]),(48,[48,52,55]),(55,[55,59,62])]   # Am F C G
major=[(48,[48,52,55]),(55,[55,59,62]),(57,[57,60,64]),(53,[53,57,60])]   # C G Am F
# PART A: 0 -> S6 gentle arpeggios at 78 BPM
bpm=78; b=60/bpm; t=0.2; i=0
while t<S['S6']-0.2:
    root,ch=minor[i%4]; bar=4*b
    add(note(hz(root-12),bar*1.1,'bass'),t,.30)
    add(note(hz(ch[0]),bar+1,'pad'),t,.08,-.3); add(note(hz(ch[2]),bar+1,'pad'),t,.06,.3)
    if not (S['S5']-0.3<t<S['S6']):  # arpeggio (pausa no momento cansado)
        seq=[ch[0]+12,ch[1]+12,ch[2]+12,ch[1]+12,ch[0]+24,ch[2]+12,ch[1]+12,ch[2]+12]
        for k,m in enumerate(seq): add(note(hz(m),1.6,'piano'),t+k*b/2,.10,(-.25,.25)[k%2])
    t+=bar; i+=1
# SFX part A
def buzz(d=.25):
    n=int(d*SR); x=np.arange(n)/SR; return np.sin(2*np.pi*150*x)*(np.sin(2*np.pi*30*x)>0)*np.exp(-x*3)
for k in range(4): add(buzz(),S['S1']+.3+k*.55,.18,(-.5,.5)[k%2])
def whoosh(d=.6):
    n=int(d*SR); x=np.linspace(0,1,n); return lp(rng.standard_normal(n),3000)*np.sin(np.pi*x)**2
add(whoosh(.9),S['S2']+.9,.30,.4)
for k in range(3): add(hp(rng.standard_normal(1500),2500)*np.exp(-np.linspace(0,6,1500)),S['S4']+.9*k,.25)
# TURN: riser into S6 + chime
n=int(2.2*SR); x=np.linspace(0,1,n); r=np.zeros(n); nz=rng.standard_normal(n); seg=2400
for k in range(0,n,seg): r[k:k+seg]=hp(nz[k:k+seg],300+5000*x[k]**2)
add(r*x**2,S['S6']-2.2+0.3,.16)
for k,m in enumerate([72,76,79,84]): add(note(hz(m),2.5,'piano'),S['S6']+.25+k*.12,.12,(-.3,.3)[k%2])
# PART B: S6+1.2 -> S14  upbeat 100 BPM
bpm=100; b=60/bpm; t=S['S6']+1.4; i=0
def kick():
    n=int(.35*SR); x=np.arange(n)/SR; fr=50+90*np.exp(-x*30); return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-x*9)
def clap():
    n=int(.2*SR); x=np.arange(n)/SR; return hp(rng.standard_normal(n),1200)*np.exp(-x*22)
def shk():
    n=int(.06*SR); return hp(rng.standard_normal(n),6000)*np.exp(-np.linspace(0,7,n))
while t<S['S14']-0.3:
    root,ch=major[i%4]; bar=4*b
    add(note(hz(root-12),bar*1.05,'bass'),t,.32)
    add(note(hz(ch[0]),bar+1,'pad'),t,.07,-.3); add(note(hz(ch[2]),bar+1,'pad'),t,.06,.3)
    for k in range(4):
        add(kick(),t+k*b,.45)
        if k%2==1: add(clap(),t+k*b,.16,.1)
    for k in range(8): add(shk(),t+k*b/2+b/4,.07,(-.4,.4)[k%2])
    mel=[ch[2]+12,ch[1]+12,ch[0]+12,ch[1]+12,ch[2]+12,ch[0]+24,ch[2]+12,ch[1]+12]
    for k,m in enumerate(mel): add(note(hz(m),.9,'pluck'),t+k*b/2,.11,(-.2,.2)[k%2])
    t+=bar; i+=1
# LAUNCH: hit + sparkle + outro chord
def boom(d=3.):
    n=int(d*SR); x=np.arange(n)/SR; fr=65*np.exp(-x*3)+30; return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-x*1.6)+lp(rng.standard_normal(n),1800)*np.exp(-x*8)*.4
add(boom(),S['S14']+.05,.9)
for k,m in enumerate([84,88,91,96,100]): add(note(hz(m),2.,'piano'),S['S14']+.2+k*.09,.09,(-.4,-.2,0,.2,.4)[k])
for m in [48,55,60,64,67]: add(note(hz(m),END-S['S14'],'pad'),S['S14']+.1,.06)
# outro light beat under CTA
t=S['S15']+.2; b=60/100
while t<END-1.5:
    add(kick(),t,.25); add(shk(),t+b/2,.05); t+=b
# reverb + master
ir_n=int(1.6*SR); ir=rng.standard_normal(ir_n)*np.exp(-np.linspace(0,7,ir_n)); ir/=np.sqrt((ir**2).sum())
def conv(x):
    Ln=len(x)+ir_n-1; nf=1<<(Ln-1).bit_length(); return np.fft.irfft(np.fft.rfft(x,nf)*np.fft.rfft(ir,nf),nf)[:len(x)]
mix=out*.85+np.stack([conv(out[:,0]),conv(out[:,1])],1)*.35
f=np.ones(N); fi=int(.3*SR); fo=int(2*SR); f[:fi]=np.linspace(0,1,fi); f[-fo:]=np.linspace(1,0,fo); mix*=f[:,None]
mix=mix/np.abs(mix).max()*10**(-4/20); print('score',round(END,2))
with wave.open(os.path.join(HERE,'score.wav'),'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix,-1,1)*32767).astype('<i2').tobytes())
