"""Trilha cinematográfica sintetizada a partir de timings.json -> score.wav (48 kHz estéreo)."""
import json, numpy as np, wave, os
HERE=os.path.dirname(os.path.abspath(__file__)); SR=48000
TM=json.load(open(os.path.join(HERE,'timings.json'))); V=TM['voff']
L=[(l['start']+V,l['end']+V) for l in TM['lines']]
END=L[5][1]+TM['tail']; SB=[0]+[l[0]-0.35 for l in L[1:]]
N=int(END*SR); t=np.arange(N)/SR
out=np.zeros((N,2))
rng=np.random.default_rng(3)
def env(a,d,length):
    n=int(length*SR); e=np.ones(n); na=int(a*SR); nd=int(d*SR)
    if na: e[:na]=np.linspace(0,1,na)
    if nd: e[-nd:]*=np.linspace(1,0,nd)
    return e
def add(sig,at,gain=1.0,pan=0.0):
    i=int(at*SR); j=min(N,i+len(sig))
    if i>=N or j<=0: return
    s=sig[:j-i]*gain; l=np.sqrt((1-pan)/2); r=np.sqrt((1+pan)/2)
    out[i:j,0]+=s*l; out[i:j,1]+=s*r
def lp(x,fc):
    a=np.exp(-2*np.pi*fc/SR); y=np.zeros_like(x); acc=0.0
    # vectorized one-pole via lfilter-like loop on chunks
    from math import exp
    import numpy as _n
    b=1-a
    y=_n.empty_like(x); acc=0.0
    for k in range(len(x)):
        acc=b*x[k]+a*acc; y[k]=acc
    return y
try:
    from scipy.signal import lfilter
    def lp(x,fc):
        a=np.exp(-2*np.pi*fc/SR); return lfilter([1-a],[1,-a],x)
except Exception: pass
def hp(x,fc): return x-lp(x,fc)
# 1) drone (whole piece), swelling
dr=np.zeros(N)
for f,g in [(41.2,1.0),(41.5,.6),(61.7,.35),(82.4,.3)]:
    dr+=g*np.sin(2*np.pi*f*t+rng.random()*6)
sw=0.35+0.65*np.clip(t/SB[4],0,1)
dr*=sw*(1-np.clip((t-(END-1.5))/1.5,0,1))*0.20
dr*=0.85+0.15*np.sin(2*np.pi*0.25*t)
out[:,0]+=dr; out[:,1]+=dr
# 2) dark pad E minor from scene 2 to 5
def pad(freqs,start,stop,gain,att=2.0,rel=1.5):
    length=stop-start; n=int(length*SR); tt=np.arange(n)/SR; s=np.zeros(n)
    for f in freqs:
        for det in (-0.6,0.6):
            ph=rng.random()*6; s+=np.sign(np.sin(2*np.pi*(f+det)*tt+ph))*0.5+np.sin(2*np.pi*(f+det)*tt+ph)
    s=lp(s,900)*env(att,rel,length)/len(freqs)
    add(s,start,gain,-0.3); add(np.roll(s,1200),start,gain,0.3)
pad([164.8,196.0,246.9],SB[1],SB[4]+0.3,0.05)
# 3) ticking pulse scene 3 (accelerating)
tick=hp(rng.standard_normal(int(0.03*SR)),3000)*np.exp(-np.linspace(0,8,int(0.03*SR)))
tt=SB[2]+0.2; rate=2.0
while tt<SB[3]-0.1:
    add(tick,tt,0.25,0.4 if int(tt*10)%2 else -0.4); rate+=0.25; tt+=1/rate
# 4) heartbeat scene 4 synced to 4 flashes
D=SB[4]-SB[3]; step=D/4.2
def thump(f0=60,dur=0.35):
    n=int(dur*SR); x=np.arange(n)/SR; fr=f0*np.exp(-x*6); ph=2*np.pi*np.cumsum(fr)/SR
    return np.sin(ph)*np.exp(-x*12)
for i in range(4):
    a=SB[3]+i*step; add(thump(),a,0.9); add(thump(55,0.3),a+0.22,0.6)
# 5) risers before reveals (scene 4 start, scene 5, scene 6)
def riser(length):
    n=int(length*SR); x=np.linspace(0,1,n); nz=rng.standard_normal(n)
    s=np.zeros(n); seg=int(SR*0.05)
    for k in range(0,n,seg):
        fc=200+6000*x[k]**2; s[k:k+seg]=hp(nz[k:k+seg],fc*0.5)
    return s*x**2.2
for b,ln,g in [(SB[3],2.6,0.22),(SB[4],1.6,0.18),(SB[5],3.2,0.28)]:
    r=riser(ln); add(r,b-ln,g,-0.2); add(r[::-1][::-1],b-ln+0.01,g,0.2)
# 6) whooshes at every scene change
def whoosh(dur=0.7):
    n=int(dur*SR); x=np.linspace(0,1,n); nz=lp(rng.standard_normal(n),2500)
    return nz*np.sin(np.pi*x)**2
for b in SB[1:]:
    add(whoosh(),b-0.35,0.35,-0.6); add(whoosh(),b-0.33,0.35,0.6)
# 7) braam at TresK reveal + boom at KFit reveal
def braam(f=55,dur=2.6):
    n=int(dur*SR); x=np.arange(n)/SR; s=np.zeros(n)
    for h in range(1,14): s+=np.sin(2*np.pi*f*h*x+rng.random())/h
    open_=np.clip(x/0.25,0,1); s=lp(s,300+1800*open_[0]) if False else s
    s=lp(s,1400)*np.exp(-x*1.3)*np.clip(x/0.03,0,1)
    return s
def boom(dur=3.0):
    n=int(dur*SR); x=np.arange(n)/SR; fr=70*np.exp(-x*3)+28; ph=2*np.pi*np.cumsum(fr)/SR
    s=np.sin(ph)*np.exp(-x*1.6); nz=lp(rng.standard_normal(n),1800)*np.exp(-x*7)*0.5
    return s+nz
add(braam(),SB[4]+0.12,0.55); add(boom(2.0),SB[4]+0.1,0.5)
add(boom(3.5),SB[5]+0.03,1.0)
# 8) uplifting shimmer pad on KFit (E major) + bell
pad([164.8,207.7,246.9,329.6],SB[5]+0.2,END,0.07,att=1.2,rel=2.5)
def bell(f,dur=3.0):
    n=int(dur*SR); x=np.arange(n)/SR
    return (np.sin(2*np.pi*f*x)+0.4*np.sin(2*np.pi*f*2.76*x))*np.exp(-x*1.8)
for k,(f,dt) in enumerate([(659.3,1.9),(987.8,2.8),(1318.5,3.8)]): add(bell(f),SB[5]+dt,0.10,(-0.4,0.4,0)[k])
# 9) intro: soft hit + sparkle at line appearing in scene 1
add(boom(2.0),0.05,0.35); add(bell(1318.5,2.5),1.7,0.06,0.3)
# reverb (FFT convolution with noise IR)
ir_len=int(2.2*SR); ir=rng.standard_normal(ir_len)*np.exp(-np.linspace(0,7,ir_len)); ir/=np.sqrt((ir**2).sum())
def conv(x):
    L_=len(x)+ir_len-1; nfft=1<<(L_-1).bit_length()
    return np.fft.irfft(np.fft.rfft(x,nfft)*np.fft.rfft(ir,nfft),nfft)[:len(x)]
wet=np.stack([conv(out[:,0]),conv(out[:,1])],1)
mix=out*0.8+wet*0.45
mix=hp(mix[:,0],28)[:,None]*np.array([1,0])+hp(mix[:,1],28)[:,None]*np.array([0,1])
# fades + normalize to -12 dBFS RMS-ish (leave room for the voice)
fade=np.ones(N); fi=int(0.3*SR); fo=int(1.5*SR); fade[:fi]=np.linspace(0,1,fi); fade[-fo:]=np.linspace(1,0,fo); mix*=fade[:,None]
pk=np.abs(mix).max(); mix=mix/pk*10**(-4/20)
rms=np.sqrt((mix**2).mean()); print('rms dB',20*np.log10(rms),'dur',END)
pcm=(np.clip(mix,-1,1)*32767).astype('<i2')
with wave.open(os.path.join(HERE,'score.wav'),'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
