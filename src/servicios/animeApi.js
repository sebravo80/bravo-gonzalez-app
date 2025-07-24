const BASE_URL = 'https://api.jikan.moe/v4';

export const animeApi = {
  buscarAnime: async (consulta) => {
    try {
      const respuesta = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(consulta)}&limit=20`);
      
      if (!respuesta.ok) {
        throw new Error('Error al buscar anime');
      }
      
      const datos = await respuesta.json();
      return datos.data;
    } catch (error) {
      console.error('Error en buscarAnime:', error);
      throw error;
    }
  },

  obtenerAnimesPopulares: async () => {
    try {
      const respuesta = await fetch(`${BASE_URL}/top/anime?limit=20`);
      
      if (!respuesta.ok) {
        throw new Error('Error al obtener animes populares');
      }
      
      const datos = await respuesta.json();
      return datos.data;
    } catch (error) {
      console.error('Error en obtenerAnimesPopulares:', error);
      throw error;
    }
  },

  obtenerAnimesTemporadaActual: async () => {
    try {
      const respuesta = await fetch(`${BASE_URL}/seasons/now?limit=20`);
      
      if (!respuesta.ok) {
        throw new Error('Error al obtener animes de temporada');
      }
      
      const datos = await respuesta.json();
      return datos.data;
    } catch (error) {
      console.error('Error en obtenerAnimesTemporadaActual:', error);
      throw error;
    }
  }
};