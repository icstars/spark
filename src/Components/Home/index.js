import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import axios from 'axios';
import PageHome from '../RightPanel/PageHome';
import Overview from '../Overview';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import ProfileInfo from '../ProfileInfo';
import profile_icon from '../People/img/profile.png';
import './Home.css'; // Import your custom CSS file for additional styling

function Home() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState(new Array(22).fill(0)); // Initialize an array of 22 zeros
  const [isEvaluationExists, setIsEvaluationExists] = useState(false); // Track if evaluation exists
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError('User ID is not provided in the URL');
      return;
    }

    // Check if the evaluation exists
    axios.get(`http://localhost:5212/evaluate/user/${id}`)
      .then(response => {
        if (response.data) {
          setIsEvaluationExists(true); // Evaluation exists
        }
      })
      .catch(error => {
        console.error('Error checking evaluation existence:', error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false once check is done
      });

    // Fetch evaluation data and user info
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
    <>
      <Helmet> <title>Home</title></Helmet>

      <div className='container'>
        <div className="row">
          {/* Left Section: Takes up 85% */}
          <div className="col-10">
            <h1>Dashboard</h1>
            <ProfileInfo 
              userId={id} 
              altText={user ? `${user.firstname} ${user.lastname}` : (
                <img
                  src={profile_icon} // Fallback image
                  alt="Default Avatar"
                  style={{ width: '45px', height: '45px', borderRadius: '50%' }}
                />
              )} 
            />

            {user ? (
              <>
                <p>Evaluation created on: {new Date(user.created).toLocaleDateString()}</p>
                <LineChart scores={scores} /> {/* Pass scores as a prop */}
                <BarChart categories={categories} />
                <Overview categories={categories} />
              </>
            ) : (
              <p>Data is not available right now</p>
            )}
          </div>

          {/* Right Section: Takes up 15% */}
          <div className="col-2">
            <PageHome user={user} userId={id} isEvaluationExists={isEvaluationExists} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
