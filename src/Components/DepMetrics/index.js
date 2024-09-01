import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import DepMetricsOverview from '../DepMetricsOverview';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import '../Home/Home.css';
import PageDepDashboard from '../RightPanel/PageDepDashboard';

function DepMetrics() {
  const id = localStorage.getItem('userId');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [managerId, setManagerId] = useState(null);
  const [scores, setScores] = useState(new Array(22).fill(0));
  const [userScoresByTopic, setUserScoresByTopic] = useState({});

  useEffect(() => {
    if (!id) {
      setError('Manager ID is not provided');
      return;
    }

    axios.get(`http://localhost:5212/manager-user-scores/${id}`)
    .then(response => {
      const userScores = response.data;
      
      // Если `userScores` — массив
      setUserScoresByTopic(userScores || []);
    })
    .catch(error => {
      setError('Failed to get manager scores data');
    });

    axios.get(`http://localhost:5212/department-scores/${id}`)
      .then(response => {
        const { categories, managerId } = response.data;
        setCategories(categories || []);
        setManagerId(managerId);

        const extractedScores = new Array(22).fill(0);
        categories.forEach(category => {
          category.topics.forEach(topic => {
            const topicIndex = topic.topic_id - 1;
            extractedScores[topicIndex] = topic.average_score;
          });
        });

        setScores(extractedScores);
      })
      .catch(error => {
        setError('Failed to get manager scores data');
      });
  }, [id]);

  return (
    <div className="container">
      <Helmet> <title>DepMetrics</title></Helmet>

      <div className="row">
        {/* Left Section: Main Content */}
        <div className="col-10">
          <h1>Team's Dashboard</h1>
          {managerId ? (
            <>
              <LineChart scores={scores} /> {/* Pass scores as a prop */}
              <BarChart categories={categories} />
              <DepMetricsOverview categories={categories} userScoresByTopic={userScoresByTopic} />

            </>
          ) : (
            <p>Loading...</p>
          )}
          {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="col-2 custom-margin">
          <PageDepDashboard categories={categories} userScoresByTopic={userScoresByTopic}/>
        </div>
      </div>
    </div>
  );
}

export default DepMetrics;
