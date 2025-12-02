import { useParams, useNavigate } from 'react-router-dom';
import { PokemonDetails } from '../PokemonPage';

const PokemonDetailsPage = () => {
  const { name } = useParams(); // Получаем имя покемона из URL
  const navigate = useNavigate(); // Для возврата назад

  const goBack = () => {
    navigate('/'); // Возвращаемся на главную
  };

  return (
    <div>
      <button onClick={goBack}>← Назад к списку</button>
      <PokemonDetails pokemonName={name} onClose={goBack} />
    </div>
  );
};

export default PokemonDetailsPage;