import TarjetaAnime from './TarjetaAnime';

const Favoritos = ({ favoritos, onToggleFavorito, esFavorito }) => {
  return (
    <div className="favoritos-container">
      <h2>Mis Animes Favoritos ✨ ({favoritos.length})</h2>
      
      {favoritos.length === 0 ? (
        <div className="no-favoritos">
          <div className="no-favoritos-content">
            <h3>Aún no tienes animes favoritos</h3>
            <p>Busca animes y marca los que más te gusten con el corazón</p>
          </div>
        </div>
      ) : (
        <div className="anime-grid">
          {favoritos.map((anime) => (
            <TarjetaAnime
              key={anime.mal_id}
              anime={anime}
              onToggleFavorito={onToggleFavorito}
              esFavorito={esFavorito(anime.mal_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;