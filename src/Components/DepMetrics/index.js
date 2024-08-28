import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// import { useParams } from "react-router-dom";
import axios from 'axios';
import PageHome from '../RightPanel/PageHome';
import DepMetricsOverview from '../DepMetricsOverview';
import LineChart from '../Charts/LineChart';

function DepMetrics() {
const id = localStorage.getItem('userId');
console.log(id);
//   const { id } = useParams(); // This should be the managerId
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [managerId, setManagerId] = useState(null);
  const [scores, setScores] = useState(new Array(22).fill(0)); // Initialize an array of 22 zeros

  useEffect(() => {
    if (!id) {
      setError('Manager ID is not provided in the URL');
      return;
    }

    axios.get(`http://localhost:5212/manager-scores/${id}`)
      .then(response => {
        const { categories, managerId } = response.data;
        console.log('API response:', response.data);
        setCategories(categories || []); // Make sure categories is set properly
        setManagerId(managerId); // Store manager ID

        // Extract scores from categories and topics
        const extractedScores = new Array(22).fill(0); // Initialize an array of 22 zeros

        categories.forEach(category => {
          category.topics.forEach(topic => {
            const topicIndex = topic.topic_id - 1; // Adjust for zero-based index
            extractedScores[topicIndex] = topic.average_score; // Using average_score now
          });
        });

        setScores(extractedScores); // Set the extracted scores into state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to get manager scores data');
      });
  }, [id]);

  return (
    <div className="home">
      <Helmet>Manager Scores</Helmet>
      <PageHome managerId={id} />
      {managerId ? (
        <div>
          <h1>Manager ID: {managerId}</h1>
          <LineChart scores={scores}/> {/* Pass scores as a prop */}
          <DepMetricsOverview categories={categories} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default DepMetrics;
