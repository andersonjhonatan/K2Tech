/* KLOJA filmes: utilidades e personagens ilustrados (base do filme do KFit) */
const cl=x=>x<0?0:x>1?1:x, ease=x=>1-Math.pow(1-cl(x),3), eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2}, back=x=>{x=cl(x);const c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const $=id=>document.getElementById(id);
/* ---------- personagem ilustrado ---------- */
function person(o){
 const {skin='#C98B62',hair='#2B1D16',style='short',shirt='#FF7A45',pants='#2E3A4A',shoe='#1E2A38',beard=false,id}=o;
 const hairSVG = style==='ponytail'
  ? `<path d="M-62 -15 Q -62 -92 0 -94 Q 62 -92 64 -15 Q 40 -52 0 -54 Q -40 -52 -62 -15Z" fill="${hair}"/><path d="M50 -60 Q 112 -50 100 30 Q 94 62 72 72 Q 90 10 54 -30Z" fill="${hair}"/>`
  : style==='long' ? `<path d="M-66 -10 Q -70 -96 0 -98 Q 70 -96 66 -10 Q 50 -60 0 -60 Q -50 -60 -66 -10Z" fill="${hair}"/><path d="M-66 -20 Q -86 60 -70 120 L -44 110 Q -54 40 -52 -10Z" fill="${hair}"/><path d="M66 -20 Q 86 60 70 120 L 44 110 Q 54 40 52 -10Z" fill="${hair}"/>`
  : style==='bun' ? `<circle cx="0" cy="-98" r="30" fill="${hair}"/><path d="M-64 -12 Q -66 -94 0 -96 Q 66 -94 64 -12 Q 46 -56 0 -58 Q -46 -56 -64 -12Z" fill="${hair}"/>`
  : style==='grey' ? `<path d="M-64 -10 Q -62 -84 0 -86 Q 62 -84 64 -10 Q 50 -44 0 -48 Q -50 -44 -64 -10Z" fill="#B9BEC6"/>`
  : `<path d="M-64 -12 Q -68 -92 0 -96 Q 68 -92 64 -12 Q 56 -54 20 -58 Q -10 -48 -40 -56 Q -60 -48 -64 -12Z" fill="${hair}"/>`;
 return `<g id="${id}">
  <ellipse cx="0" cy="8" rx="120" ry="18" fill="rgba(0,0,0,.15)"/>
  <g class="legL"><rect x="-44" y="-170" width="40" height="170" rx="18" fill="${pants}"/><rect x="-56" y="-14" width="58" height="22" rx="10" fill="${shoe}"/></g>
  <g class="legR"><rect x="4" y="-170" width="40" height="170" rx="18" fill="${pants}"/><rect x="2" y="-14" width="58" height="22" rx="10" fill="${shoe}"/></g>
  <g class="body"><path d="M-74 -330 Q -80 -160 -56 -150 L 56 -150 Q 80 -160 74 -330 Q 40 -352 0 -352 Q -40 -352 -74 -330Z" fill="${shirt}"/>
   <rect x="-16" y="-372" width="32" height="30" rx="10" fill="${skin}"/>
   <g class="armL" transform="translate(-66 -320)"><rect x="-18" y="0" width="34" height="150" rx="17" fill="${shirt}"/><circle cx="-1" cy="150" r="20" fill="${skin}"/></g>
   <g class="armR" transform="translate(66 -320)"><rect x="-16" y="0" width="34" height="150" rx="17" fill="${shirt}"/><circle cx="1" cy="150" r="20" fill="${skin}"/><g class="prop"></g></g>
   <g class="head" transform="translate(0 -440)"><circle cx="0" cy="0" r="66" fill="${skin}"/>${hairSVG}
    <g class="eyes"><ellipse cx="-22" cy="-4" rx="6" ry="8" fill="#1E2A38"/><ellipse cx="22" cy="-4" rx="6" ry="8" fill="#1E2A38"/></g>
    <path class="mouth" d="M-18 26 Q 0 40 18 26" stroke="#7A3B2E" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${beard?`<path d="M-50 10 Q -46 62 0 66 Q 46 62 50 10 Q 30 40 0 42 Q -30 40 -50 10Z" fill="${hair}" opacity=".85"/>`:''}
    <circle cx="-34" cy="16" r="9" fill="#FF8A80" opacity=".35"/><circle cx="34" cy="16" r="9" fill="#FF8A80" opacity=".35"/></g>
  </g></g>`;
}

function pose(id,{aL=0,aR=0,head=0,lean=0,blink=false,smile=1,talk=0}){
 const r=document.getElementById(id); if(!r) return;
 r.querySelector('.armL').setAttribute('transform',`translate(-66 -320) rotate(${aL})`);
 r.querySelector('.armR').setAttribute('transform',`translate(66 -320) rotate(${aR})`);
 r.querySelector('.head').setAttribute('transform',`translate(0 -440) rotate(${head})`);
 r.querySelector('.body').setAttribute('transform',`rotate(${lean})`);
 r.querySelector('.eyes').setAttribute('transform',blink?'translate(0 -4) scale(1 .15)':'');
 const m=r.querySelector('.mouth');
 if(talk>0){ const o=6+talk*14; m.setAttribute('d',`M-16 26 Q 0 ${26+o} 16 26 Q 0 ${30+o*.3} -16 26`); m.setAttribute('fill','#7A3B2E'); }
 else { m.setAttribute('fill','none'); m.setAttribute('d', smile>0? `M-18 26 Q 0 ${26+14*smile} 18 26` : `M-16 34 Q 0 ${34+14*smile} 16 34`); }
}
const blinkAt=(t,o=0)=>(((t+o)*1.3)%3.1)<0.12;
const TAG=(s=120,id='tg')=>`<svg width="${s}" height="${s}" viewBox="0 0 64 64"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1DDAE"/><stop offset=".5" stop-color="#C8A96A"/><stop offset="1" stop-color="#8C6F3A"/></linearGradient></defs><path d="M6 14a8 8 0 0 1 8-8h24.7a8 8 0 0 1 5.66 2.34l13.3 13.3a8 8 0 0 1 0 11.32L36.4 54.2a8 8 0 0 1-11.32 0L8.34 37.46A8 8 0 0 1 6 31.8Z" fill="url(#${id})"/><circle cx="17.5" cy="17.5" r="4.2" fill="#0B0B0C"/><path d="M26 24v20M26 34.5 37 24M29.6 31.3 38 44" stroke="#0B0B0C" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="47" cy="47" r="6.5" fill="#2563EB"/></svg>`;
function place(gid,html,x,y,s){ const g=document.getElementById(gid); if(html!==null) g.innerHTML=html; g.setAttribute('transform',`translate(${x} ${y}) scale(${s})`); return g; }
/* cenas: SCN=[[id,inicio],...,['END',fim]] ; fade entre cenas */
function scenes(t,SCN,fadeIn=.4,fadeOut=.35){
 let si=0; for(let i=0;i<SCN.length-1;i++) if(t>=SCN[i][1]) si=i;
 const [sid,st]=SCN[si], nx=SCN[si+1][1];
 SCN.slice(0,-1).forEach(([id],i)=>{ const e=document.getElementById(id); if(!e) return; if(i!==si){e.style.opacity=0;return;} const fi=cl((t-st)/fadeIn), fo=cl((nx-t)/fadeOut); e.style.opacity=Math.min(fi, i===SCN.length-2?1:fo); });
 return {sid,ln:t-st,dur:nx-st};
}
