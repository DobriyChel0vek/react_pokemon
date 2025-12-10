import { useState, useEffect } from 'react';
import styles from './PokemonPage.module.css';
import { fetchPokemonDetails } from '../../utilits/api';

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [pokemonName]);

  if (loading) {
    return <div className="pokemon-details-loading">Loading details...</div>;
  }

  if (error) {
    return <div className="pokemon-details-error">Error: {error}</div>;
  }

  if (!pokemon) {
    return <div className="pokemon-details-no-data">No data available.</div>;
  }

  return (
    <div className={styles['pokemon-details-card']}>
      <h2 className={styles['pokemon-details-name']}>{pokemon.name.toUpperCase()}</h2>
      <img
        className={styles['pokemon-details-image']}
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200?text=No+Image';
          e.target.alt = 'Image not available';
        }}
      />

      <button
        className={styles['pokemon-details-toggle-btn']}
        onClick={() => setShowCharacteristic(!showCharacteristic)}
        type="button"
      >
        {showCharacteristic ? 'Hide Characteristic' : 'Show Characteristic'}
      </button>

      {showCharacteristic && (
        <div className={styles['pokemon-details-section']}>
          <h3>Characteristic:</h3>
          <ul>
            <li><strong>ID:</strong> {pokemon.id}</li>
            <li><strong>Height:</strong> {pokemon.height / 10} m</li>
            <li><strong>Weight:</strong> {pokemon.weight / 10} kg</li>
            <li><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</li>
            <li><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</li>
            <li><strong>Base Experience:</strong> {pokemon.base_experience}</li>
          </ul>
        </div>
      )}

      <button
        className={styles['pokemon-details-toggle-btn']}
        onClick={() => setShowStats(!showStats)}
        type="button"
      >
        {showStats ? 'Hide Stats' : 'Show Stats'}
      </button>

      {showStats && (
        <div className={styles['pokemon-details-section']}>
          <h3>Stats:</h3>
          <ul>
            {pokemon.stats.map(stat => (
              <li key={stat.stat.name}>
                <strong>{stat.stat.name.replace(/-/g, ' ')}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;