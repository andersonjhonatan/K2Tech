"use client";

import { CSSProperties, MutableRefObject, useEffect, useRef } from "react";

type Props = { progress: MutableRefObject<number> };

const sharedSurface: CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "62%",
  display: "block",
  pointerEvents: "none",
};

const fallbackStyle: CSSProperties = {
  ...sharedSurface,
  zIndex: 5,
  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
  background: "linear-gradient(180deg,#17243a 0%,#0b1422 100%)",
  filter: "drop-shadow(0 7px 9px rgba(0,0,0,.48))",
};

const canvasStyle: CSSProperties = {
  ...sharedSurface,
  zIndex: 6,
  filter: "drop-shadow(0 7px 9px rgba(0,0,0,.48))",
};

const vertexShader = `attribute vec2 a;uniform float p;varying float light;varying float backMix;varying float curlShade;void main(){float row=(1.0-a.y)*.5;float halfW=1.0-row;float x=a.x*halfW;float travel=smoothstep(0.0,1.0,p);float fold=1.0-travel;float d=max(0.0,row-fold);float active=smoothstep(0.0,.085,d);float radius=.17+.035*sin(travel*3.14159);float ang=min(3.14,d*(6.8+4.2*travel));float yy=a.y;float z=0.0;if(active>0.0){float base=1.0-2.0*fold;yy=base-2.0*radius*sin(ang);z=radius*(1.0-cos(ang))*2.75;}float hingeLock=1.0-smoothstep(0.0,.085,row);z*=1.0-hingeLock;float persp=1.0/(1.0+max(z,0.0)*.20);gl_Position=vec4(x*persp,yy*persp,z*.12,1.0);float crest=pow(max(0.0,sin(ang)),3.0);light=.55+.34*cos(ang)+crest*.16;backMix=smoothstep(1.8,2.9,ang);curlShade=crest*active;}`;
const fragmentShader = `precision mediump float;varying float light;varying float backMix;varying float curlShade;void main(){vec3 dark=vec3(.030,.057,.102);vec3 lit=vec3(.135,.195,.305);vec3 back=vec3(.19,.23,.31);vec3 front=mix(dark,lit,clamp(light,0.0,1.0));vec3 col=mix(front,back,backMix*.30);col*=1.0-curlShade*.22;gl_FragColor=vec4(col,1.0);}`;

export function WebGLEnvelopeFlap({ progress }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;

    const gl = element.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    function compile(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.useProgram(program);

    const rows = 72;
    const vertices: number[] = [];
    const indices: number[] = [];
    for (let y = 0; y <= rows; y++) {
      const yy = 1 - (y / rows) * 2;
      vertices.push(-1, yy, 1, yy);
    }
    for (let y = 0; y < rows; y++) {
      const index = y * 2;
      indices.push(index, index + 1, index + 2, index + 1, index + 3, index + 2);
    }

    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    if (!vertexBuffer || !indexBuffer) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    const attribute = gl.getAttribLocation(program, "a");
    if (attribute < 0) {
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
    const progressLocation = gl.getUniformLocation(program, "p");

    let frame = 0;
    let contextLost = false;
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frame);
    };
    element.addEventListener("webglcontextlost", onContextLost);

    const draw = () => {
      if (contextLost) return;
      const ratio = Math.min(devicePixelRatio, 1.5);
      const width = Math.max(1, Math.round(element.clientWidth * ratio));
      const height = Math.max(1, Math.round(element.clientHeight * ratio));
      if (element.width !== width || element.height !== height) {
        element.width = width;
        element.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.uniform1f(progressLocation, progress.current);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [progress]);

  return (
    <>
      <div style={fallbackStyle} aria-hidden="true" />
      <canvas ref={canvas} style={canvasStyle} aria-hidden="true" />
    </>
  );
}
