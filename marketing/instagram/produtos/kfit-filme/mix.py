"""voz.wav (ElevenLabs) tratada + score.wav com ducking -> mix.wav"""
import json, os, subprocess
HERE=os.path.dirname(os.path.abspath(__file__)); V=json.load(open(os.path.join(HERE,'timings.json')))['voff']
d=int(V*1000)
fc=(f"[0:a]aresample=48000,highpass=f=80,equalizer=f=250:t=q:w=1:g=-2,equalizer=f=3500:t=q:w=1.2:g=2,"
    f"acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2,adelay={d}|{d},aformat=channel_layouts=stereo,apad,asplit=2[v][sc];"
    "[1:a]aresample=48000,volume=0.75[m];[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=350[md];"
    "[md][v]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95,loudnorm=I=-14:TP=-1.2:LRA=9[o]")
subprocess.run(['ffmpeg','-y','-v','error','-i','voz.wav','-i','score.wav','-filter_complex',fc,'-map','[o]','-ar','48000','mix.wav'],cwd=HERE,check=True)
print('ok')
