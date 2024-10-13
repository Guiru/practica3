import { useState } from 'react'
import data from './peliculas.json';

export default function Peliculas({categoria}){
  
    //Me quedo solo con las películas de la categoría que venga como parámetro
    const peliculasAccion = data.filter(pelicula => pelicula.Categoria.match(categoria));
  
    //Estado que controla la visibilidad de cada película por su ID
    const [muestraMas, setMuestraMas] = useState({});
  
    //Función para cambiar el estado de visibilidad para una pelicula particular
    const cambioBoton = (id) => {
      setMuestraMas(prevState => ({
        ...prevState,
        [id]: !prevState[id],
      })); //Cambia el valor de isVisible al contrario
    };
  
    return(
      <div class="contenedor">
      {peliculasAccion.map((peliculas) => (
        <div key={peliculas.ID} class="pelicula">
          <h3>{peliculas.Nombre}</h3>
          
  
          {muestraMas[peliculas.ID] && (<div key ={peliculas.ID} class="informacion">
            <div class="director">
              Director: {peliculas.Director}
            </div>
            <div class="año">
              Año: {peliculas['Año de publicación']}
            </div>
            </div>)}
          {/* Renderiza el botón adecuado basado en el estado de visibilidad de la película */}
          {muestraMas[peliculas.ID] ? (
              <button className="boton-menos" onClick={() => cambioBoton(peliculas.ID)}>
                Menos información
              </button>
            ) : (
              <button className="boton-mas" onClick={() => cambioBoton(peliculas.ID)}>
                Más información
              </button>
            )}
          
          
        </div>
      ))}
    </div>
    );
  }