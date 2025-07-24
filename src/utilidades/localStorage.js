export const localStorageUtil = {
  guardarBusqueda: (terminoBusqueda, resultados) => {
    try {
      const busquedasGuardadas = localStorageUtil.obtenerBusquedas();
      const nuevaBusqueda = {
        id: Date.now(),
        termino: terminoBusqueda,
        fecha: new Date().toISOString(),
        resultados: resultados
      };

      busquedasGuardadas.unshift(nuevaBusqueda);
      
      const busquedasLimitadas = busquedasGuardadas.slice(0, 10);
      
      localStorage.setItem('busquedasAnime', JSON.stringify(busquedasLimitadas));
    } catch (error) {
      console.error('Error al guardar búsqueda:', error);
    }
  },

  obtenerBusquedas: () => {
    try {
      const busquedas = localStorage.getItem('busquedasAnime');
      return busquedas ? JSON.parse(busquedas) : [];
    } catch (error) {
      console.error('Error al obtener búsquedas:', error);
      return [];
    }
  },

  guardarFavorito: (anime) => {
    try {
      const favoritos = localStorageUtil.obtenerFavoritos();
      const yaExiste = favoritos.some(fav => fav.mal_id === anime.mal_id);
      
      if (!yaExiste) {
        favoritos.push(anime);
        localStorage.setItem('favoritosAnime', JSON.stringify(favoritos));
      }
    } catch (error) {
      console.error('Error al guardar favorito:', error);
    }
  },

  obtenerFavoritos: () => {
    try {
      const favoritos = localStorage.getItem('favoritosAnime');
      return favoritos ? JSON.parse(favoritos) : [];
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      return [];
    }
  },

  eliminarFavorito: (animeId) => {
    try {
      const favoritos = localStorageUtil.obtenerFavoritos();
      const favoritosFiltrados = favoritos.filter(fav => fav.mal_id !== animeId);
      localStorage.setItem('favoritosAnime', JSON.stringify(favoritosFiltrados));
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  }
};