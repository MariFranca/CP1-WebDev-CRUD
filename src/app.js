// JSON inicial das jogadoras
let jogadoras = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT78PYJNlhwz0swQJZgsI1aJfGdPQA7tfVhCA&s",
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
    if (storedJogadoras) { //Verifico se existe algo salvo nesta chave, se se não existir ele não vai fazer nada e evita erros.
        jogadoras = JSON.parse(storedJogadoras); //Aqui transformo as strings do locaStorage em arrays de objetos. 
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
  const assistencias = parseInt(document.getElementById("assistencia").value);
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
  
  if (!cardsContainer.querySelector(".titulo-cards")) {
    cardsContainer.innerHTML = `<h2 class="titulo-cards">Jogadoras já cadastradas:</h2>`;
  }

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
          <button onclick="editJogadora(${index})">Editar</button> 
          <button onclick="deleteJogadora(${index})">Excluir</button>
          <button class="favoritar" onclick="favJogadoras(${index})">${jogadora.favorita ? "★" : "☆"}</button>
      </div>
    `;  //Se a estrela favoritada for true exibir a estrela cheia, se não exibir a estrela vazia 
        //Para que os botões funcionem corretamente precisamos adicionar o onclick 
    cardsContainer.appendChild(card); //Cada card é adicionado ao elemento 
  });
}
exibirJogadoras(jogadoras);

//UPDATE
function editJogadora(index) {
  const jogadora = jogadoras[index];

  const novoNome = prompt("Nome:", jogadora.nome);
  const novoClube = prompt("Clube:", jogadora.clube); 
  const novaPosicao = prompt("Posição:", jogadora.posicao);
  const novaFoto = prompt("URL da foto:", jogadora.foto);
  const novosGols = parseInt(prompt("Gols:", jogadora.gols));
  const novasAssistencias = parseInt(prompt("Assistências:", jogadora.assistencias));
  const novosJogos = parseInt(prompt("Jogos:", jogadora.jogos));

  //Para que realmente funcione temos que atualizar os daados 
  jogadora.nome = novoNome || jogadora.nome;  //Aqui atualizamos cada dado e onde verificamos se os valores adicionados são validos, se não mantemos os mesmos
  jogadora.clube = novoClube || jogadora.clube;
  jogadora.posicao = novaPosicao || jogadora.posicao;
  jogadora.foto = novaFoto || jogadora.foto;
  jogadora.gols = isNaN(novosGols) ? jogadora.gols : novosGols; //adicionamos o isNaN nos números para caso seja digitado algo invalido não correr o risco de quebrar 
  jogadora.assistencias = isNaN(novasAssistencias) ? jogadora.assistencias : novasAssistencias;
  jogadora.jogos = isNaN(novosJogos) ? jogadora.jogos : novosJogos;

  saveJogadoras(); 
  exibirJogadoras(jogadoras);
  alert("Jogadora editada com sucesso!"); 
}

//DELETE
function deleteJogadora(index) {
  if (confirm(`Deseja realmente excluir ${jogadoras[index].nome}?`)) {
    jogadoras.splice(index, 1); //com isso removemos 1 elemento na posição index
    saveJogadoras(); 
    exibirJogadoras(jogadoras); 
    alert("Jogadora excluída com sucesso!");
  }
}

//Favoritando as jogadoras 
function favJogadoras(index) {
  const jogadora = jogadoras[index]; //pegamos a jogadora que foi clicada pelu usuario 
  jogadora.favorita = !jogadora.favorita; //invertemos o valor do atributo 'favorita' (!jogadora.favorita inverte os valores)
  saveJogadoras();
  exibirJogadoras(jogadoras);
}