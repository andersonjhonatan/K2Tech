"use client";

import { useEffect, useRef } from "react";

/**
 * Cena 3D do topo: etiquetas de preço (a marca do KLOJA) flutuando em ouro, preto laqueado
 * e um toque de azul TresK. A etiqueta grande do meio tem o K em relevo.
 * Pausa quando sai da tela, respeita "reduzir movimento" e some sem erro se não houver WebGL.
 */
export default function Hero3D({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        el.dataset.fallback = "1";
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const seen = document.documentElement.classList.contains("kl-seen");
      const startDelay = reduce || seen ? 0 : 2.5; // espera a porta da loja subir

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 12);

      // forma da etiqueta (mesmo desenho do logo), centralizada
      const tag = new THREE.Shape();
      const S = 1 / 26;
      const P = (x: number, y: number) => [(x - 32) * S, (32 - y) * S] as const;
      tag.moveTo(...P(14, 6));
      tag.lineTo(...P(38.7, 6));
      tag.quadraticCurveTo(...P(42, 6), ...P(44.4, 8.3));
      tag.lineTo(...P(57.6, 21.6));
      tag.quadraticCurveTo(...P(60.5, 27.3), ...P(57.6, 33));
      tag.lineTo(...P(36.4, 54.2));
      tag.quadraticCurveTo(...P(30.7, 59.6), ...P(25.1, 54.2));
      tag.lineTo(...P(8.3, 37.5));
      tag.quadraticCurveTo(...P(6, 35), ...P(6, 31.8));
      tag.lineTo(...P(6, 14));
      tag.quadraticCurveTo(...P(6, 6), ...P(14, 6));
      const hole = new THREE.Path();
      const [hx, hy] = P(17.5, 17.5);
      hole.absarc(hx, hy, 4.2 * S, 0, Math.PI * 2, true);
      tag.holes.push(hole);
      const tagGeo = new THREE.ExtrudeGeometry(tag, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.045, bevelSegments: 4, curveSegments: 24 });
      tagGeo.center();

      const gold = new THREE.MeshPhysicalMaterial({ color: 0xc8a96a, metalness: 1, roughness: 0.24, clearcoat: 0.6, clearcoatRoughness: 0.2 });
      const black = new THREE.MeshPhysicalMaterial({ color: 0x121214, metalness: 0.4, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.08 });
      const blue = new THREE.MeshPhysicalMaterial({ color: 0x2563eb, metalness: 0.5, roughness: 0.22, clearcoat: 1, emissive: 0x0b2a7a, emissiveIntensity: 0.35 });

      // K em relevo para a etiqueta principal
      const kGroup = new THREE.Group();
      const bar = (w: number, h: number, x: number, y: number, r: number) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.09, 1, 1, 1), black);
        m.position.set(x, y, 0);
        m.rotation.z = r;
        kGroup.add(m);
      };
      bar(0.2, 0.78, -0.2, -0.08, 0);
      bar(0.2, 0.52, 0.06, 0.1, -0.78);
      bar(0.2, 0.46, 0.06, -0.27, 0.72);
      kGroup.position.set(0.08, -0.05, 0.13);

      const items: { m: import("three").Object3D; base: import("three").Vector3; spin: number; bob: number; phase: number; delay: number }[] = [];
      const hero = new THREE.Group();
      const main = new THREE.Mesh(tagGeo, gold);
      hero.add(main, kGroup);
      const kBack = kGroup.clone();
      kBack.position.z = -0.13;
      kBack.rotation.y = Math.PI;
      hero.add(kBack);
      hero.scale.setScalar(1.7);
      scene.add(hero);
      items.push({ m: hero, base: new THREE.Vector3(3, 0.1, 0), spin: 0.32, bob: 0.18, phase: 0, delay: 0 });

      const layout: [number, number, number, number, import("three").Material][] = [
        [5.6, 2.4, -3, 0.8, gold], [4.9, -2.5, -2, 0.7, black], [1.4, 2.9, -5, 0.7, blue],
        [7.2, -0.4, -5, 0.8, black], [1.0, -3.1, -4, 0.6, gold], [-6.2, 2.8, -9, 0.7, gold],
        [-6.8, -3.0, -10, 0.8, black], [2.6, -1.6, -7, 0.55, gold], [8.2, 3.2, -8, 0.7, gold],
      ];
      layout.forEach(([x, y, z, s, mat], i) => {
        const m = new THREE.Mesh(tagGeo, mat);
        m.scale.setScalar(s);
        m.rotation.set(Math.random() * 0.6, Math.random() * Math.PI, Math.random() * 0.8);
        scene.add(m);
        items.push({ m, base: new THREE.Vector3(x, y, z), spin: 0.15 + Math.random() * 0.35, bob: 0.12 + Math.random() * 0.18, phase: i * 1.7, delay: 0.08 * (i + 1) });
      });

      const key = new THREE.DirectionalLight(0xfff1d6, 2.2);
      key.position.set(4, 6, 6);
      const rim = new THREE.DirectionalLight(0x3b82f6, 1.4);
      rim.position.set(-6, -2, -4);
      scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.15));

      const resize = () => {
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // no celular, a cena recua e a etiqueta principal vai para o centro
        const narrow = w < 700;
        camera.position.z = narrow ? 16 : 12;
        items[0].base.x = narrow ? 1.2 : 3;
        items[0].base.y = narrow ? -1.4 : 0.1;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
      io.observe(el);

      const clock = new THREE.Clock();
      const ease = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 4);
      let raf = 0;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const t = clock.getElapsedTime();
        const tt = reduce ? 99 : t - startDelay;
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        items.forEach((it, i) => {
          const k = ease((tt - it.delay) / 1.6);
          const fly = (1 - k) * (i === 0 ? 14 : 22);
          it.m.position.set(it.base.x, it.base.y + (reduce ? 0 : Math.sin(t * 0.8 + it.phase) * it.bob), it.base.z - fly);
          if (i === 0) {
            it.m.rotation.y = (reduce ? 0.5 : t * it.spin) + (1 - k) * 3 + mouse.x * 0.35;
            it.m.rotation.x = -0.12 + mouse.y * 0.2;
          } else if (!reduce) {
            it.m.rotation.y += 0.004 * it.spin * 3;
            it.m.rotation.x += 0.002 * it.spin;
          }
        });
        camera.position.x = mouse.x * 0.6;
        camera.position.y = -mouse.y * 0.4;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      tick();
      el.dataset.ready = "1";

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        ro.disconnect();
        io.disconnect();
        tagGeo.dispose();
        [gold, black, blue].forEach((m) => m.dispose());
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={host} className={className} aria-hidden="true" />;
}
