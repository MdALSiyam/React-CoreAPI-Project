import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./layers/Nav";
import Footer from "./layers/Footer";
import Home from "./components/Home";
import List from "./components/List";
import Create from "./components/Create";
import Edit from "./components/Edit";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="container-fluid container">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/list/add" element={<Create />} />
            <Route path="list/edit/:id" element={<Edit />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
