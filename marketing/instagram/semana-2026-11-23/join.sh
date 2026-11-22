#!/bin/bash
# join.sh BPM body.mp4 out.mp4
BPM=$1; BODY=$2; OUT=$3
D=$(python3 -c "import math;b=60/$BPM;n=math.floor(4.969/b);print(f'{n*b:.4f}')")
F=$(python3 -c "print(f'{$D-0.2:.4f}')")
A=/home/claude/k2tech/public/instagram/tresk-abertura.mp4
ffmpeg -y -i $A -i $BODY -filter_complex "[0:v]trim=0:$D,setpts=PTS-STARTPTS,fps=30,format=yuv420p[v0];[0:a]atrim=0:$D,asetpts=PTS-STARTPTS,afade=t=out:st=$F:d=0.2,aresample=48000,aformat=channel_layouts=stereo[a0];[1:v]fps=30,format=yuv420p,setpts=PTS-STARTPTS[v1];[1:a]aresample=48000,aformat=channel_layouts=stereo,asetpts=PTS-STARTPTS[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" -c:v libx264 -crf 19 -preset medium -pix_fmt yuv420p -c:a aac -b:a 160k -ar 48000 -movflags +faststart $OUT 2>&1 | tail -1
echo "abertura=$D"; ffprobe -v error -show_entries format=duration,size -of compact $OUT
