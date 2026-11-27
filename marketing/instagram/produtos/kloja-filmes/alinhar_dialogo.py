"""Alinha o diálogo da ElevenLabs (dialogo-elevenlabs.mp3) às 14 falas pelas pausas -> v3-tempos.js e v2-tempos.js"""
import re, subprocess, json, numpy as np, soundfile as sf
SRC='dialogo-elevenlabs.mp3'
LINES=['Ai, Joana… mais um dia procurando o caderno do fiado. Sumiu de novo!','Caderno? Mulher, eu aposentei o meu.','Aposentou como? E quem te deve?','Tá tudo aqui, ó. No KLOJA: cada cliente, cada parcela, quem pagou e quem tá atrasada.','E as clientes, como é que ficam sabendo?','Elas têm o app Meu Crediário, com o nome da minha loja. Veem a parcela e pagam no Pix.','Sem eu ter que ficar cobrando?!','E o estoque? Eu nunca sei se tem o M.','Vendeu no caixa, baixa sozinho. E as clientes veem as peças no meu catálogo, pelo link.','Hum… isso deve ser caro.','Que nada! Dá pra testar dez dias grátis. E quem fez foi a Tresk, aqui do Sertão.','Pois amanhã eu fecho o caderno… e abro o KLOJA!','Bem-vinda ao clube!','KLOJA. A sua loja inteira num sistema só. Teste grátis por dez dias.']
log=subprocess.run(['ffmpeg','-i',SRC,'-af','silencedetect=n=-38dB:d=0.18','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',log)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',log)]
subprocess.run(['ffmpeg','-y','-v','error','-i',SRC,'-ac','1','-ar','44100','dialogo.wav'],check=True)
s,SR=sf.read('dialogo.wav'); a=np.abs(s); idx=np.where(a>a.max()*.02)[0]; t0=idx[0]/SR; t1=idx[-1]/SR
P=[(x,y) for x,y in zip(st,en) if x>t0+.3 and y<t1-.3]
w=np.array([len(l)+12 for l in LINES],float); rate=w.sum()/(t1-t0-sum(y-x for x,y in P))
n=len(LINES); m=len(P); INF=1e9
ends=[p[0] for p in P]; starts=[p[1] for p in P]
def cost(a0,a1,i): d=a1-a0; e=w[i]/rate; return ((d-e)/e)**2
dp=np.full((n,m),INF); bk=np.zeros((n,m),int)
for j in range(m): dp[0,j]=cost(t0,ends[j],0)-.6*(P[j][1]-P[j][0])
for i in range(1,n-1):
    for j in range(i,m):
        for k in range(i-1,j):
            c=dp[i-1,k]+cost(starts[k],ends[j],i)-.6*(P[j][1]-P[j][0])
            if c<dp[i,j]: dp[i,j]=c; bk[i,j]=k
best=INF;kb=0
for k in range(n-2,m):
    c=dp[n-2,k]+cost(starts[k],t1,n-1)
    if c<best: best=c;kb=k
ch=[kb]
for i in range(n-2,0,-1): ch.append(bk[i,ch[-1]])
ch=ch[::-1]; seg=[]; a0=t0
for j in ch: seg.append((round(a0,3),round(ends[j]+.05,3))); a0=starts[j]
seg.append((round(a0,3),round(t1+.05,3)))
OFF=1.2  # o áudio começa 1,2 s depois do início do corpo do vídeo
seg=[(x+OFF,y+OFF) for x,y in seg]
open('v3-tempos.js','w').write('window.VOZ='+json.dumps(seg)+';')
# WhatsApp: cada mensagem aparece no começo da fala (ou dentro dela)
L=lambda i,f=0:round(seg[i][0]+f*(seg[i][1]-seg[i][0]),2)
msgt=[L(0),L(0,.77),L(1),L(2),L(3),L(3,.4),L(4),L(5),L(5,.3),L(5,.62),L(6),L(7),L(8),L(8,.5),L(9),L(10),L(10,.52),L(11),L(12)]
open('v2-tempos.js','w').write('window.MSGT='+json.dumps(msgt)+';window.END_V='+json.dumps(round(seg[13][0]-.4,2))+';window.TOT_V='+json.dumps(round(seg[13][1]+2.6,2))+';')
for l,sg in zip(LINES,seg): print(sg, l[:45])
