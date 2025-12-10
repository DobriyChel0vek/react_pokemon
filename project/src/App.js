import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Pokemons } from './pages/HomePage/Pokemons';
import PokemonDetailsPage from './pages/PokemonStatsPage/PokemonDetailsPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Главная страница — список покемонов */}
          <Route path="/" element={<Pokemons />} />
          
          {/* Страница с деталями покемона */}
          <Route path="/pokemon/:name" element={<PokemonDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 