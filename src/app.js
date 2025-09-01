// JSON inicial das jogadoras
let jogadoras = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
];

//Inicialização
window.onload = function() { // este código ira rodar quando a página termina de carregar 
    carregarJogadoras();         // recupera jogadoras salvas no navegador
    exibirJogadoras(jogadoras);  // exibe elas na tela

    document.querySelector(".form-jogadora").addEventListener("submit", addJogadora); //Irá fazer com que um novo post seja adicionado
};

//Salvando no localStorage
function saveJogadoras() {
    localStorage.setItem("jogadoras", JSON.stringify (jogadoras)); 
}

function carregarJogadoras() {
    const storedJogadoras = localStorage.getItem("jogadoras"); //Aqui ele tenta buscar dados salvos na chave "jogadoras".
    if (storedJogadoras) { //Aqui verificamos se existe algo salvo nesta chave, se se não existir ele não vai fazer nada e evita erros.
        jogadoras = JSON.parse(storedJogadoras); //Aqui transformamos as strings do locaStorage em arrays de objetos. 
    }
}

//CREATE 
function addJogadora(event){
  event.preventDefault(); //Serve para impedir o comportamento padrão do formulário (que é carregar a página) Assim conseguimos manipular os dados sem perder o que já está na tela.

  //Com esses códigos nós pegamos os valores que estão no formulario  
  const foto = document.getElementById("foto").value;
  const nome = document.getElementById("nome").value;
  const clube = document.getElementById("clube").value;
  const posicao = document.getElementById("posicao").value;
  const gols = parseInt(document.getElementById("gols").value);
  const assistencias = parseInt(document.getElementById("Assistencia").value);
  const jogos = parseInt(document.getElementById("jogos").value);

  const novaJogadora = {
  foto,
  nome,
  clube,
  posicao,
  gols,
  assistencias,
  jogos,
  favorita: false
  };

  jogadoras.push(novaJogadora);
  saveJogadoras();

  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));

  document.querySelector(".form-jogadora").reset(); //Limpamos o formulário para que seja possivel adicionar novas jogadoras
  exibirJogadoras(jogadoras); //Aqui nós atualizamos os cards na tela

}

// READ
function exibirJogadoras(lista) {
  const cardsContainer = document.getElementById("cards");
  
  cardsContainer.innerHTML = `
    <h2 class="titulo-cards"> Jogadoras já cadastradas: </h2>
  `;

  lista.forEach((jogadora, index) => { //forEach: percorre cada jogadora do array. index: é a posição da jogadora dentro do array
    const card = document.createElement("div"); //Cria um novo elemento <div> dentro do HTML
    card.classList.add("cards-jogadora"); //Adiciona a classe cards-jogadoras

    card.innerHTML = `
      <img class="foto-jogadora" src="${jogadora.foto}" alt="${jogadora.nome}">
      <h3>Nome da jogadora: ${jogadora.nome}</h3>
      <p><strong>Clube: </strong> ${jogadora.clube}</p>
      <p><strong>Posição: </strong> ${jogadora.posicao}</p>
      <p><strong>Gols: </strong> ${jogadora.gols}</p>
      <p><strong>Assistências: </strong> ${jogadora.assistencias}</p>
      <p><strong>Jogos: </strong> ${jogadora.jogos}</p>
      <div class="botoes">
          <button class="editar">Editar</button>
          <button class="excluir">Excluir</button>
          <button class="favoritar">${jogadora.favorita ? "★" : "☆"}</button> 
      </div>
    `;   //Se a estrela favoritada for true exibir a estrela cheia, se não exibir a estrela vazia 
    cardsContainer.appendChild(card); //Cada card é adicionado ao elemento 
  });
}
exibirJogadoras(jogadoras);