import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Sesion from './pages/Sesion';
import NotFoundPage from './pages/NotFoundPage';
import { useContext } from 'react';
import UserContext from './contexts/userContext';

function App() {
  const {sesion} = useContext(UserContext);
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={sesion ? <Sesion /> : <Navigate to="/login" />} />
            <Route path='/login' element={!sesion ? <Login /> : <Navigate to="/" />} />
            <Route path='/register' element={!sesion ? <Register /> : <Navigate to="/" />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
