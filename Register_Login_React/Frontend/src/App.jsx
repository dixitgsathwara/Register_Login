import React from 'react';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/"  element={<Login/>} > </Route>
      <Route path="/register"  element={<Register/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
