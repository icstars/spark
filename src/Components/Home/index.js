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
import './Home.css';

function Home() {
  const { id } = useParams(); // ID из URL
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState(new Array(22).fill(0)); // Инициализация массива из 22 нулей
  const [isEvaluationExists, setIsEvaluationExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTheSamePerson, setIsTheSamePerson] = useState(false); // Обратите внимание на изменение: используем правильный синтаксис для обновления состояния

  useEffect(() => {
    if (!id) {
      setError('User ID is not provided in the URL');
      return;
    }
    const userId = localStorage.getItem('userId');
    // Проверка существования оценки
    axios.get(`http://localhost:5212/evaluate/user/${id}`)
      .then(response => {
        if (response.data) {
          setIsEvaluationExists(true);
        }
      })
      .catch(error => {
        console.error('Error checking evaluation existence:', error);
      })
      .finally(() => {
        setIsLoading(false); // Устанавливаем загрузку в false после завершения проверки
      });

    // Получение данных об оценке и информации о пользователе
    axios.get(`http://localhost:5212/rating/${id}`)
      .then(response => {
        const { categories, user_id, created } = response.data;

        const isTheSame = user_id == userId; // Проверяем совпадение ID пользователя
        setIsTheSamePerson(isTheSame); // Правильно обновляем состояние

        console.log('API response:', response.data);
        setCategories(categories || []); // Убедитесь, что categories правильно установлено
        setUser({ user_id, created }); // Сохраняем информацию о пользователе

        // Извлечение оценок из категорий и тем
        const extractedScores = new Array(22).fill(0);
        categories.forEach(category => {
          category.topics.forEach(topic => {
            const topicIndex = topic.id - 1;
            extractedScores[topicIndex] = topic.score;
          });
        });
        setScores(extractedScores); // Устанавливаем извлеченные оценки в состояние
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
          {/* Левая секция: занимает 85% */}
          <div className="col-10">
            <h1>Dashboard</h1>
            {!isTheSamePerson && ( // Проверка перед рендерингом ProfileInfo
              <ProfileInfo
                userId={id}
                altText={user ? `${user.firstname} ${user.lastname}` : "Default Avatar"}
              />
            )}
            {user ? (
              <>
                <p>Evaluation created on: {new Date(user.created).toLocaleDateString()}</p>
                <LineChart scores={scores} /> {/* Передаем оценки как проп */}
                <BarChart categories={categories} />
                <Overview categories={categories} />
              </>
            ) : (
              <p>Data is not available right now</p>
            )}
          </div>

          {/* Правая секция: занимает 15% */}
          <div className="col-2 custom-margin">
            <PageHome user={user} userId={id} isEvaluationExists={isEvaluationExists} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
