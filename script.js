import { pokemon, pokemonTypes } from "./data/pokemon.js";
import { cardElGen, cardListGen, buttonGen } from "./modules/components.js";

// Inizializzazione della sezione principale e del pulsante
const mainSectionEl = document.querySelector(".main");
const btnAdd = document.querySelector(".btn-add");
const headerElement = document.querySelector(".header");

// Funzione per generare un nuovo Pokémon
const generateNewPokemon = (id) => {
  return {
    id,
    name: `Pokemon ${id}`, // Nome generico per esempio
    type: pokemonTypes[Math.floor(Math.random() * pokemonTypes.length)], // Seleziona un tipo casuale
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`, // URL dell'immagine (assicurati che esistano)
  };
};

// Funzione per rendere la lista dei tipi di Pokémon
const renderListTypePokemon = () => {
  pokemonTypes.forEach((type) => {
    const btnType = buttonGen(`Type - ${type}`, type);

    btnType.addEventListener("click", function () {
      const filteredPokemon = pokemon.filter(
        (pokemonsingolo) => pokemonsingolo.type === this.id
      );

      renderFilteredList(filteredPokemon); // Rendi la lista filtrata
    });

    headerElement.append(btnType);
  });
};

// Funzione per rendere la lista di card Pokémon
const renderListCard = () => {
  mainSectionEl.innerHTML = ""; // Pulisci la sezione principale

  const cardList = cardListGen(); // Crea un nuovo contenitore per le card

  pokemon.forEach((singlePokemon) => {
    const cardEl = cardElGen(singlePokemon);
    cardList.append(cardEl);
  });

  mainSectionEl.append(cardList); // Aggiungi la lista di card alla sezione principale
};

// Funzione per rendere la lista filtrata di card Pokémon
const renderFilteredList = (filteredPokemon) => {
  mainSectionEl.innerHTML = ""; // Pulisci la sezione principale

  const cardList = cardListGen(); // Crea un nuovo contenitore per le card

  if (filteredPokemon.length === 0) {
    const noPokemonMessage = document.createElement("p");
    noPokemonMessage.textContent = "Non esistono pokemon con questo tipo";
    mainSectionEl.append(noPokemonMessage); // Aggiungi un messaggio se non ci sono Pokémon
    return;
  }

  filteredPokemon.forEach((singlePokemon) => {
    const cardEl = cardElGen(singlePokemon);
    cardList.append(cardEl);
  });

  mainSectionEl.append(cardList); // Aggiungi la lista filtrata alla sezione principale
};

// Gestore per l'evento di aggiunta di un Pokémon
btnAdd.addEventListener("click", function () {
  const newId = pokemon.length + 1; // Genera un nuovo ID per il Pokémon
  const newPokemon = generateNewPokemon(newId); // Crea un nuovo Pokémon

  // Controlla se il Pokémon esiste già
  const isEqual = pokemon.some((i) => i.id === newPokemon.id);

  if (isEqual) {
    console.log("Il pokemon esiste già!");
  } else {
    pokemon.push(newPokemon); // Aggiungi il nuovo Pokémon all'array
    renderListCard(); // Rigenera la lista di card
  }
});

// Inizializzazione dell'app
window.onload = () => {
  renderListTypePokemon(); // Rendi i bottoni per i tipi di Pokémon
  renderListCard(); // Mostra la lista iniziale di card
};
