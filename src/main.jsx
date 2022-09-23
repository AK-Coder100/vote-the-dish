import React from 'react';
import ReactDOM from 'react-dom/client';
import './app.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Profile from './Profile';
import Login from './Login';
import Result from './Result';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} ></Route>
      <Route path='/profile' element={<Profile/>} ></Route>
      <Route path='/result' element={<Result/>} ></Route>
    </Routes>
    </BrowserRouter>
  </>
)