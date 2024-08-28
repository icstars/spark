import React from 'react';
import { Helmet } from 'react-helmet';
import LineChart from '../Charts/LineChart';
import Overview from '../Overview';

const topics = [
    { name: "Collaboration", score: 2 },
    { name: "Conflict Resolution", score: 1 },
    { name: "Task Management", score: 4 },
    { name: "Delegration", score: 1 }
  ];
  
  const categories = [
    { name: "Teamwork", topics },
    { name: "Code Aesthetics", topics },
    { name: "Communication", topics }
  ];

function DepMetrics() {
    return (
        <div>
            <Helmet>
                <title>Department Dashboard</title>
            </Helmet>
            <div>
                <h2>Department</h2>
                <LineChart/>
            </div>
            <Overview categories={categories} />
        </div>

    );
}


export default DepMetrics;
