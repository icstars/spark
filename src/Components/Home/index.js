import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import PageHome from '../RightPanel/PageHome';
import Overview from '../Overview';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import profile_icon from '../People/img/profile.png'
import EditUser from '../EditUser';

function Home() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState(new Array(22).fill(0)); // Initialize an array of 22 zeros
  const [isEvaluationExists, setIsEvaluationExists] = useState(false); // Track if evaluation exists
  const [isLoading, setIsLoading] = useState(true)
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

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state if the check isn't done yet
  }

  return (
    <div className="home">
      <Helmet> <title>Home</title></Helmet>
      <div><Link to={`/EditUser/${user ? user.user_id : id}`} className='col-12 py-1 btn btn-dark'>
        Edit User
      </Link></div>
      <PageHome userId={id} isEvaluationExists={isEvaluationExists} />
      {user ? (
        <div>
          <h1>Welcome, User {user.user_id}</h1>
          <div>{user.img ? (

            <img className='img'
              src={`http://localhost:5212/images/${user.user_id}`} // Fetch the image from your backend
              alt={`${user.firstname} ${user.lastname}`}
              style={{ width: '45px', height: '45px', borderRadius: '50%' }}
            />
          ) : (
            <img className='img'
              src={profile_icon} // Fallback image
              alt="Default Avatar"
              style={{ width: '45px', height: '45px', borderRadius: '50%' }}
            />
          )}</div>
          <p>Evaluation created on: {new Date(user.created).toLocaleDateString()}</p>
          <LineChart scores={scores} /> {/* Pass scores as a prop */}
          <BarChart categories={categories} />
          <Overview categories={categories} />

        </div>
      ) : (
        <p>Data in not available right now</p>
      )}
    </div>
  );
}

export default Home;
