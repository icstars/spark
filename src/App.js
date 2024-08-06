import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import NavMenu from './Components/NavMenu';
import RightPanel from './Components/RightPanel';
import DepMetrics from './Components/DepMetrics';

function App() {
  return (
    <Router>
      <Header />
      <NavMenu />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/DepMetrics" element={<DepMetrics />} />
          </Routes>
        </main>
        <RightPanel />
      <Footer />
    </Router>
  );
}

export default App;
