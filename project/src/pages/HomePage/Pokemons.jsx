import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PokemonsPage.module.css';
import { fetchPokemonList } from '../../utilits/api';

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

  useEffect(() => {
    let isMounted = true;

    const loadInitialList = async () => {
      try {
        const { results, next } = await fetchPokemonList(BaseUrl);
        if (!isMounted) return;

        setAllPokemonList(results);
        setNextUrl(next);
        if (!next) setAllPokemonLoaded(true);
      } catch (err) {
        console.error("Ошибка загрузки начального списка:", err);
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
      const { results, next } = await fetchPokemonList(nextUrl);
      setAllPokemonList(prev => [...prev, ...results]);
      setNextUrl(next);
      if (!next) setAllPokemonLoaded(true);
    } catch (err) {
      console.error("Ошибка при подгрузке покемонов:", err);
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
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <div className={styles['pokemon-container']}>
      <h1>Pokemons</h1>
      <div className={styles['pokemon-grid']}>
        {displayList.map((pokemon) => (
          <div key={pokemon.id} className={styles['pokemon-card']}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              className={styles['pokemon-image']}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120?text=No+Image";
                e.target.alt = "Изображение не доступно";
              }}
            />
            <button
              type="button"
              className={styles['pokemon-button']}
              onClick={() => handlePokemonClick(pokemon)}
            >
              {pokemon.name}
            </button>
          </div>
        ))}
      </div>
      <div ref={lastPokemonRef} style={{ height: '20px' }} />
    </div>
  );
}