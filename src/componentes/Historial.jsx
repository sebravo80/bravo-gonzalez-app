const Historial = ({ busquedasGuardadas, onCargarBusqueda }) => {
  return (
    <div className="historial-container">
      <h2>Historial de Búsqueda 📋</h2>
      
      {busquedasGuardadas.length === 0 ? (
        <div className="no-historial">
          <div className="no-historial-content">
            <h3>Aún no hay búsquedas registradas</h3>
            <p>Las busquedas quedarán guardadas aquí</p>
          </div>
        </div>
      ) : (
        <div className="historial-lista">
          {busquedasGuardadas.map((busqueda) => (
            <div key={busqueda.id} className="historial-item">
              <div className="historial-info">
                <h4>"{busqueda.termino}"</h4>
                <p>
                  📅 {new Date(busqueda.fecha).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="resultados-count">
                  {busqueda.resultados.length} resultados encontrados
                </p>
              </div>
              <button 
                className="btn-cargar-busqueda"
                onClick={() => onCargarBusqueda(busqueda)}
                title={`Cargar búsqueda: ${busqueda.termino}`}
              >
                🔄 Cargar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Historial;