import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';


ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <h1>I am here</h1> } />
        <Route path = "/test" element = { <h1>Test</h1> } />
        <Route path = "/app" element = { <App /> } />
      </Routes>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);