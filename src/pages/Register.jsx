import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import './ReYLo.css';

export default function Register() {
  const {objRes, error, registro} = useContext(UserContext);
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    registro(form);
    console.log(objRes);
    console.log(error)
  }
  return (
    <div className='content-form'>
      <h1>Registrate</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input className='inpt' placeholder='Escribe tu correo' name='email' type="email" onChange={handleChange} value={form.name} />
        <input className='inpt' placeholder='Escribe tu contraseña' name='password' type="password" onChange={handleChange} value={form.name} />
        <input className='inpt' placeholder='Repite tu contraseña' name='repassword' type="password" onChange={handleChange} value={form.name} />
        <input className='btn-inpt' type="submit" />
      </form>
      <p>¿Ya tienes una cuenta? <NavLink className="link-p" to={"/login"}>Inicia sesión aqui.</NavLink></p>      
    </div>
  )
}
