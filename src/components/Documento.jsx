import React, { useContext } from 'react';
import UserContext from '../contexts/userContext';

export default function Documento({idI, numero, result, fecha}) {
  const { eliminarNum } = useContext(UserContext);
  const fechaN = fecha.substring(0,10);
  const horaN = fecha.substring(11,19);
  const eliminarOne = () => {
    eliminarNum(idI);
  }
  return (
    <tr >
      <td className='gridD'>{numero}</td>
      <td className='gridD'>{result}</td>
      <td className='gridD'>{`${fechaN}   |||   ${horaN}`}</td>
      <td className='gridD'><button className='btn-n btn-d' onClick={eliminarOne}>Eliminar</button></td>
    </tr>
  )
}
