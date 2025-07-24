import { useState } from 'react';
import BuscadorAnime from './componentes/BuscadorAnime';
import ListaAnime from './componentes/ListaAnime';
import Favoritos from './componentes/Favoritos';
import Historial from './componentes/Historial';
import { useAnime } from './hooks/useAnime';
import './estilos/App.css';

function App() {
  const [vistaActiva, setVistaActiva] = useState('buscar');
  
  const {
    animes, cargando, error, busquedasGuardadas, favoritos, tipoVista, buscarAnime, toggleFavorito, esFavorito, cargarBusquedaAnterior, cargarAnimesPopulares, cargarAnimesTemporada
  } = useAnime();

  const manejarCargarBusqueda = (busqueda) => {
    cargarBusquedaAnterior(busqueda);
    setVistaActiva('buscar');
  };

  return (
    <div className="App">
      <nav className="navegacion">
        <button 
          className={`nav-btn ${vistaActiva === 'buscar' ? 'activo' : ''}`}
          onClick={() => setVistaActiva('buscar')}
        >
          Buscar Anime 🔎
        </button>
        <button 
          className={`nav-btn ${vistaActiva === 'favoritos' ? 'activo' : ''}`}
          onClick={() => setVistaActiva('favoritos')}
        >
          Favoritos ✨ ({favoritos.length})
        </button>
        <button 
          className={`nav-btn ${vistaActiva === 'historial' ? 'activo' : ''}`}
          onClick={() => setVistaActiva('historial')}
        >
          Historial 📋 ({busquedasGuardadas.length})
        </button>
      </nav>

      <main className="contenido-principal">
        {vistaActiva === 'buscar' && (
          <>
            <BuscadorAnime 
              onBuscar={buscarAnime}
              cargando={cargando}
            />
            
            <div className="categorias-container">
              <button 
                className={`categoria-btn ${tipoVista === 'populares' ? 'activo' : ''}`}
                onClick={cargarAnimesPopulares}
                disabled={cargando}
              >
                Top Populares 🏅
              </button>
              <button 
                className={`categoria-btn ${tipoVista === 'temporada' ? 'activo' : ''}`}
                onClick={cargarAnimesTemporada}
                disabled={cargando}
              >
                Temporada Actual 📺
              </button>
            </div>

            <ListaAnime
              animes={animes}
              onToggleFavorito={toggleFavorito}
              esFavorito={esFavorito}
              cargando={cargando}
              error={error}
              tipoVista={tipoVista}
            />
          </>
        )}

        {vistaActiva === 'favoritos' && (
          <Favoritos
            favoritos={favoritos}
            onToggleFavorito={toggleFavorito}
            esFavorito={esFavorito}
          />
        )}

        {vistaActiva === 'historial' && (
          <Historial
            busquedasGuardadas={busquedasGuardadas}
            onCargarBusqueda={manejarCargarBusqueda}
          />
        )}
      </main>

      <footer className="footer">
        <p>Sebastián Bravo y Johan González, rapidapi</p>
      </footer>
    </div>
  );
}

export default App;