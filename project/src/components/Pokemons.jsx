import { useState, useEffect } from 'react'; 

const BaseUrl = "https://pokeapi.co/api/v2/pokemon/";

export function Pokemons() {
  const [pokemonList, setPokemonList] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(BaseUrl);
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        setPokemonList(data.results);
      } catch (err) {
        console.error("Произошла ошибка при загрузке списка покемонов:", err);
        setPokemonList([]);
      }
    }

    fetchData(); 
  }, []);

  if (!pokemonList) {
    return <h1>Загрузка списка покемонов...</h1>;
  }

//   const handlePokemonClick = (pokemon) => {
//     console.log("Кликнули на покемона:", pokemon.name, "URL:", pokemon.url);

  return (
    <div>
      <h1>Список Покемонов</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <button>
              {pokemon.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}