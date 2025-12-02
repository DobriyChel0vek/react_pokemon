import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PokemonsPage.module.css';

const BaseUrl = "https://pokeapi.co/api/v2/pokemon/";

export function Pokemons() {
  const [allPokemonList, setAllPokemonList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [allPokemonLoaded, setAllPokemonLoaded] = useState(false);
  const [nextUrl, setNextUrl] = useState(BaseUrl);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const navigate = useNavigate();

  const observer = useRef();
  const lastPokemonRef = useRef();

  const fetchPokemonList = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();

      const resultsWithId = data.results.map(pokemon => ({
        ...pokemon,
        id: parseInt(pokemon.url.split('/').filter(Boolean).pop(), 10)
      }));

      return { ...data, results: resultsWithId };
    } catch (err) {
      console.error("Ошибка загрузки списка:", err);
      return { results: [], next: null, count: 0 };
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialList = async () => {
      const data = await fetchPokemonList(BaseUrl);
      if (!isMounted) return;

      setAllPokemonList(data.results);
      setNextUrl(data.next);
      if (!data.next) {
        setAllPokemonLoaded(true);
      }
    };

    loadInitialList();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadMore = useCallback(async () => {
    if (!nextUrl || allPokemonLoaded || detailsLoading) return;

    setDetailsLoading(true);

    try {
      const data = await fetchPokemonList(nextUrl);
      const newPokemon = data.results;

      setAllPokemonList(prev => [...prev, ...newPokemon]);

      setNextUrl(data.next);
      if (!data.next) {
        setAllPokemonLoaded(true);
      }
    } catch (err) {
      console.error("Ошибка при подгрузке:", err);
    } finally {
      setDetailsLoading(false);
    }
  }, [nextUrl, allPokemonLoaded, detailsLoading]);

  const displayList = allPokemonList.slice(0, visibleCount);

  useEffect(() => {
    if (displayList.length === 0) return;

    const currentObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !allPokemonLoaded && !detailsLoading) {
          setVisibleCount(prev => prev + 4);
          loadMore();
        }
      },
      { rootMargin: '100px' }
    );

    if (lastPokemonRef.current) {
      currentObserver.observe(lastPokemonRef.current);
    }

    observer.current = currentObserver;

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [displayList.length, allPokemonLoaded, detailsLoading, loadMore]);

  const handlePokemonClick = (pokemon) => {
    console.log("Переход к:", pokemon.name);
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <div className={styles['pokemon-container']}>
      <h1>Pokemons</h1>
      <div className={styles['pokemon-grid']}>
        {displayList.map((pokemon, index) => (
          <div key={`${pokemon.id}-${index}`} className={styles['pokemon-card']}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              className={styles['pokemon-image']}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120?text=No+Image";
                e.target.alt = "Изображение не доступно";
              }}
            />
            <button type="button" className={styles['pokemon-button']} onClick={() => handlePokemonClick(pokemon)}>
              {pokemon.name}
            </button>
          </div>
        ))}
      </div>

      {/* Элемент для отслеживания скролла */}
      <div ref={lastPokemonRef} style={{ height: '20px' }} />
    </div>
  );
}