import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import axios from 'axios';
import PageHome from '../RightPanel/PageHome';
import Overview from '../Overview';
import LineChart from '../Charts/LineChart';

function Home() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState(new Array(22).fill(0)); // Initialize an array of 22 zeros

  useEffect(() => {
    if (!id) {
      setError('User ID is not provided in the URL');
      return;
    }

    axios.get(`http://localhost:5212/rating/${id}`)
      .then(response => {
        const { categories, user_id, created } = response.data;
        console.log('API response:', response.data);
        setCategories(categories || []); // Make sure categories is set properly
        setUser({ user_id, created }); // Store user info

        // Extract scores from categories and topics
        const extractedScores = new Array(22).fill(0); // Initialize an array of 22 zeros

        categories.forEach(category => {
          category.topics.forEach(topic => {
            const topicIndex = topic.id - 1; // Adjust for zero-based index
            extractedScores[topicIndex] = topic.score;
          });
        });

        setScores(extractedScores); // Set the extracted scores into state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to get evaluation data');
      });
  }, [id]);

  return (
    <div className="home">
      <Helmet>Home</Helmet>
      <PageHome userId={id} />
      {user ? (
        <div>
          <h1>Welcome, User {user.user_id}</h1>
          <p>Evaluation created on: {new Date(user.created).toLocaleDateString()}</p>
          <LineChart scores={scores}/> {/* Pass scores as a prop */}
          <Overview categories={categories} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;
