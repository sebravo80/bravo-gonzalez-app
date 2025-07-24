import { useState } from 'react';

const BuscadorAnime = ({ onBuscar, cargando }) => {
  const [consulta, setConsulta] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (consulta.trim()) {
      onBuscar(consulta);
    }
  };

  return (
    <div className="buscador-container">
      <h1>Buscador de Anime</h1>
      <form onSubmit={manejarEnvio} className="buscador-form">
        <div className="input-group">
          <input
            type="text"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Busca aquí tu anime favorito"
            className="buscador-input"
            disabled={cargando}
          />
          <button 
            type="submit" 
            className="buscador-btn"
            disabled={cargando || !consulta.trim()}
          >
            {cargando ? 'Buscando... 🔎' : 'Buscar 🔎'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuscadorAnime;