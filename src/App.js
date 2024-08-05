import React from 'react';
// import { FormDataProvider } from './contexts/FormDataContext';
// import Form from './components/Form';
// import ResumeMarkup from './components/ResumeMarkup';
import Home from './Components/Home'
import Header from './Components/Header';
import Footer from './Components/Footer';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";


function App() {
  return (
    <Router>
      
      <Header />
      {/* <NavMenu /> */}
      <Route path="/" element={<Home />} />
      {/* <People /> */}
      <Footer />
    </Router>
  );
}

export default App;
