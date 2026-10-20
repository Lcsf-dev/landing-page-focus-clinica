import { consultarFuncionalidades } from "./api.js";

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

const listaFuncionalidades = document.querySelector("#lista-funcionalidades");
const estadoFuncionalidades = document.querySelector("#estado-funcionalidades");
const mensagemFuncionalidades = document.querySelector("#mensagem-funcionalidades");
const botaoTentarNovamente = document.querySelector("#tentar-novamente");
const iconesPorRecurso = { calendario: "calendario", agendamentos: "relogio", notificacoes: "sino", especialidades: "camadas" };
let carregando = false;

function criarCartaoRecurso(recurso, indice) {
  const cartao = document.createElement("article");
  cartao.className = "cartao-recurso";
  cartao.dataset.recurso = recurso.id;
  const numero = document.createElement("span");
  numero.className = "numero-recurso";
  numero.textContent = String(indice + 1).padStart(2, "0");
  numero.setAttribute("aria-hidden", "true");
  const suporteIcone = document.createElement("span");
  suporteIcone.className = "cartao-recurso__icone";
  const icone = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icone.classList.add("icone");
  icone.setAttribute("aria-hidden", "true");
  const uso = document.createElementNS("http://www.w3.org/2000/svg", "use");
  const nomeIcone = Object.hasOwn(iconesPorRecurso, recurso.id) ? iconesPorRecurso[recurso.id] : "camadas";
  uso.setAttribute("href", `img/icones.svg#${nomeIcone}`);
  icone.append(uso);
  suporteIcone.append(icone);
  const titulo = document.createElement("h3");
  titulo.textContent = recurso.titulo;
  const descricao = document.createElement("p");
  descricao.textContent = recurso.descricao;
  cartao.append(numero, suporteIcone, titulo, descricao);
  return cartao;
}

async function carregarFuncionalidades() {
  if (carregando) return;
  carregando = true;
  listaFuncionalidades.setAttribute("aria-busy", "true");
  estadoFuncionalidades.hidden = false;
  estadoFuncionalidades.dataset.estado = "carregando";
  mensagemFuncionalidades.textContent = "Carregando funcionalidades…";
  botaoTentarNovamente.hidden = true;
  botaoTentarNovamente.disabled = true;
  try {
    const endereco = new URL("api/funcionalidades", document.baseURI);
    const recursos = await consultarFuncionalidades(endereco);
    listaFuncionalidades.replaceChildren(...recursos.map(criarCartaoRecurso));
    if (recursos.length === 0) {
      estadoFuncionalidades.dataset.estado = "vazio";
      mensagemFuncionalidades.textContent = "Nenhuma funcionalidade disponível no momento.";
      botaoTentarNovamente.hidden = false;
    } else {
      estadoFuncionalidades.hidden = true;
    }
  } catch {
    listaFuncionalidades.replaceChildren();
    estadoFuncionalidades.dataset.estado = "erro";
    mensagemFuncionalidades.textContent = "Não foi possível carregar as funcionalidades. Verifique sua conexão e tente novamente.";
    botaoTentarNovamente.hidden = false;
  } finally {
    carregando = false;
    listaFuncionalidades.setAttribute("aria-busy", "false");
    botaoTentarNovamente.disabled = false;
  }
}

botaoTentarNovamente.addEventListener("click", carregarFuncionalidades);
carregarFuncionalidades();
