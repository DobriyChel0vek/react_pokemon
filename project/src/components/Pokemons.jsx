import { useState, useEffect } from 'react';

const BaseUrl = "https://pokeapi.co/api/v2/pokemon/";

export function Pokemons() {
  const [pokemonList, setPokemonList] = useState(null);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(BaseUrl);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        setPokemonList(data.results);
      } catch (err) {
        console.error("Ошибка загрузки списка:", err);
        setPokemonList([]);
      }
    }
    fetchData();
  }, []);

  const handlePokemonClick = async (pokemon) => {
    console.log("Клик на:", pokemon.name, pokemon.url);
    setDetailsLoading(true);
    setSelectedPokemonDetails(null); // Очистить предыдущие данные

    try {
      const response = await fetch(pokemon.url);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const detailsData = await response.json();
      setSelectedPokemonDetails(detailsData);
    } catch (err) {
      console.error("Ошибка загрузки деталей:", err);
      setSelectedPokemonDetails(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  if (!pokemonList) return <h1>Загрузка списка...</h1>;

  return (
    <div>
      <h1>Список Покемонов</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <button type="button" onClick={() => handlePokemonClick(pokemon)}>
              {pokemon.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Отображение деталей */}
      {detailsLoading && <p>Загрузка информации...</p>}
      {selectedPokemonDetails && !detailsLoading && (
        <div>
          <h2>Информация: {selectedPokemonDetails.name}</h2>

          <p><strong>ID:</strong> {selectedPokemonDetails.id}</p>
          <p><strong>Is Default:</strong> {selectedPokemonDetails.is_default ? "Yes" : "No"}</p>
          <p><strong>Order:</strong> {selectedPokemonDetails.order}</p>
          <p><strong>Base Experience:</strong> {selectedPokemonDetails.base_experience}</p>
          <p><strong>Height:</strong> {selectedPokemonDetails.height}</p>
          <p><strong>Weight:</strong> {selectedPokemonDetails.weight}</p>

          {selectedPokemonDetails.sprites?.front_default && (
            <div>
              <h3>Sprite:</h3>
              <img src={selectedPokemonDetails.sprites.front_default} alt={selectedPokemonDetails.name} />
            </div>
          )}

          <h3>Types:</h3>
          <ul>
            {selectedPokemonDetails.types.map((typeInfo, idx) => (
              <li key={`type-${idx}`}>
                {typeInfo.type.name} (Slot: {typeInfo.slot})
              </li>
            ))}
          </ul>

          <h3>Abilities:</h3>
          <ul>
            {selectedPokemonDetails.abilities.map((abilityInfo, idx) => (
              <li key={`ability-${idx}`}>
                {abilityInfo.ability.name} (Hidden: {abilityInfo.is_hidden ? "Yes" : "No"}, Slot: {abilityInfo.slot})
              </li>
            ))}
          </ul>

          <h3>Stats:</h3>
          <ul>
            {selectedPokemonDetails.stats.map((statInfo, idx) => (
              <li key={`stat-${idx}`}>
                {statInfo.stat.name}: {statInfo.base_stat} (Effort: {statInfo.effort})
              </li>
            ))}
          </ul>

          <h3>Moves:</h3>
          <ul>
            {selectedPokemonDetails.moves.map((moveInfo, idx) => (
              <li key={`move-${idx}`}>
                {moveInfo.move.name}
              </li>
            ))}
          </ul>

          <h3>Forms:</h3>
          <ul>
            {selectedPokemonDetails.forms.map((formInfo, idx) => (
              <li key={`form-${idx}`}>
                {formInfo.name}
              </li>
            ))}
          </ul>

          <h3>Game Indices:</h3>
          <ul>
            {selectedPokemonDetails.game_indices.map((gameIndexInfo, idx) => (
              <li key={`game_idx-${idx}`}>
                Game Index: {gameIndexInfo.game_index}, Version: {gameIndexInfo.version.name}
              </li>
            ))}
          </ul>

          <h3>Held Items:</h3>
          <ul>
            {selectedPokemonDetails.held_items && selectedPokemonDetails.held_items.length > 0 ? (
              selectedPokemonDetails.held_items.map((heldItemInfo, idx) => (
                <li key={`held_item-${idx}`}>
                  Item: {heldItemInfo.item.name}
                  <ul>
                    {heldItemInfo.version_details.map((vd, vIdx) => (
                      <li key={`vd-${vIdx}`}>
                        Version: {vd.version.name}, Rarity: {vd.rarity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <li>None</li>
            )}
          </ul>

          {selectedPokemonDetails.cries && (
            <div>
              <h3>Cries:</h3>
              {selectedPokemonDetails.cries.latest && (
                <p>Latest: <a href={selectedPokemonDetails.cries.latest} target="_blank" rel="noopener noreferrer">Listen Latest</a></p>
              )}
              {selectedPokemonDetails.cries.legacy && (
                <p>Legacy: <a href={selectedPokemonDetails.cries.legacy} target="_blank" rel="noopener noreferrer">Listen Legacy</a></p>
              )}
            </div>
          )}

          {selectedPokemonDetails.species && (
            <div>
              <h3>Species:</h3>
              <p>Name: {selectedPokemonDetails.species.name}, URL: <a href={selectedPokemonDetails.species.url} target="_blank" rel="noopener noreferrer">{selectedPokemonDetails.species.url}</a></p>
            </div>
          )}

          {selectedPokemonDetails.location_area_encounters && (
            <div>
              <h3>Location Encounters:</h3>
              <p>Details URL: <a href={selectedPokemonDetails.location_area_encounters} target="_blank" rel="noopener noreferrer">{selectedPokemonDetails.location_area_encounters}</a></p>
            </div>
          )}

          {selectedPokemonDetails.past_abilities && selectedPokemonDetails.past_abilities.length > 0 && (
            <div>
              <h3>Past Abilities:</h3>
              <ul>
                {selectedPokemonDetails.past_abilities.map((pastAbil, idx) => (
                  <li key={`past_abil-${idx}`}>
                    Generation: {pastAbil.generation.name}
                    <ul>
                      {pastAbil.abilities.map((abil, aIdx) => (
                        <li key={`abil_in_past-${aIdx}`}>
                          {abil.ability ? abil.ability.name : "Unknown Ability"} (Hidden: {abil.is_hidden ? "Yes" : "No"}, Slot: {abil.slot})
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedPokemonDetails.past_types && selectedPokemonDetails.past_types.length > 0 && (
            <div>
              <h3>Past Types:</h3>
              <ul>
                {selectedPokemonDetails.past_types.map((pastTypeInfo, idx) => (
                  <li key={`past_type-${idx}`}>
                    Generation: {pastTypeInfo.generation.name}
                    <ul>
                      {pastTypeInfo.types.map((typeDetail, tIdx) => (
                        <li key={`past_type_detail-${tIdx}`}>
                          {typeDetail.type.name} (Slot: {typeDetail.slot})
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedPokemonDetails.sprites && (
            <div>
              <h3>Sprites:</h3>
              <div>
                <h4>Default:</h4>
                {selectedPokemonDetails.sprites.front_default && <img src={selectedPokemonDetails.sprites.front_default} alt={`${selectedPokemonDetails.name} front`} />}
                {selectedPokemonDetails.sprites.back_default && <img src={selectedPokemonDetails.sprites.back_default} alt={`${selectedPokemonDetails.name} back`} />}
                {selectedPokemonDetails.sprites.front_shiny && <img src={selectedPokemonDetails.sprites.front_shiny} alt={`${selectedPokemonDetails.name} shiny front`} />}
                {selectedPokemonDetails.sprites.back_shiny && <img src={selectedPokemonDetails.sprites.back_shiny} alt={`${selectedPokemonDetails.name} shiny back`} />}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}