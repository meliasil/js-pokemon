import { pokemon, pokemonTypes } from "./data/pokemon.js";
import { cardElGen, cardListGen, buttonGen } from "./modules/components.js";

const mainSectionEl = document.querySelector(".main");
const btnAdd = document.querySelector(".btn-add");
const headerElement = document.querySelector(".header");

const generateNewPokemon = (id) => {
  return {
    id,
    name: `Pokemon ${id}`,
    type: pokemonTypes[Math.floor(Math.random() * pokemonTypes.length)],
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  };
};

const renderListTypePokemon = () => {
  pokemonTypes.forEach((type) => {
    const btnType = buttonGen(`Type - ${type}`, type);

    btnType.addEventListener("click", function () {
      const filteredPokemon = pokemon.filter(
        (pokemonsingolo) => pokemonsingolo.type === this.id
      );

      renderFilteredList(filteredPokemon);
    });

    headerElement.append(btnType);
  });
};

const renderListCard = () => {
  mainSectionEl.innerHTML = "";

  const cardList = cardListGen();

  pokemon.forEach((singlePokemon) => {
    const cardEl = cardElGen(singlePokemon);
    cardList.append(cardEl);
  });

  mainSectionEl.append(cardList);
};

const renderFilteredList = (filteredPokemon) => {
  mainSectionEl.innerHTML = "";

  const cardList = cardListGen();

  if (filteredPokemon.length === 0) {
    const noPokemonMessage = document.createElement("p");
    noPokemonMessage.textContent = "Non esistono pokemon con questo tipo";
    mainSectionEl.append(noPokemonMessage);
    return;
  }

  filteredPokemon.forEach((singlePokemon) => {
    const cardEl = cardElGen(singlePokemon);
    cardList.append(cardEl);
  });

  mainSectionEl.append(cardList);
};

btnAdd.addEventListener("click", function () {
  const newId = pokemon.length + 1;
  const newPokemon = generateNewPokemon(newId);

  const isEqual = pokemon.some((i) => i.id === newPokemon.id);

  if (isEqual) {
    console.log("Il pokemon esiste già!");
  } else {
    pokemon.push(newPokemon);
    renderListCard();
  }
});

window.onload = () => {
  renderListTypePokemon();
  renderListCard();
};
