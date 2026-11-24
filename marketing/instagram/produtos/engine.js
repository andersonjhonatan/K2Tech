// CFG = {bpm, scenes:[beats...], stagger:beats, extra:function(t,beat,pulse)}
(function(){
const C = window.CFG, BEAT = 60 / C.bpm * (C.unit || 1); // unit 2 = cenas contadas em pares de batidas (músicas rápidas)
let acc = 0; const SC = C.scenes.map(n => { const r = [acc, acc + n]; acc += n; return r; });
const TOTAL = acc * BEAT;
const ease = x => x<=0?0:x>=1?1:1-Math.pow(1-x,3);
const back = x => { if(x<=0) return 0; if(x>=1) return 1; const c=1.70158; return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2); };
function render(t){
  const beat = t / BEAT, bf = beat - Math.floor(beat), pulse = Math.exp(-bf*6);
  const strong = (Math.floor(beat) % 4 === 0) ? 1 : .45;
  const g = document.getElementById('glow');
  if (g) { g.style.opacity = (0.75 + 0.25*pulse*strong).toFixed(3); g.style.transform = `scale(${1+0.03*pulse*strong})`; }
  SC.forEach(([a,b],i)=>{
    const el = document.getElementById('s'+i); if(!el) return;
    const local = beat - a, last = i === SC.length-1;
    if(!(beat >= a && (beat < b || last))){ el.style.opacity = 0; return; }
    const out = last ? 0 : ease((beat - (b - .5)) / .5);
    el.style.opacity = (1-out).toFixed(3);
    el.style.transform = `translateY(${-80*out}px)`;
    const st = el.dataset.stagger ? +el.dataset.stagger : (C.stagger||1);
    el.querySelectorAll('[data-in]').forEach((c,k)=>{
      const s0 = c.dataset.at !== undefined ? +c.dataset.at : k*st;
      const p = back((local - s0) / .6), pe = ease((local - s0) / .6);
      c.style.opacity = pe.toFixed(3);
      c.style.transform = `translateY(${(1-p)*70}px) scale(${0.96+0.04*p})` + (c.dataset.rot ? ` rotate(${c.dataset.rot}deg)` : '');
    });
    el.querySelectorAll('[data-pulse]').forEach(n => n.style.scale = (1 + (+n.dataset.pulse||0.06)*pulse).toFixed(3));
  });
  if (C.extra) C.extra(t, beat, pulse, SC);
}
window.render = render; window.TOTAL = TOTAL; window.SC = SC;
render(0);
})();
