document.documentElement.classList.add("js");

function iniciarMenu() {
  const botao = document.querySelector(".botao-menu");
  const navegacao = document.querySelector("#navegacao");
  const telaPequena = window.matchMedia("(max-width: 52rem)");
  let aberto = false;

  function atualizarMenu(abrir) {
    aberto = abrir && telaPequena.matches;
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    botao.querySelector("use").setAttribute("href", `img/icones.svg#${aberto ? "fechar" : "menu"}`);
    navegacao.classList.toggle("aberta", aberto);
    navegacao.inert = telaPequena.matches && !aberto;
    if (telaPequena.matches) {
      navegacao.setAttribute("aria-hidden", String(!aberto));
    } else {
      navegacao.removeAttribute("aria-hidden");
    }
  }

  botao.hidden = false;
  botao.addEventListener("click", () => atualizarMenu(!aberto));
  telaPequena.addEventListener("change", () => atualizarMenu(false));
  navegacao.addEventListener("click", (evento) => {
    const link = evento.target.closest("a");
    if (!link || !telaPequena.matches) return;
    atualizarMenu(false);
    const destino = link.hash && document.getElementById(link.hash.slice(1));
    if (destino) {
      destino.tabIndex = -1;
      destino.focus({ preventScroll: true });
    }
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && aberto) {
      atualizarMenu(false);
      botao.focus();
    }
  });
  document.addEventListener("click", (evento) => {
    if (aberto && !navegacao.contains(evento.target) && !botao.contains(evento.target)) {
      atualizarMenu(false);
    }
  });
  atualizarMenu(false);
}

function iniciarDemonstracao() {
  const lista = document.querySelector(".abas");
  const abas = [...lista.querySelectorAll('[role="tab"]')];

  function selecionarAba(indice, moverFoco = false) {
    abas.forEach((aba, posicao) => {
      const selecionada = posicao === indice;
      aba.setAttribute("aria-selected", String(selecionada));
      aba.tabIndex = selecionada ? 0 : -1;
      document.getElementById(aba.getAttribute("aria-controls")).hidden = !selecionada;
    });
    if (moverFoco) abas[indice].focus();
  }

  abas.forEach((aba, indice) => {
    aba.addEventListener("click", () => selecionarAba(indice));
    aba.addEventListener("keydown", (evento) => {
      let proxima;
      if (evento.key === "ArrowRight") proxima = (indice + 1) % abas.length;
      if (evento.key === "ArrowLeft") proxima = (indice - 1 + abas.length) % abas.length;
      if (evento.key === "Home") proxima = 0;
      if (evento.key === "End") proxima = abas.length - 1;
      if (proxima === undefined) return;
      evento.preventDefault();
      selecionarAba(proxima, true);
    });
  });
  selecionarAba(0);
  lista.hidden = false;
}

function iniciarAmpliacao() {
  const dialogo = document.querySelector("#dialogo-captura");
  if (typeof dialogo.showModal !== "function") return;

  const imagemAmpliada = document.querySelector("#imagem-ampliada");
  document.querySelectorAll("[data-ampliar]").forEach((link) => {
    link.addEventListener("click", (evento) => {
      // Preservar a opção de abrir o arquivo em outra aba com o modificador.
      if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
      evento.preventDefault();
      const imagem = link.querySelector("img");
      imagemAmpliada.src = link.href;
      imagemAmpliada.alt = imagem.alt;
      dialogo.showModal();
    });
  });
  document.querySelector("#fechar-captura").addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });
}

function iniciarRevelacoes() {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.remove("revelacao-pendente");
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll("[data-revelar]").forEach((elemento) => {
    elemento.classList.add("revelacao-pendente");
    observador.observe(elemento);
  });
}

iniciarMenu();
iniciarDemonstracao();
iniciarAmpliacao();
iniciarRevelacoes();
