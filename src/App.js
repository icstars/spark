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
import { HelmetProvider, Helmet } from 'react-helmet-async'; //import HelmetProvider due to last updates as Helmet outdated

// Layout component defines the structure of the page with Header, Footer, and dynamic content based on routes.
const Layout = () => {
  // useLocation hook gives the current route location, which can be used to determine the active route.
  const location = useLocation();

  // Object mapping routes to their corresponding RightPanel components.
  const rightPanelComponents = {
    '/': <PageHome />,
    '/DepMetrics': <PageDepDashboard />
  };

  // Array of routes where the RightPanel should not be displayed.
  const notApplyPages = ['/People', '/Login', '/EvalOverlook'];

  // Determine the RightPanel component to display based on the current route.
  // If no specific component is found, default to PageHome.
  const RightPanelComponent = rightPanelComponents[location.pathname] || <PageHome />;

  // Check if the current route is in the list of routes where RightPanel should not be displayed.
  const displayRightPanel = !notApplyPages.includes(location.pathname);

  return (
    <>
      {/* Header section */}
      <div className="header">
        <Header />
        {/* Helmet is used for managing the document head, like setting the page title dynamically */}
        <Helmet>
          <title>Home</title>
        </Helmet>
      </div>

      {/* Main wrapper for the content and navigation */}
      <div className="wrapper">
        {/* Navigation Menu */}
        <div className="nav-menu">
          <NavMenu />
        </div>

        {/* Main content area that changes based on the active route */}
        <div className={`container ${displayRightPanel ? '' : 'full-width'}`}>
          <Routes>
            {/* Define routes and their corresponding components */}
            <Route path='/Charts/LineChart' element={<LineChart />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/DepMetrics" element={<DepMetrics />} />
            <Route path="/People" element={<People />} />
            <Route path="/EvalOverlook" element={<EvalOverlook />} />
          </Routes>
        </div>

        {/* Conditionally render the RightPanel if it should be displayed */}
        {displayRightPanel && RightPanelComponent && (
          <div className="right-panel">
            {RightPanelComponent}
          </div>
        )}
      </div>

      {/* Footer section */}
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

// App component wraps everything with HelmetProvider for managing head elements
// Router for handling routing within the application.
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
