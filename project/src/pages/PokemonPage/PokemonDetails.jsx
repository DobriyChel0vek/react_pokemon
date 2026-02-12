import { useState, useEffect } from 'react';
import styles from './PokemonPage.module.css';
import { fetchPokemonDetails } from '../../utilits/api';

const HEADER_HEIGHT = 90; 

const PokemonDetails = ({ pokemonName, onClose }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCharacteristic, setShowCharacteristic] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (!pokemonName) {
      setLoading(false);
      return;
    }

    const loadDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPokemonDetails(pokemonName);
        setPokemon(data);
      } catch (err) {
        setError(err.message || 'Failed to load pokemon data');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [pokemonName]);

  if (loading) {
    return (
      <div className={styles['pokemon-page']}>
        <div className={styles['pokemon-details-loading']}>
          Loading details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['pokemon-page']}>
        <div className={styles['pokemon-details-error']}>
          Error: {error}
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className={styles['pokemon-page']}>
        <div className={styles['pokemon-details-no-data']}>
          No data available.
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles['pokemon-page']}
      style={{ marginTop: HEADER_HEIGHT}}
    >
      <div className={styles['pokemon-details-card']}>
        <h2 className={styles['pokemon-details-name']}>
          {pokemon.name.toUpperCase()}
        </h2>

        <img
          className={styles['pokemon-details-image']}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200?text=No+Image';
            e.target.alt = 'Image not available';
          }}
        />

        <div>
          <button
            className={styles['pokemon-details-toggle-btn']}
            onClick={() => setShowCharacteristic((prev) => !prev)}
            type="button"
          >
            {showCharacteristic ? 'Hide Characteristic' : 'Show Characteristic'}
          </button>

          <button
            className={styles['pokemon-details-toggle-btn']}
            onClick={() => setShowStats((prev) => !prev)}
            type="button"
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>

        {showCharacteristic && (
          <div className={styles['pokemon-details-section']}>
            <h3>Characteristic:</h3>
            <ul>
              <li><strong>ID:</strong> {pokemon.id}</li>
              <li><strong>Height:</strong> {pokemon.height / 10} m</li>
              <li><strong>Weight:</strong> {pokemon.weight / 10} kg</li>
              <li>
                <strong>Types:</strong>{' '}
                {pokemon.types.map(t => t.type.name).join(', ')}
              </li>
              <li>
                <strong>Abilities:</strong>{' '}
                {pokemon.abilities.map(a => a.ability.name).join(', ')}
              </li>
              <li>
                <strong>Base Experience:</strong>{' '}
                {pokemon.base_experience}
              </li>
            </ul>
          </div>
        )}

        {showStats && (
          <div className={styles['pokemon-details-section']}>
            <h3>Stats:</h3>
            <ul>
              {pokemon.stats.map(stat => (
                <li key={stat.stat.name}>
                  <strong>
                    {stat.stat.name.replace(/-/g, ' ')}:
                  </strong>{' '}
                  {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;
