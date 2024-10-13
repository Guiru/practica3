import { useState } from 'react'
import data from './peliculas.json';
import Peliculas from './Peliculas';

function App() {

  return (
    <>
    <div></div>
<Peliculas categoria="Accion"/>
<Peliculas categoria="Drama"/>
<Peliculas categoria="Comedia"/>


    </>
  )
}

export default App
