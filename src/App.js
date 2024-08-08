import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import NavMenu from './Components/NavMenu';
import PageHome from './Components/RightPanel/PageHome';
import PageDepDashboard from './Components/RightPanel/PageDepDashboard';
import DepMetrics from './Components/DepMetrics';
import People from './Components/People';
import '/Users/ValeriiKharchenko/Documents/icstars/spark/src/css/style.css';
import '/Users/ValeriiKharchenko/Documents/icstars/spark/src/css/reset.css';
import Login from './Components/Login';
import LineChart from './Components/Charts/LineChart';
import EvalOverlook from './Components/EvalOverlook';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const Layout = () => {
  const location = useLocation();

  const rightPanelComponents = {
    '/': <PageHome />,
    '/DepMetrics': <PageDepDashboard />
  };

  const notApplyPages = ['/People','/Login','/EvalOverlook'];

  const RightPanelComponent = rightPanelComponents[location.pathname] || <PageHome />;
  const displayRightPanel = !notApplyPages.includes(location.pathname);

  return (
    <>
      <div className="header">
        <Header />
        <Helmet>
          <title>Home</title>
        </Helmet>
      </div>
      <div className="wrapper">
        <div className="nav-menu">
          <NavMenu />
        </div>
        <div className={`container ${displayRightPanel ? '' : 'full-width'}`}>
          <Routes>
            <Route path='/Charts/LineChart' element={<LineChart />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/DepMetrics" element={<DepMetrics />} />
            <Route path="/People" element={<People />} />
            <Route path="/EvalOverlook" element={<EvalOverlook />} />
          </Routes>
        </div>
        {displayRightPanel && RightPanelComponent && (
          <div className="right-panel">
            {RightPanelComponent}
          </div>
        )}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
    <Router>
      <Layout />
    </Router>
    </HelmetProvider>
  );
}

export default App;