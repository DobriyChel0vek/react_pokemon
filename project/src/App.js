// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetailsPage from './components/PokemonDetailsPage';
import { Pokemons } from './components/Pokemons';

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