"use client";
import { MutableRefObject, useEffect, useRef } from "react";

type Props={progress:MutableRefObject<number>};
export function WebGLEnvelopeFlap({progress}:Props){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{const c=canvas.current;if(!c)return;const gl=c.getContext("webgl",{alpha:true,antialias:true,premultipliedAlpha:true});if(!gl)return;
 const vs=`attribute vec2 a;uniform float p;varying float light;void main(){float row=(1.0-a.y)*.5;float halfW=1.0-row;float x=a.x*halfW;float front=1.0-p*2.0;float d=max(0.0,row-(1.0-p));float active=smoothstep(0.0,.16,d);float ang=min(3.05,d*(5.0+4.0*p));float r=.22+.07*sin(p*3.14159);float yy=a.y;float z=0.0;if(active>0.0){float base=1.0-2.0*(1.0-p);yy=base-2.0*r*sin(ang);z=r*(1.0-cos(ang))*2.4;}float anchored=smoothstep(0.0,.14,row);z*=anchored;float persp=1.0/(1.0+z*.34);gl_Position=vec4(x*persp,yy*persp,z*.12,1.0);light=.62+.38*cos(ang);}`;
 const fs=`precision mediump float;varying float light;void main(){vec3 top=vec3(.12,.18,.29);vec3 bottom=vec3(.045,.075,.13);vec3 col=mix(bottom,top,light);gl_FragColor=vec4(col,1.0);}`;
 const shader=(type:number,src:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,src);gl.compileShader(s);return s};const prog=gl.createProgram()!;gl.attachShader(prog,shader(gl.VERTEX_SHADER,vs));gl.attachShader(prog,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(prog);gl.useProgram(prog);
 const rows=44,verts:number[]=[],idx:number[]=[];for(let y=0;y<=rows;y++){const yy=1-y/rows*2;verts.push(-1,yy,1,yy)}for(let y=0;y<rows;y++){const i=y*2;idx.push(i,i+1,i+2,i+1,i+3,i+2)}
 const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verts),gl.STATIC_DRAW);const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(idx),gl.STATIC_DRAW);const loc=gl.getAttribLocation(prog,"a");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);const ploc=gl.getUniformLocation(prog,"p");
 let raf=0;const resize=()=>{const d=Math.min(devicePixelRatio,1.5),w=Math.max(1,c.clientWidth*d),h=Math.max(1,c.clientHeight*d);if(c.width!==w||c.height!==h){c.width=w;c.height=h}gl.viewport(0,0,c.width,c.height)};const draw=()=>{resize();gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.uniform1f(ploc,progress.current);gl.drawElements(gl.TRIANGLES,idx.length,gl.UNSIGNED_SHORT,0);raf=requestAnimationFrame(draw)};draw();return()=>cancelAnimationFrame(raf)
 },[progress]);return <canvas ref={canvas} className="flap-webgl" aria-hidden="true"/>;
}
