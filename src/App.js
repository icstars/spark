import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import NavMenu from './Components/NavMenu';
import RightPanel from './Components/RightPanel';
import DepMetrics from './Components/DepMetrics';
import People from './Components/People';
import '/Users/ValeriiKharchenko/Documents/icstars/spark/src/css/style.css';
import Login from './Components/Login';
import LineChart from './Components/Charts/LineChart';

function App() {
  return (
    <Router>
      <Header />
      <div className="wrapper">
        <div className="nav-menu">
          <NavMenu />
        </div>
        <div className="container">
          <Routes>
            <Route path='/Charts/LineChart' element={<LineChart />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/" element={<Home />} />
            <Route path="/DepMetrics" element={<DepMetrics />} />
            <Route path="/People" element={<People />} />
          </Routes>
        </div>
        <div className="right-panel">
          <RightPanel />
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
