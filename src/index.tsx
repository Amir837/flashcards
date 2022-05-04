import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from './Board';
import App from './App';
import PGNp from './PGNp';


ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <App /> } />
        <Route path = "/Board" element = { <Board /> } />
        <Route path = "/PGNp" element = { <PGNp /> } />
        <Route path = "*" element = { <h1>404</h1> } />
      </Routes>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);