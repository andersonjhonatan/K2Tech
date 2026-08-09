(() => {
  const STORAGE_KEY = "k2tech-invitation-opened";
  const OPEN_THRESHOLD = 150;
  const root = document.querySelector("[data-k2-invitation-intro]");
  if (!root || document.documentElement.dataset.k2Intro === "skip") return;

  const stage = root.querySelector(".envelope-stage");
  const envelope = root.querySelector(".envelope");
  const seal = root.querySelector(".wax-seal");
  const skip = root.querySelector(".intro-skip");
  const instruction = root.querySelector("#invitation-intro-instruction");
  const instructionStrong = instruction?.querySelector("strong");
  const instructionSmall = instruction?.querySelector("small");
  if (!stage || !envelope || !seal || !skip) return;

  let drag = 0;
  let progress = 0;
  let startY = 0;
  let dragging = false;
  let opening = false;
  let webglRequested = false;
  let webglCleanup = null;
  const timers = [];
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const previousOverflow = document.body.style.overflow;

  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => seal.focus());

  const persistOpened = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  const updateInstruction = () => {
    if (!instructionStrong || !instructionSmall) return;
    if (progress > 0.15) {
      instructionStrong.textContent = "CONTINUE PUXANDO";
      instructionSmall.textContent = `${Math.round(progress * 100)}% · a folha está curvando`;
    } else {
      instructionStrong.textContent = "ARRASTE PARA ROMPER O LACRE";
      instructionSmall.textContent = "Arraste para cima ou pressione Enter";
    }
  };

  const sync = (value) => {
    drag = value;
    progress = Math.min(value / OPEN_THRESHOLD, 1);
    stage.style.setProperty("--seal-progress", String(progress));
    stage.style.setProperty("--paper-rise", `${Math.round(progress * 10)}px`);
    seal.style.transform = `translate(-50%,calc(-50% - ${drag}px))`;
    updateInstruction();
  };

  const cleanup = () => {
    timers.splice(0).forEach((timer) => window.clearTimeout(timer));
    if (webglCleanup) {
      webglCleanup();
      webglCleanup = null;
    }
  };

  const hide = () => {
    cleanup();
    document.body.style.overflow = previousOverflow;
    document.documentElement.dataset.k2Intro = "skip";
    root.style.display = "none";
    if (previousFocus?.isConnected) previousFocus.focus();
  };

  const mountWebgl = () => {
    if (!root.isConnected || !window.K2EnvelopeWebGL?.mount) return;
    webglCleanup = window.K2EnvelopeWebGL.mount(envelope, () => progress);
  };

  const prepareCurl = () => {
    if (webglRequested) return;
    webglRequested = true;

    if (window.K2EnvelopeWebGL?.mount) {
      mountWebgl();
      return;
    }

    const script = document.createElement("script");
    script.src = "/js/envelope-webgl.js";
    script.async = true;
    script.addEventListener("load", mountWebgl, { once: true });
    script.addEventListener("error", () => { webglRequested = false; }, { once: true });
    document.head.appendChild(script);
  };

  const finish = () => {
    if (opening) return;
    opening = true;
    dragging = false;
    sync(OPEN_THRESHOLD);
    root.classList.add("is-opening");
    persistOpened();
    navigator.vibrate?.(25);
    timers.push(window.setTimeout(() => root.classList.add("letter-open"), 1050));
    timers.push(window.setTimeout(hide, 3500));
  };

  const skipIntro = () => {
    persistOpened();
    hide();
  };

  seal.addEventListener("pointerenter", prepareCurl, { passive: true });
  seal.addEventListener("pointerdown", (event) => {
    if (opening) return;
    prepareCurl();
    dragging = true;
    startY = event.clientY;
    seal.setPointerCapture(event.pointerId);
  });
  seal.addEventListener("pointermove", (event) => {
    if (!dragging || opening) return;
    const next = Math.min(Math.max(0, startY - event.clientY), OPEN_THRESHOLD);
    sync(next);
    if (next >= OPEN_THRESHOLD * 0.98) finish();
  });

  const release = () => {
    if (!dragging || opening) return;
    dragging = false;
    if (drag >= OPEN_THRESHOLD * 0.72) finish();
    else sync(0);
  };
  seal.addEventListener("pointerup", release);
  seal.addEventListener("pointercancel", release);
  seal.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      prepareCurl();
      finish();
    }
  });

  skip.addEventListener("click", skipIntro);
  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      skipIntro();
      return;
    }
    if (event.key !== "Tab") return;

    if (event.shiftKey && document.activeElement === skip) {
      event.preventDefault();
      seal.focus();
    } else if (!event.shiftKey && document.activeElement === seal) {
      event.preventDefault();
      skip.focus();
    }
  });

  window.addEventListener("pagehide", cleanup, { once: true });
  sync(0);
})();
