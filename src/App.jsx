import React, { useState, useEffect } from 'react';

function App() {
  const [characterId, setCharacterId] = useState('');
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState(null);
  const [currentCharacterId, setCurrentCharacterId] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${currentCharacterId}`);
        if (!response.ok) {
          throw new Error('Falha ao carregar os dados');
        }
        const data = await response.json();
        setCharacterData(data);
        setError(null);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [currentCharacterId]);

  const handleSearch = (event) => {
    event.preventDefault();
    const id = parseInt(characterId);
    if (isNaN(id) || id <= 0 || id > 671) {
      alert('Por favor, insira um ID válido (entre 1 e 671).');
      return;
    }
    setCurrentCharacterId(id);
  };

  const handlePrevious = () => {
    if (currentCharacterId > 1) {
      setCurrentCharacterId(currentCharacterId - 1);
    }
  };

  const handleNext = () => {
    if (currentCharacterId < 671) {
      setCurrentCharacterId(currentCharacterId + 1);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="characterId">ID do personagem</label>
        <input type="number" value={characterId} onChange={(e) => setCharacterId(e.target.value)} />
        <button type="submit">Pesquisar</button>
      </form>
      {error && <p>{error}</p>}
      {characterData && (
        <div>
          <img src={characterData.image} alt={characterData.name} />
          <div>
            <p>Nome: {characterData.name}</p>
            <p>Status: {characterData.status}</p>
            <p>Espécie: {characterData.species}</p>
            <p>Gênero: {characterData.gender}</p>
            <p>Planeta de origem: {characterData.origin.name}</p>
            <p>Episódios:</p>
            <ul>
              {characterData.episode.map((episode, index) => (
                <li key={index}>{episode}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <button onClick={handlePrevious}>Anterior</button>
      <button onClick={handleNext}>Próximo</button>
    </div>
  );
}

export default App;



