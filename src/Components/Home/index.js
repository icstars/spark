import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import axios from 'axios';
import PageHome from '../RightPanel/PageHome';
import Overview from '../Overview';
import LineChart from '../Charts/LineChart';
import './style.css';

function Home() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]); // Default to an empty array
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('User ID is not provided in the URL');
      return;
    }

    axios.get(`http://localhost:5212/rating/${id}`)
      .then(response => {
        const { categories, user_id, created } = response.data;
        console.log('API response:', response.data); // Log data for checking
        setCategories(categories || []); // Ensure categories are set in state
        setUser({ user_id, created }); // Save only necessary user data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to get evaluation data');
      });
  }, [id]);

  console.log('Categories data:', categories);
  return (
    <div className="home">
      <Helmet>Home</Helmet>
      <PageHome userId={id} />
      {user ? (
        <div>
          <h1>Welcome, User {user.user_id}</h1>
          <p>Evaluation created on: {new Date(user.created).toLocaleDateString()}</p>
          <div className='chart'>
            <LineChart />
          </div>
          <Overview categories={categories} />
        </div>
      ) : (
        <p>Evaluation wasn't applied</p>
      )}
    </div>
  );
}

export default Home;
