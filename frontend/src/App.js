import {Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoomPage from './pages/RoomPage';

function App() {
  return (

    <>
      <Routes>
        <Route element={<HomePage/>} path='/' />
        <Route element={<LoginPage/>} path='/login' />
        <Route element={<RegisterPage/>} path='/register' />
        <Route element={<RoomPage/>} path='/room'/>
      </Routes>
    </>
    
  );
}

export default App;
