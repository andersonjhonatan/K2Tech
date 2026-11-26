"""Trilhas sintetizadas dos 3 vídeos do KLOJA.
python3 music.py m1 64      -> cinematográfica (comercial)
python3 music.py m2 57      -> leve + 'plim' de mensagem (WhatsApp)
python3 music.py m3 63.8    -> leve e divertida (conversa ilustrada)"""
import sys, os, wave, numpy as np
from scipy.signal import lfilter
HERE=os.path.dirname(os.path.abspath(__file__)); SR=48000
mode, END = sys.argv[1], float(sys.argv[2]); N=int(END*SR); out=np.zeros((N,2)); rng=np.random.default_rng(7)
def lp(x,fc): a=np.exp(-2*np.pi*fc/SR); return lfilter([1-a],[1,-a],x)
def hp(x,fc): return x-lp(x,fc)
def add(sig,at,g=1.,pan=0.):
    i=int(at*SR); j=min(N,i+len(sig))
    if i>=N or j<=0: return
    s=sig[:j-i]*g; out[i:j,0]+=s*np.sqrt((1-pan)/2); out[i:j,1]+=s*np.sqrt((1+pan)/2)
hz=lambda m:440*2**((m-69)/12)
def note(f,dur,kind='piano'):
    n=int(dur*SR); x=np.arange(n)/SR
    if kind=='piano': return (np.sin(2*np.pi*f*x)+.45*np.sin(4*np.pi*f*x)+.18*np.sin(6*np.pi*f*x))*np.exp(-x*2.6)*np.clip(x/.004,0,1)
    if kind=='pluck': return (np.sin(2*np.pi*f*x)+.3*np.sin(4*np.pi*f*x))*np.exp(-x*7)*np.clip(x/.002,0,1)
    if kind=='mallet': return (np.sin(2*np.pi*f*x)+.2*np.sin(2*np.pi*f*4*x))*np.exp(-x*9)*np.clip(x/.001,0,1)
    if kind=='pad':
        s=sum(np.sin(2*np.pi*(f+d)*x+rng.random()*6) for d in (-.8,0,.8))/3; return lp(s,1600)*np.clip(x/1.0,0,1)*np.clip((dur-x)/1.0,0,1)
    if kind=='bass': return np.sin(2*np.pi*f*x)*np.exp(-x*1.2)*np.clip(x/.01,0,1)
    if kind=='sub': return np.sin(2*np.pi*f*x)*np.clip(x/.02,0,1)*np.clip((dur-x)/.2,0,1)
def kick(g=1):
    n=int(.4*SR); x=np.arange(n)/SR; fr=48+110*np.exp(-x*28); return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-x*8)
def clap():
    n=int(.2*SR); x=np.arange(n)/SR; return hp(rng.standard_normal(n),1200)*np.exp(-x*22)
def snap():
    n=int(.12*SR); x=np.arange(n)/SR; return hp(rng.standard_normal(n),2500)*np.exp(-x*40)
def shk():
    n=int(.06*SR); return hp(rng.standard_normal(n),6000)*np.exp(-np.linspace(0,7,n))
def boom(d=3.):
    n=int(d*SR); x=np.arange(n)/SR; fr=60*np.exp(-x*3)+28; return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-x*1.5)+lp(rng.standard_normal(n),1500)*np.exp(-x*7)*.5
def riser(d=2.):
    n=int(d*SR); x=np.linspace(0,1,n); r=np.zeros(n); nz=rng.standard_normal(n); seg=2400
    for k in range(0,n,seg): r[k:k+seg]=hp(nz[k:k+seg],300+6000*x[k]**2)
    return r*x**2
def plim():
    return note(hz(88),.35,'mallet')*.7+np.concatenate([np.zeros(int(.07*SR)),note(hz(93),.3,'mallet')])[:int(.35*SR)]*.7

if mode=='m1':
    # A: escuro e contido até a virada (13 s)
    for k,(r,ch) in enumerate([(45,[57,60,64]),(41,[53,57,60]),(43,[55,59,62]),(40,[52,55,59])]):
        t=0.3+k*3.2
        add(note(hz(r-12),3.6,'sub'),t,.35); add(note(hz(ch[0]),3.6,'pad'),t,.10,-.3); add(note(hz(ch[2]),3.6,'pad'),t,.08,.3)
        for j,m in enumerate([ch[0]+12,ch[2]+12,ch[1]+24]): add(note(hz(m),2.4,'piano'),t+j*.8,.08,(-.3,0,.3)[j])
    for k in range(8): add(kick()*.6,5.2+k*.95,.35)          # pulso de tensão no problema
    add(riser(2.4),10.7,.22); add(boom(4),13.0,1.0)
    for k,m in enumerate([76,79,83,88]): add(note(hz(m),3,'piano'),13.2+k*.12,.12,(-.3,-.1,.1,.3)[k])
    # B: comercial 112 BPM até 57
    b=60/112; t=15.4; i=0; prog=[(45,[57,60,64]),(41,[53,57,60]),(48,[55,60,64]),(43,[55,59,62])]
    while t<56.6:
        r,ch=prog[i%4]; bar=4*b
        add(note(hz(r-12),bar,'sub'),t,.30); add(note(hz(ch[0]),bar+.6,'pad'),t,.07,-.3); add(note(hz(ch[2]),bar+.6,'pad'),t,.06,.3)
        for k in range(4):
            add(kick(),t+k*b,.42)
            if k%2: add(clap(),t+k*b,.14,.1)
        for k in range(8): add(shk(),t+k*b/2+b/4,.06,(-.4,.4)[k%2])
        for k,m in enumerate([ch[0]+12,ch[2]+12,ch[1]+12,ch[2]+12,ch[0]+24,ch[2]+12,ch[1]+12,ch[2]+12]): add(note(hz(m),.8,'pluck'),t+k*b/2,.09,(-.25,.25)[k%2])
        t+=bar; i+=1
    for at in [19,26,33,39,47,52]: add(riser(.8),at-.8,.08)
    add(riser(2.2),54.8,.2); add(boom(5),57.0,.9)
    for m in [45,52,57,61,64,69]: add(note(hz(m),END-57,'pad'),57.1,.07)
    for k,m in enumerate([81,85,88,93]): add(note(hz(m),2.5,'piano'),57.3+k*.1,.1,(-.3,-.1,.1,.3)[k])
else:
    # leve e simpática, 104 BPM, com estalos de dedo
    b=60/104; t=0.3; i=0; prog=[(48,[60,64,67]),(45,[57,60,64]),(41,[53,57,60]),(43,[55,59,62])]
    end_music = END-6.8
    while t<end_music:
        r,ch=prog[i%4]; bar=4*b
        add(note(hz(r-12),bar*.95,'bass'),t,.30); add(note(hz(r-12+7),b*.9,'bass'),t+2*b,.18)
        add(note(hz(ch[0]),bar+.5,'pad'),t,.05,-.3)
        for k in range(4):
            if k%2: add(snap(),t+k*b,.22,.2)
            add(kick()*.5,t+k*b,.22)
        for k,m in enumerate([ch[0]+12,ch[1]+12,ch[2]+12,ch[1]+12,ch[2]+12,ch[0]+24,ch[2]+12,ch[1]+12]):
            add(note(hz(m),.5,'mallet'),t+k*b/2,.11,(-.35,.35)[k%2])
        t+=bar; i+=1
    if mode=='m2':
        msgs=[0.6,2.2,4.6,7.4,10.0,11.6,15.4,17.8,19.8,23.4,26.8,29.0,31.4,33.4,37.2,39.6,41.8,44.6,47.4]
        for k,m in enumerate(msgs): add(plim(),m,.35,(.3 if k%2 else -.3))
    st=END-6.6
    add(riser(1.6),st-1.6,.18); add(boom(4),st,.8)
    for m in [48,55,60,64,67,72]: add(note(hz(m),6,'pad'),st+.1,.07)
    for k,m in enumerate([84,88,91,96]): add(note(hz(m),2.4,'piano'),st+.2+k*.1,.1,(-.3,-.1,.1,.3)[k])
    t=st+.6
    while t<END-1.2: add(kick()*.6,t,.25); add(shk(),t+b/2,.05); t+=b
ir_n=int(1.5*SR); ir=rng.standard_normal(ir_n)*np.exp(-np.linspace(0,7,ir_n)); ir/=np.sqrt((ir**2).sum())
def conv(x):
    Ln=len(x)+ir_n-1; nf=1<<(Ln-1).bit_length(); return np.fft.irfft(np.fft.rfft(x,nf)*np.fft.rfft(ir,nf),nf)[:len(x)]
mix=out*.85+np.stack([conv(out[:,0]),conv(out[:,1])],1)*.3
f=np.ones(N); fi=int(.3*SR); fo=int(1.8*SR); f[:fi]=np.linspace(0,1,fi); f[-fo:]=np.linspace(1,0,fo); mix*=f[:,None]
mix=mix/np.abs(mix).max()*10**(-3/20)
with wave.open(os.path.join(HERE,mode+'.wav'),'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix,-1,1)*32767).astype('<i2').tobytes())
print(mode,END)
