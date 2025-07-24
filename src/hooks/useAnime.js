import { useState, useEffect } from 'react';
import { animeApi } from '../servicios/animeApi';
import { localStorageUtil } from '../utilidades/localStorage';

export const useAnime = () => {
  const [animes, setAnimes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busquedasGuardadas, setBusquedasGuardadas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [tipoVista, setTipoVista] = useState('populares');

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const busquedasLocal = localStorageUtil.obtenerBusquedas();
        const favoritosLocal = localStorageUtil.obtenerFavoritos();
        
        setBusquedasGuardadas(busquedasLocal);
        setFavoritos(favoritosLocal);

        await cargarAnimesPopulares();
      } catch (err) {
        console.error('Error al cargar datos iniciales:', err);
        setError('Error al cargar datos iniciales');
      }
    };

    cargarDatosIniciales();
  }, []);

  const cargarAnimesPopulares = async () => {
    setCargando(true);
    setError(null);
    setTipoVista('populares');

    try {
      const animesPopulares = await animeApi.obtenerAnimesPopulares();
      setAnimes(animesPopulares);
    } catch (err) {
      setError('Error al cargar animes populares. Intenta nuevamente.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const cargarAnimesTemporada = async () => {
    setCargando(true);
    setError(null);
    setTipoVista('temporada');

    try {
      const animesTemporada = await animeApi.obtenerAnimesTemporadaActual();
      setAnimes(animesTemporada);
    } catch (err) {
      setError('Error al cargar animes de temporada. Intenta nuevamente.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const buscarAnime = async (consulta) => {
    if (!consulta.trim()) return;

    setCargando(true);
    setError(null);
    setTipoVista('busqueda');

    try {
      const resultados = await animeApi.buscarAnime(consulta);
      setAnimes(resultados);
      
      localStorageUtil.guardarBusqueda(consulta, resultados);
      
      const busquedasActualizadas = localStorageUtil.obtenerBusquedas();
      setBusquedasGuardadas(busquedasActualizadas);
      
    } catch (err) {
      setError('Error al buscar anime. Intenta nuevamente.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const toggleFavorito = (anime) => {
    const esFavorito = favoritos.some(fav => fav.mal_id === anime.mal_id);
    
    if (esFavorito) {
      localStorageUtil.eliminarFavorito(anime.mal_id);
    } else {
      localStorageUtil.guardarFavorito(anime);
    }
    
    const favoritosActualizados = localStorageUtil.obtenerFavoritos();
    setFavoritos(favoritosActualizados);
  };

  const esFavorito = (animeId) => {
    return favoritos.some(fav => fav.mal_id === animeId);
  };

  const cargarBusquedaAnterior = (busqueda) => {
    setAnimes(busqueda.resultados);
    setTipoVista('busqueda');
  };

  return {
    animes, cargando, error, busquedasGuardadas, favoritos, tipoVista, buscarAnime, toggleFavorito, esFavorito, cargarBusquedaAnterior, cargarAnimesPopulares, cargarAnimesTemporada
  };
};