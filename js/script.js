const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".search__input");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none"
    pokemonName.innerHTML = "Not Found :c"
    pokemonNumber.innerHTML = ""
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
  input.value = ""
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon <= 1) {
    return}
  searchPokemon -= 1
  renderPokemon(searchPokemon)
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);

// === 🌠 Estrelas aleatórias no fundo ===
document.addEventListener("DOMContentLoaded", () => {
  const totalStars = 80;

  for (let i = 0; i < totalStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 2 + 1; // 1 a 3 px
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${top}vh`;
    star.style.left = `${left}vw`;

    document.body.appendChild(star);
  }
});

// === 🌙 Lua no fundo ===

const moon = document.createElement("div")
moon.classList.add("moon")
document.body.appendChild(moon)

// Estrela Cadentes 
function createShootingStar() {
  const star = document.createElement("div")
  star.classList.add("shooting-star")

  // Posição aleatória no topo da tela
  star.style.top = `${Math.random() * 20}vh`
  star.style.left = `${Math.random() * 80}vw`

  document.body.appendChild(star)

  // Remove após animação
  setTimeout(() => {
    star.remove()
  }, 1000)
}

// Cria uma estrela a cada 5–10 segundos (de forma aleatória) xd
setInterval(() => {
  if (Math.random() < 0.5) {
    createShootingStar()
  }
}, 5000)


