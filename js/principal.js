import { consultarPerfil } from "./api.js";

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

const listaEquipe = document.querySelector("#lista-equipe");
const estadoEquipe = document.querySelector("#estado-equipe");
const mensagemEquipe = document.querySelector("#mensagem-equipe");
const botaoTentarNovamente = document.querySelector("#tentar-novamente");
let carregando = false;

function atualizarIntegrante(cartao, perfil) {
  if (perfil.nome) cartao.querySelector(".nome-integrante").textContent = perfil.nome;
  cartao.href = perfil.endereco;
  if (perfil.avatar) {
    const imagem = document.createElement("img");
    imagem.width = 44;
    imagem.height = 44;
    imagem.alt = "";
    imagem.addEventListener("load", () => { cartao.querySelector(".iniciais-integrante").hidden = true; }, { once: true });
    imagem.addEventListener("error", () => imagem.remove(), { once: true });
    imagem.src = perfil.avatar;
    cartao.querySelector(".avatar-integrante").append(imagem);
  }
  cartao.dataset.carregado = "true";
}

async function carregarEquipe() {
  if (carregando) return;
  carregando = true;
  listaEquipe.setAttribute("aria-busy", "true");
  estadoEquipe.hidden = false;
  estadoEquipe.dataset.estado = "carregando";
  mensagemEquipe.textContent = "Carregando perfis da equipe…";
  botaoTentarNovamente.hidden = true;
  botaoTentarNovamente.disabled = true;
  try {
    // Em uma nova tentativa, consultar somente os perfis que ainda falharam.
    const pendentes = [...listaEquipe.querySelectorAll("[data-usuario]:not([data-carregado])")];
    const resultados = await Promise.allSettled(pendentes.map(async (cartao) => {
      atualizarIntegrante(cartao, await consultarPerfil(cartao.dataset.usuario));
    }));
    if (resultados.some((resultado) => resultado.status === "rejected")) {
      estadoEquipe.dataset.estado = "erro";
      mensagemEquipe.textContent = "Alguns perfis não puderam ser atualizados. Os nomes e links da equipe continuam disponíveis. Tente novamente mais tarde.";
      botaoTentarNovamente.hidden = false;
    } else {
      estadoEquipe.dataset.estado = "sucesso";
      mensagemEquipe.textContent = "Perfis atualizados pelo GitHub.";
    }
  } catch {
    estadoEquipe.dataset.estado = "erro";
    mensagemEquipe.textContent = "Não foi possível atualizar os perfis. Os links da equipe continuam disponíveis.";
    botaoTentarNovamente.hidden = false;
  } finally {
    carregando = false;
    listaEquipe.setAttribute("aria-busy", "false");
    botaoTentarNovamente.disabled = false;
  }
}

botaoTentarNovamente.addEventListener("click", carregarEquipe);
// Carregar os créditos quando o visitante chegar ao rodapé: até quatro consultas por visita.
if ("IntersectionObserver" in window) {
  const observadorEquipe = new IntersectionObserver((entradas) => {
    if (!entradas.some((entrada) => entrada.isIntersecting)) return;
    observadorEquipe.disconnect();
    carregarEquipe();
  }, { rootMargin: "200px" });
  observadorEquipe.observe(listaEquipe);
} else {
  carregarEquipe();
}
