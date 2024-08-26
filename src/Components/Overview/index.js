import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useParams } from "react-router-dom";

function Overview() {
    const {id} = useParams();
    return (<>
        <Helmet>Overview</Helmet>
        
    </>);
}

export default Overview;