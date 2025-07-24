import {traducirEstadoAnime, obtenerClaseEstado, traducirTipoAnime, traducirGeneros, formatearDuracion} from '../utilidades/traducciones';

const TarjetaAnime = ({ anime, onToggleFavorito, esFavorito }) => {
  const {
    title, title_english, images, synopsis, score, episodes, status, year, type, genres, duration
  } = anime;

  const imagenUrl = images?.jpg?.large_image_url || images?.jpg?.image_url;
  const titulo = title_english || title;
  const sinopsis = synopsis ? 
    (synopsis.length > 200 ? synopsis.substring(0, 200) + '...' : synopsis) 
    : 'Sin descripción disponible';

  const estadoTraducido = traducirEstadoAnime(status);
  const claseEstado = obtenerClaseEstado(status);
  const tipoTraducido = traducirTipoAnime(type);
  const generosTraducidos = traducirGeneros(genres);
  const duracionTraducida = formatearDuracion(duration);

  return (
    <div className="tarjeta-anime">
      <div className="anime-imagen">
        <img 
          src={imagenUrl} 
          alt={titulo}
          loading="lazy"
        />
        <button 
          className={`btn-favorito ${esFavorito ? 'favorito' : ''}`}
          onClick={() => onToggleFavorito(anime)}
          title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {esFavorito ? '❤️' : '🤍'}
        </button>
        {type && (
          <div className="anime-tipo">
            {tipoTraducido}
          </div>
        )}
      </div>
      
      <div className="anime-info">
        <h3 className="anime-titulo">{titulo}</h3>
        
        <div className="anime-detalles">
          {score && (
            <span className="anime-score">
              ⭐ {score}/10
            </span>
          )}
          {episodes && (
            <span className="anime-episodios">
              📺 {episodes} eps
            </span>
          )}
          {year && (
            <span className="anime-año">
              📅 {year}
            </span>
          )}
          {duration && (
            <span className="anime-duracion">
              ⏱️ {duracionTraducida}
            </span>
          )}
        </div>
        
        <div className="anime-status">
          Estado: <span className={`status ${claseEstado}`}>
            {estadoTraducido}
          </span>
        </div>

        {generosTraducidos && generosTraducidos.length > 0 && (
          <div className="anime-generos">
            <span className="generos-label">Géneros:</span>
            <div className="generos-lista">
              {generosTraducidos.slice(0, 3).map((genero, index) => (
                <span key={index} className="genero-tag">
                  {typeof genero === 'object' ? genero.name : genero}
                </span>
              ))}
              {generosTraducidos.length > 3 && (
                <span className="genero-tag mas">
                  +{generosTraducidos.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
        
        <p className="anime-sinopsis">{sinopsis}</p>
      </div>
    </div>
  );
};

export default TarjetaAnime;