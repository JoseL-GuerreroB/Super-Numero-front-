import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import './ReYLo.css';

export default function Register() {
  const { objRes, error, login } = useContext(UserContext);
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
    console.log(objRes);
    console.log(error)
  }
  return (
    <div className='content-form'>
      <h1>Inicia Sesión</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input className='inpt' placeholder='Escribe tu correo' name='email' type="email" onChange={handleChange} value={form.name} />
        <input className='inpt' placeholder='Escribe tu contraseña' name='password' type="password" onChange={handleChange} value={form.name} />
        <input className='btn-inpt' type="submit" />
      </form>
      <p>¿No tienes una cuenta? <NavLink className="link-p" to={"/register"}>Registrate aqui.</NavLink></p>
      
    </div>
  )
}