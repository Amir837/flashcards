import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Test from './Test';
import JSTest from './JSTest';

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path = "/flashcards" element = { <App /> } />
        <Route path = "/JSTest" element = { <JSTest /> } />
        <Route path = "/Test" element = { <Test /> } />
      </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);