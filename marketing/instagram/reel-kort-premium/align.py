import json, re, numpy as np, soundfile as sf
from scipy.signal import butter, sosfiltfilt, find_peaks
OFF=1.25  # corte do início feito na voz tratada
S=[('intro','Fala, barbeiro!'),('intro','Deixa eu te mostrar como funciona o KORT.'),
 ('c1','Seu cliente recebe o link da sua barbearia.'),('c1','Ali ele já vê o endereço, a equipe e o cartão fidelidade dele.'),
 ('c2','Ele escolhe o serviço…'),('c3','…escolhe com quem quer cortar, o dia e o horário.'),
 ('c3','O que já tá ocupado aparece riscado.'),('c3','Aí é só confirmar.'),
 ('c4','Pronto! Horário marcado.'),('c4','E ainda ganha um selo no cartão fidelidade.'),
 ('d1','E você, dono, vê tudo na hora, na sua agenda do dia.'),('d1','Sem ficar respondendo mensagem no WhatsApp.'),
 ('d2','E ainda acompanha quanto a barbearia faturou no dia, na semana e no mês.'),
 ('outro','Esse é o KORT, da TresK Tecnologia.'),('outro','Quer na sua barbearia? Me chama no direct.')]
def syl(t):
    t=t.lower().replace('kort','cort').replace('tresk','tresqui').replace('whatsapp','uatsapi')
    return sum(len(re.findall(r'[aeiouáéíóúâêôãõà]+',w)) or 1 for w in re.findall(r"[\wáéíóúâêôãõàç]+",t))
a,sr=sf.read('/home/claude/audio_in/voz16.wav')
sos=butter(4,[300,3000],btype='band',fs=sr,output='sos'); env=np.abs(sosfiltfilt(sos,a))
env=np.convolve(env,np.ones(320)/320,'same')[::160]; env=np.convolve(env,np.hanning(9)/np.hanning(9).sum(),'same')
segs=[(1.49,4.71),(5.42,20.73),(21.07,22.75),(23.09,24.92),(26.28,30.33),(30.78,33.18),(34.39,40.26),(40.6,41.8),(42.3,43.99),(44.5,47.2)]
peaks=[]
for s,t in segs:
    x=env[int(s*100):int(t*100)]
    p,_=find_peaks(x,distance=11,prominence=0.25*np.std(x),height=np.percentile(x,35))
    pts=list(s+p/100)
    peaks+= [s]+pts if not pts or pts[0]-s>0.12 else pts  # garante início do trecho
peaks=np.array(sorted(peaks)); N=len(peaks)
pauses=[(segs[i][1],segs[i+1][0]) for i in range(len(segs)-1)]
cum=np.cumsum([syl(x) for _,x in S]); tot=cum[-1]
def time_at(frac):
    k=min(N-1,max(0,int(round(frac*N))))
    return peaks[k]
starts=[segs[0][0]]; 
for f in cum[:-1]/tot:
    t=time_at(f)
    # encosta no fim da pausa mais próxima (se perto)
    best=min(pauses,key=lambda p:abs(p[1]-t))
    starts.append(best[1] if abs(best[1]-t)<0.9 else t-0.05)
ends=[]
for i in range(len(S)):
    nxt=starts[i+1] if i+1<len(S) else segs[-1][1]
    cand=[p[0] for p in pauses if starts[i]<p[0]<=nxt+0.01]
    ends.append(min(nxt, max(cand) if cand and max(cand)>starts[i]+0.4 else nxt))
out=[{'scene':sc,'text':tx,'start':round(s-OFF,2),'end':round(e-OFF,2)} for (sc,tx),s,e in zip(S,starts,ends)]
for o in out: print(f"{o['start']:6.2f}-{o['end']:6.2f} {o['scene']:5} {o['text']}")
json.dump(out,open('sentences.json','w'),ensure_ascii=False,indent=1)
