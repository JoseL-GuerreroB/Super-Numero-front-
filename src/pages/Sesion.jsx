import React, { useContext }  from 'react';
import { useState } from 'react';
import Tabla from '../components/Tabla';
import UserContext from '../contexts/userContext';
import './Sesion.css';

export default function Sesion() {
  const [num, setNum] = useState(0);
  const { res, cargando, nuevoNumero, setSesion, objRes, supNums, eliminarNums } = useContext(UserContext);
  const closeSesion = () => {
    localStorage.removeItem("localfile");
    setSesion(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    nuevoNumero(num);
  }
  const handleChange = (e) => {
    setNum({
      ...num,
      [e.target.name]: e.target.value
    })
  }
  const eliminarTodo = () => {
    eliminarNums();
  }
  return (
    <div id="content">
      <div id='head'>
        {!cargando && <h1>Buenos dias {objRes.email}</h1>}
        <button className='btn-n btn-d' onClick={closeSesion}>Cerrar Sesión</button>
      </div>
      <form id='form-num' onSubmit={handleSubmit}>
        <div>
          <input className='inpt-n' placeholder="Numero" type="number" name="numInit" onChange={handleChange} value={num.name}/>
          <input className='inpt-n' placeholder="Resultado" type="number" name="Resultado" value={res} disabled />
        </div>
        <input className='btn-n' type="submit" value="Calcular" />
      </form>
      {cargando ? <h2>Loading</h2> : <Tabla datos={supNums}/>}
      <button className='btn-n btn-d' onClick={eliminarTodo}>Borrar historial</button>
    </div>
  )
}
