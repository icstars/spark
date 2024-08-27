import React, { useEffect, useState } from 'react';
import LineChart from '../Charts/LineChart';
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import axios from 'axios';
import PageHome from '../RightPanel/PageHome';
import CategoryOverview from '../Overview';

const topics = [
  { name: "Collaboration", score: 2 },
  { name: "Conflict Resolution", score: 1 },
  { name: "Task Management", score: 4 },
  { name: "Delegration", score: 1 }
]

const categories = [
  { name: "Teamwork", topics },
  { name: "Code Aesthetics", topics },
  { name: "Communication", topics }
]

function Home() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');


  useEffect(() => {
    if (!id) {
      setError('User ID is not provided in the URL');
      return;
    }

    axios.get(`http://localhost:5212/users/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        setError('Failed to get user data');
        console.error(error);
      });
  }, [id]);
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="home">
      <Helmet>Home</Helmet>
      {user ? (
        <div>
          <h1>Welcome, {user.firstname} {user.lastname}</h1>
          <p>Role: {user.company_role}</p>
          <p>Department: {user.department?.name}</p>
          <p>Email: {user.email}</p>
          <LineChart />
          <PageHome userId={id} />
          <div className='row gx-5 gy-3'>
            {categories.map(category => <CategoryOverview name={category.name} topics={category.topics} />)}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;
