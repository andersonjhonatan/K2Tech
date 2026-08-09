(() => {
  const targets = [document.getElementById("avaliacoes"), document.getElementById("contato")].filter(Boolean);
  if (!targets.length) return;

  let loaded = false;
  let observer;

  const load = () => {
    if (loaded) return;
    loaded = true;
    observer?.disconnect();
    document.removeEventListener("pointerdown", onIntent, true);
    document.removeEventListener("keydown", onIntent, true);

    const script = document.createElement("script");
    script.src = "/js/home-interactions-runtime.js";
    script.defer = true;
    document.head.appendChild(script);
  };

  const onIntent = (event) => {
    const element = event.target instanceof Element ? event.target : null;
    if (element?.closest("#avaliacoes, #contato")) load();
  };

  document.addEventListener("pointerdown", onIntent, true);
  document.addEventListener("keydown", onIntent, true);

  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) load();
      },
      { rootMargin: "700px 0px" },
    );
    targets.forEach((target) => observer.observe(target));
  } else {
    window.setTimeout(load, 4000);
  }
})();
