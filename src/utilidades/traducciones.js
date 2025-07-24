export const traducirEstadoAnime = (estado) => {
  if (!estado) return 'Sin estado';
  
  const traducciones = {
    'Finished Airing': 'Finalizado', 'finished airing': 'Finalizado',
    'Currently Airing': 'En emisión', 'currently airing': 'En emisión',
    'Not yet aired': 'Próximamente', 'not yet aired': 'Próximamente',
    'Cancelled': 'Cancelado', 'cancelled': 'Cancelado',
    'Hiatus': 'En pausa', 'hiatus': 'En pausa',
    'Complete': 'Completo',
    'Ongoing': 'En curso',
    'Upcoming': 'Próximamente',
    'Discontinued': 'Descontinuado',
    'On Hold': 'En espera'
  };

  return traducciones[estado] || estado;
};

export const obtenerClaseEstado = (estado) => {
  if (!estado) return 'sin-estado';
  
  const estadoLower = estado.toLowerCase();
  
  if (estadoLower.includes('finished') || estadoLower.includes('complete')) {
    return 'finalizado';
  }
  if (estadoLower.includes('airing') || estadoLower.includes('ongoing')) {
    return 'en-emision';
  }
  if (estadoLower.includes('upcoming') || estadoLower.includes('not yet')) {
    return 'proximamente';
  }
  if (estadoLower.includes('cancelled') || estadoLower.includes('discontinued')) {
    return 'cancelado';
  }
  if (estadoLower.includes('hiatus') || estadoLower.includes('hold')) {
    return 'en-pausa';
  }
  
  return 'otro-estado';
};

export const traducirGenero = (genero) => {
  if (!genero) return genero;
  
  const traducciones = {
    'Action': 'Acción',
    'Adventure': 'Aventura',
    'Comedy': 'Comedia',
    'Drama': 'Drama',
    'Fantasy': 'Fantasía',
    'Horror': 'Terror',
    'Romance': 'Romance',
    'Sci-Fi': 'Ciencia Ficción',
    'Slice of Life': 'Vida Cotidiana',
    'Sports': 'Deportes',
    'Supernatural': 'Sobrenatural',
    'Thriller': 'Suspense',
    'Mystery': 'Misterio',
    'Psychological': 'Psicológico',
    'Historical': 'Histórico',
    'Military': 'Militar',
    'Mecha': 'Mecha',
    'Magic': 'Magia',
    'School': 'Escolar',
    'Shounen': 'Shounen',
    'Shoujo': 'Shoujo',
    'Seinen': 'Seinen',
    'Suspense': 'Suspenso',
    'Josei': 'Josei',
    'Isekai': 'Isekai',
    'Harem': 'Harem',
    'Ecchi': 'Ecchi',
    'Yuri': 'Yuri',
    'Yaoi': 'Yaoi',
    'Vampire': 'Vampiros',
    'Demons': 'Demonios',
    'Super Power': 'Súper Poderes',
    'Martial Arts': 'Artes Marciales',
    'Game': 'Videojuegos',
    'Parody': 'Parodia',
    'Music': 'Musical',
    'Kids': 'Infantil'
  };
  
  return traducciones[genero] || genero;
};

export const traducirTipoAnime = (tipo) => {
  if (!tipo) return tipo;
  
  const traducciones = {
    'TV': 'Serie TV',
    'Movie': 'Película',
    'OVA': 'OVA (Animación Original en Video)',
    'ONA': 'ONA (Animación Original en Red)',
    'Special': 'Especial',
    'Music': 'Video Musical',
    'PV': 'Video Promocional',
    'CM': 'Comercial'
  };
  
  return traducciones[tipo] || tipo;
};

export const traducirGeneros = (generos) => {
  if (!generos || !Array.isArray(generos)) return [];
  
  return generos.map(genero => {
    if (typeof genero === 'object' && genero.name) {
      return {
        ...genero,
        name: traducirGenero(genero.name)
      };
    }
    return traducirGenero(genero);
  });
};

export const formatearDuracion = (duracion) => {
  if (!duracion) return 'No especificada';
  
  const traducciones = {
    'sec': 'seg', 'second': 'segundo', 'seconds': 'segundos',    
    'min': 'min', 'minute': 'minuto', 'minutes': 'minutos',
    'hr': 'h', 'hour': 'hora', 'hours': 'horas',
    'Unknown': 'Desconocida',
    'per ep': 'por ep'
  };
  
  let duracionTraducida = duracion;
  
  Object.keys(traducciones).forEach(palabra => {
    const regex = new RegExp(`\\b${palabra}\\b`, 'gi');
    duracionTraducida = duracionTraducida.replace(regex, traducciones[palabra]);
  });
  
  return duracionTraducida;
};