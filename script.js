const cardContainer = document.querySelector('.card-container');
const buscaInput = document.getElementById('busca-input');
let filmes = [];

async function carregarFilmes() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        filmes = await response.json();
        exibirFilmes(filmes);
    } catch (error) {
        console.error("Erro ao carregar os filmes:", error);
        cardContainer.innerHTML = '<p>Não foi possível carregar a lista de filmes. Tente novamente mais tarde.</p>';
    }
}

function exibirFilmes(listaDeFilmes) {
    cardContainer.innerHTML = '';
    if (listaDeFilmes.length === 0) {
        cardContainer.innerHTML = '<p>Nenhum filme encontrado com o termo buscado.</p>';
        return;
    }

    listaDeFilmes.forEach(filme => {
        const card = document.createElement('article');
        card.classList.add('card');

        card.innerHTML = `
            <p><strong>Ano:</strong> ${filme.ano}</p>
            <h2>${filme.titulo}</h2>
            <p>${filme.sinopse}</p>
            <a href="${filme.link}" target="_blank" rel="noopener noreferrer">Saiba mais</a>
        `;

        cardContainer.appendChild(card);
    });
}

function iniciarBusca() {
    const termoBusca = buscaInput.value.toLowerCase();
    const filmesFiltrados = filmes.filter(filme => 
        filme.titulo.toLowerCase().includes(termoBusca)
    );
    exibirFilmes(filmesFiltrados);
}

buscaInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});

// Carrega os filmes quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarFilmes);