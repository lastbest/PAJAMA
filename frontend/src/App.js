import {Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (

    <>
      <Routes>
        <Route element={<HomePage/>} path='/' />
        <Route element={<LoginPage/>} path='/login' />
        <Route element={<RegisterPage/>} path='/register' />
      </Routes>
    </>
    
  );
}

export default App;
