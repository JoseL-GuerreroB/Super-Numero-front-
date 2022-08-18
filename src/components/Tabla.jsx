import React from 'react';
import { useContext } from 'react';
import UserContext from '../contexts/userContext';
import Documento from './Documento';

export default function Tabla({datos}) {
  const {cargando} = useContext(UserContext);
  return (
    <div>
      <table id='tabla'>
        <thead>
          <tr>
            <th className='headT'>Numero</th>
            <th className='headT'>Super Numero</th>
            <th className='headT'>Fecha de creación</th>
            <th className='headT'>Operacion</th>
          </tr>
        </thead>
        <tbody>
          {!cargando && datos.length > 0 &&
            datos.map(supNum => <Documento key={supNum._id} numero={supNum.numInit} result={supNum.superNum} fecha={supNum.created} idI={supNum._id}/>)
          }
        </tbody>
      </table>
      {!cargando && datos.length === 0 && <h4>No hay elementos para mostrar</h4>}
    </div>
  )
}
