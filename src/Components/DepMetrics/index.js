import React from 'react';
import { Helmet } from 'react-helmet';
import LineChart from '../Charts/LineChart';

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
        </div>

    );
}


export default DepMetrics;
