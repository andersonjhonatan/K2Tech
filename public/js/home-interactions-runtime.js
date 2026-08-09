(() => {
  const openWhatsapp = (form, message) => {
    const number = form.dataset.whatsapp;
    if (!number) return;

    const status = form.querySelector("[data-form-status]");
    if (status) status.hidden = false;

    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    const tab = window.open(url, "_blank", "noopener,noreferrer");
    if (!tab) window.location.href = url;
  };

  document.querySelectorAll("form[data-k2-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);

      if (form.dataset.k2Form === "review") {
        const name = data.get("reviewer")?.toString() || "Não informado";
        const project = data.get("review-project")?.toString() || "Não informado";
        const review = data.get("review")?.toString() || "";
        openWhatsapp(
          form,
          `Nova avaliação recebida pelo site da K2 Tech.\n\nCliente: ${name}\nProjeto: ${project}\n\nAvaliação:\n${review}`,
        );
        return;
      }

      const name = data.get("name")?.toString() || "Não informado";
      const company = data.get("company")?.toString() || "Não informada";
      const message = data.get("message")?.toString() || "";
      openWhatsapp(
        form,
        `Olá, vim pelo site da K2 Tech.\n\nNome: ${name}\nEmpresa ou marca: ${company}\n\nSobre o projeto:\n${message}`,
      );
    });
  });

  const carousel = document.querySelector("[data-testimonial-carousel]");
  if (!carousel) return;

  const pages = Array.from(carousel.querySelectorAll("[data-review-page]"));
  const previous = carousel.querySelector("[data-review-prev]");
  const next = carousel.querySelector("[data-review-next]");
  const toggle = carousel.querySelector("[data-review-toggle]");
  const indicator = carousel.querySelector("[data-review-indicator]");
  const indicatorCurrent = indicator?.querySelector("b");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let page = 0;
  let paused = reducedMotion;
  let timer = 0;

  const render = () => {
    pages.forEach((item, index) => {
      item.hidden = index !== page;
    });
    if (indicatorCurrent) indicatorCurrent.textContent = String(page + 1).padStart(2, "0");
    if (indicator) indicator.setAttribute("aria-label", `Página ${page + 1} de ${pages.length}`);
  };

  const renderToggle = () => {
    if (!toggle) return;
    toggle.textContent = paused ? "▶" : "Ⅱ";
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute(
      "aria-label",
      paused ? "Retomar rotação automática das experiências" : "Pausar rotação automática das experiências",
    );
    toggle.setAttribute("title", paused ? "Retomar" : "Pausar");
  };

  const restart = () => {
    if (timer) window.clearInterval(timer);
    timer = 0;
    if (!paused && !reducedMotion && pages.length > 1) {
      timer = window.setInterval(() => {
        page = (page + 1) % pages.length;
        render();
      }, 9000);
    }
  };

  const pause = () => {
    paused = true;
    renderToggle();
    restart();
  };

  previous?.addEventListener("click", () => {
    paused = true;
    page = (page - 1 + pages.length) % pages.length;
    render();
    renderToggle();
    restart();
  });

  next?.addEventListener("click", () => {
    paused = true;
    page = (page + 1) % pages.length;
    render();
    renderToggle();
    restart();
  });

  toggle?.addEventListener("click", () => {
    paused = !paused;
    renderToggle();
    restart();
  });

  carousel.addEventListener("mouseenter", pause, { once: true });
  carousel.addEventListener("focusin", pause, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && timer) window.clearInterval(timer);
    else restart();
  });

  render();
  renderToggle();
  restart();
})();
