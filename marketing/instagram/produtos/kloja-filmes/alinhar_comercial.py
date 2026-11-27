"""Alinha a narração do comercial (comercial-elevenlabs.mp3) às 11 falas -> v1-tempos.js"""
import re, subprocess, json, numpy as np, soundfile as sf
SRC='comercial-elevenlabs.mp3'
LINES=['Toda loja começa assim: abrindo as portas.','Mas por trás do balcão quase sempre tem um caderno. O fiado anotado à mão, o estoque na cabeça… e o fim do mês no susto.','Agora a sua loja tem um sistema à altura dela.','A sua vitrine vai para o celular da cliente: um link com fotos, tamanhos e preços.','No balcão, a venda sai em segundos: Pix, cartão, dinheiro ou crediário. E o estoque baixa sozinho.','O crediário sai do caderno e ganha contrato, parcelas e vencimentos.','E a sua cliente acompanha tudo no app Meu Crediário, com a marca da sua loja, e paga a parcela no Pix.','No fim do dia, você sabe exatamente quanto entrou.','Nasceu dentro de uma loja de verdade: a Divina Baby, no Sertão de Pernambuco.','KLOJA. A sua loja inteira num sistema só.','Desenvolvido pela Tresk Tecnologia. Teste grátis por dez dias.']
log=subprocess.run(['ffmpeg','-i',SRC,'-af','silencedetect=n=-40dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',log)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',log)]
subprocess.run(['ffmpeg','-y','-v','error','-i',SRC,'-ac','1','-ar','44100','/tmp/com.wav'],check=True)
s,SR=sf.read('/tmp/com.wav'); a=np.abs(s); idx=np.where(a>a.max()*.02)[0]; t0=idx[0]/SR; t1=idx[-1]/SR
P=[(x,y) for x,y in zip(st,en) if x>t0+.3 and y<t1-.3]
w=np.array([len(l)+8 for l in LINES],float); rate=w.sum()/(t1-t0-sum(y-x for x,y in P))
n=len(LINES); m=len(P); INF=1e9; ends=[p[0] for p in P]; starts=[p[1] for p in P]
def cost(a0,a1,i): d=a1-a0; e=w[i]/rate; return ((d-e)/e)**2
dp=np.full((n,m),INF); bk=np.zeros((n,m),int)
for j in range(m): dp[0,j]=cost(t0,ends[j],0)-1.2*(P[j][1]-P[j][0])
for i in range(1,n-1):
    for j in range(i,m):
        for k in range(i-1,j):
            c=dp[i-1,k]+cost(starts[k],ends[j],i)-1.2*(P[j][1]-P[j][0])
            if c<dp[i,j]: dp[i,j]=c; bk[i,j]=k
best=INF;kb=0
for k in range(n-2,m):
    c=dp[n-2,k]+cost(starts[k],t1,n-1)
    if c<best: best=c;kb=k
ch=[kb]
for i in range(n-2,0,-1): ch.append(bk[i,ch[-1]])
ch=ch[::-1]; seg=[]; a0=t0
for j in ch: seg.append((float(a0),float(ends[j])+.05)); a0=starts[j]
seg.append((float(a0),float(t1)+.05))
OFF=1.6
seg=[(round(x+OFF,3),round(y+OFF,3)) for x,y in seg]
open('v1-tempos.js','w').write('window.VOZ='+json.dumps(seg)+';window.VOZTXT='+json.dumps(LINES,ensure_ascii=False)+';')
print(len(P),'pausas'); [print(sg,l[:50]) for sg,l in zip(seg,LINES)]
