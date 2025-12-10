const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemonList = async (url = BASE_URL) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    const results = data.results.map((pokemon) => ({
      ...pokemon,
      id: parseInt(pokemon.url.split('/').filter(Boolean).pop(), 10),
    }));

    return {
      results,
      next: data.next,
    };
  } catch (err) {
    console.error('Ошибка загрузки списка покемонов:', err);
    throw err;
  }
};

export const fetchPokemonDetails = async (name) => {
  if (!name) throw new Error('Имя покемона не указано');

  const cleanName = name.trim().toLowerCase();
  const url = `${BASE_URL}${cleanName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Покемон "${cleanName}" не найден`);
      }
      throw new Error(`Ошибка API: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Ошибка загрузки деталей покемона:', err);
    throw err;
  }
};