import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/"  element={<Login/>} > </Route>
      <Route path="/register"  element={<Register/>}> </Route>
      <Route path="/home"  element={<Home/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
