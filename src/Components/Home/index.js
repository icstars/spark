import React from 'react';
import LineChart from '../Charts/LineChart';

function Home() {
  return (

    <div className="home">
      <h1>Dashboard</h1>
      <div className="block">
        {/* exporting chart from LineChart as an element*/}
        <LineChart />
      </div>
    </div>
  );
}

export default Home;
