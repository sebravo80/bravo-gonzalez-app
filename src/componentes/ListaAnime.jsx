import TarjetaAnime from './TarjetaAnime';

const ListaAnime = ({ animes, onToggleFavorito, esFavorito, cargando, error, tipoVista }) => {
  const obtenerTitulo = () => {
    switch (tipoVista) {
      case 'populares':
        return 'Animes Más Populares 🏅';
      case 'temporada':
        return 'Animes de Temporada Actual 📺';
      case 'busqueda':
        return 'Resultados de búsqueda 📋';
      default:
        return 'Animes 📋';
    }
  };

  const animesUnicos = animes.reduce((acc, anime, index) => {
    const yaExiste = acc.find(item => item.mal_id === anime.mal_id);
    if (!yaExiste) {
      acc.push({
        ...anime,
        uniqueKey: `${anime.mal_id}-${index}-${tipoVista}`
      });
    }
    return acc;
  }, []);

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🔄</div>
        <p>{tipoVista === 'populares' ? 'Cargando animes populares...' : 'Buscando animes...'}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          ❌ {error}
        </div>
      </div>
    );
  }

  if (animesUnicos.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-content">
          <h3>No se encontraron resultados 🔎</h3>
          <p>Prueba con otro</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-anime">
      <h2>{obtenerTitulo()} ({animesUnicos.length})</h2>
      <div className="anime-grid">
        {animesUnicos.map((anime) => (
          <TarjetaAnime
            key={anime.uniqueKey}
            anime={anime}
            onToggleFavorito={onToggleFavorito}
            esFavorito={esFavorito(anime.mal_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListaAnime;