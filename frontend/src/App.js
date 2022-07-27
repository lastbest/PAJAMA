import {Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoomPage from './pages/RoomPage';
import MyPage from './pages/MyPage';
import UpdateUserPage from './pages/UpdateUserPage';
import FeedPage from './pages/FeedPage';
import CreatePartyPage from './pages/CreatePartyPage';

function App() {
  return (

    <>
      <Routes>
        <Route element={<HomePage/>} path='/' />
        <Route element={<LoginPage/>} path='/login' />
        <Route element={<RegisterPage/>} path='/register' />
        <Route element={<RoomPage/>} path='/room'/>
        <Route element={<MyPage/>} path='/mypage'/>
        <Route element={<UpdateUserPage/>} path='/mypage/update'/>
        <Route element={<FeedPage/>} path='/mypage/feed'/>
        <Route element={<CreatePartyPage/>} path='/createparty'/>
      </Routes>
    </>
    
  );
}

export default App;
