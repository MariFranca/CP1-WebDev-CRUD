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
    "foto": "https://www.ogol.com.br/img/jogadores/new/17/86/531786_dayana_rodriguez_20250418230620.png",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://www.ogol.com.br/img/jogadores/89/977889_med__20230203182722_mariza.png",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/17509469717a68443f5c80d181c42967cd71612af1.png",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://www.ogol.com.br/img/jogadores/new/01/43/710143_leticia_teles_20250418225602.png",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
];

window.onload = function() { 
    carregarJogadoras();         
    exibirJogadoras(jogadoras); 
    document.querySelector(".form-jogadora").addEventListener("submit", addJogadora); 
}

function saveJogadoras() {
    localStorage.setItem("jogadoras", JSON.stringify (jogadoras)); 
}

function carregarJogadoras() {
    const storedJogadoras = localStorage.getItem("jogadoras"); 
    if (storedJogadoras) { 
        jogadoras = JSON.parse(storedJogadoras); 
    }
}

function addJogadora(event){
  event.preventDefault();

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

  document.querySelector(".form-jogadora").reset(); 
  exibirJogadoras(jogadoras); 

  alert("Jogadora adicionada com sucesso!");
}

function exibirJogadoras(lista) {
  const cardsContainer = document.getElementById("cards");
  
  if (!cardsContainer.querySelector(".titulo-cards")) {
    cardsContainer.innerHTML = `<h2 class="titulo-cards">Jogadoras já cadastradas:</h2>`;
  }

  cardsContainer.innerHTML = `
    <h2 class="titulo-cards"> Jogadoras já cadastradas: </h2>
  `;

  lista.forEach((jogadora, index) => { 
    const card = document.createElement("div"); 
    card.classList.add("cards-jogadora"); 

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
    `;  

    cardsContainer.appendChild(card); 
  });
}
exibirJogadoras(jogadoras);

function editJogadora(index) {
  const jogadora = jogadoras[index];

  const novoNome = prompt("Nome:", jogadora.nome);
  const novoClube = prompt("Clube:", jogadora.clube); 
  const novaPosicao = prompt("Posição:", jogadora.posicao);
  const novaFoto = prompt("URL da foto:", jogadora.foto);
  const novosGols = parseInt(prompt("Gols:", jogadora.gols));
  const novasAssistencias = parseInt(prompt("Assistências:", jogadora.assistencias));
  const novosJogos = parseInt(prompt("Jogos:", jogadora.jogos));

  
  jogadora.nome = novoNome || jogadora.nome;  
  jogadora.clube = novoClube || jogadora.clube;
  jogadora.posicao = novaPosicao || jogadora.posicao;
  jogadora.foto = novaFoto || jogadora.foto;
  jogadora.gols = isNaN(novosGols) ? jogadora.gols : novosGols; 
  jogadora.assistencias = isNaN(novasAssistencias) ? jogadora.assistencias : novasAssistencias;
  jogadora.jogos = isNaN(novosJogos) ? jogadora.jogos : novosJogos;

  saveJogadoras(); 
  exibirJogadoras(jogadoras);
  alert("Jogadora editada com sucesso!"); 
}


function deleteJogadora(index) {
  if (confirm(`Deseja realmente excluir ${jogadoras[index].nome}?`)) {
    jogadoras.splice(index, 1); 
    saveJogadoras(); 
    exibirJogadoras(jogadoras); 
    alert("Jogadora excluída com sucesso!");
  }
}


function favJogadoras(index) {
  const jogadora = jogadoras[index]; 
  jogadora.favorita = !jogadora.favorita; 
  saveJogadoras();
  exibirJogadoras(jogadoras);
}