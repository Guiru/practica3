import { useState, useEffect } from 'react';

export default function Peliculas({ categoria }) {  // Recibimos la categoría como argumento

  const [data, setPeliculas] = useState(null);

  // Hacer la petición GET al montar el componente
  useEffect(() => {
    fetch('http://localhost:8000/peliculas') 
      .then(response => response.json())
      .then(data => {
        // Verificar si los datos recibidos son un array
        if (Array.isArray(data)) {
          setPeliculas(data);
        } else {
          console.error('Los datos recibidos no son un array:', data);
          setPeliculas([]);  // Seteamos a un array vacío en caso de error
        }
      })
      .catch(error => console.error('Error al hacer el GET:', error));
  }, []);  

  // Estado que controla la visibilidad de cada película por su ID
  const [muestraMas, setMuestraMas] = useState({}); //useState me da dos cosas, muestraMas que es el estado actual, y setMuestraMas es la funcion que se usa para actualizar el estado.

  // Función para cambiar el estado de visibilidad para una película particular
  const cambioBoton = (id) => { //Espera como parámetro un id, el de la película
    setMuestraMas(prevState => ({ //La función setMuestraMas usa el estado previo(visible/oculto).
      ...prevState, //Esta línea copia todo el contenido del estado anterior (lo que hay en prevState) al nuevo estado
      [id]: !prevState[id], //Se invierte el valor de visibilidad del elemento con el id que se haya pasado al pulsar el botón
    }));
  };

 
  // Filtrar las películas por categoría
  const peliculasFiltradas = data?.filter(pelicula => pelicula.Categoria === categoria);

  return (
    <div className="contenedor">
      {/* Verificar explícitamente que los datos no sean nulos y que sean un array */}
      {peliculasFiltradas && peliculasFiltradas.length > 0 ? ( //Así se hace un if-else {condicion ? (acciones si se cumple):(acciones si no se cumple)}
        peliculasFiltradas.map((peliculas) => (
          <div key={peliculas.ID} className="pelicula">
            <h3>{peliculas.Nombre}</h3>

            {muestraMas[peliculas.ID] && (
              <div className="informacion">
                <div className="director">Director: {peliculas.Director}</div>
                <div className="año">Año: {peliculas['Año de publicación']}</div>
              </div>
            )}

            {/* Renderiza el botón adecuado basado en el estado de visibilidad de la película */}
            {muestraMas[peliculas.ID] ? (
              <button
                className="boton-menos"
                onClick={() => cambioBoton(peliculas.ID)}
              >
                Menos información
              </button>
            ) : (
              <button
                className="boton-mas"
                onClick={() => cambioBoton(peliculas.ID)}
              >
                Más información
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No hay películas disponibles para esta categoría o estoy cargando datos...</p>  // Mostrar mensaje mientras los datos se cargan
      )}
    </div>
  );
}
