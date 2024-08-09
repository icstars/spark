import React from 'react';
import LineChart from '../Charts/LineChart';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (

    <div className="home">
        <Helmet>
          <title>Home</title>
        </Helmet>
      <h1>Dashboard</h1>
      <div className="block">
        {/* exporting chart from LineChart as an element*/}
        <LineChart />
      </div>
    </div>
  );
}

export default Home;
