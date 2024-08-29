import React, { useState, useRef, useEffect } from 'react';

// Topic and Category Name Maps
const categoryNameMap = {
    1: "Teamwork",
    2: "Code Aesthetics",
    3: "Communication",
    4: "Best Practices",
    5: "Knowledge Application and Problem Solving Comments"
};

const topicNameMap = {
    1: "Collaboration",
    2: "Conflict Resolution",
    3: "Task Manager",
    4: "Adapting to Change",
    5: "Mentoring",
    6: "Documentation",
    7: "Formatting Standards",
    8: "Naming",
    9: "Syntax and Organization",
    10: "Engagement",
    11: "Verbal Communication",
    12: "Written Communication",
    13: "Providing Feedback",
    14: "Receiving Feedback",
    15: "Testing",
    16: "Refactoring/Readability",
    17: "Defensive Programming",
    18: "Performance",
    19: "Security",
    20: "Strategy and Critical Thinking Comments",
    21: "Debugging Techniques",
    22: "Tool Selection and Usage"
};

// Link Topics to Categories
const categoryTopicMap = {
    1: [1, 2, 3, 4, 5], // Teamwork topics
    2: [6, 7, 8, 9, 10], // Code Aesthetics topics
    3: [11, 12, 13], // Communication topics
    4: [14, 15, 16, 17], // Best Practices topics
    5: [18, 19, 20, 21, 22] // Knowledge Application and Problem Solving Comments topics
};

// Component to display individual topic scores
function TopicScore({ topicId, score, userScores }) {
    const topicName = topicNameMap[topicId] || `Topic ${topicId}`;
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    // Close the dropdown when clicking outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    // Close the dropdown when the mouse leaves
    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    useEffect(() => {
        // Add event listener to handle click outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="row position-relative">
            <p
                className="col-auto text-secondary"
                onClick={toggleDropdown}
                style={{ cursor: 'pointer' }}
            >
                {topicName}
            </p>
            <p className="col text-end fw-bold">{score}</p>

            {isDropdownVisible && (
                <div
                    ref={dropdownRef}
                    className="dropdown-menu show"
                    style={{
                        position: 'absolute',
                        left: '20%',          // Positioning the dropdown to the right
                        top: '50%',            // Center vertically relative to the trigger
                        transform: 'translate(5px, -50%)', // 5px to the right and centered vertically
                        zIndex: 1000,
                        width: '150px',
                    }}
                    onMouseLeave={handleMouseLeave}
                >
                    {userScores.length > 0 ? (
                        userScores.map((userScore, index) => (
                            <div key={index} className="dropdown-item">
                                {userScore.userName} {userScore.userLastName}: {userScore.score}
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-item">No scores available</div>
                    )}
                </div>
            )}
        </div>
    );
}
// Component to display a category and its topics
function CategoryOverview({ categoryId, topics = [], totalScore, userScoresByTopic }) {
    const categoryName = categoryNameMap[categoryId] || `Category ${categoryId}`;
    const categoryTopics = categoryTopicMap[categoryId] || [];

    return (
        <div className="col-6 flex-column justify-content-start text-start">
            <div className="row border-bottom">
                <p className="h5 col-auto pb-1">{categoryName}</p>
                <p className="h5 col text-end">{totalScore}</p>
            </div>
            <div>
                {categoryTopics.map((topicId, index) => {
                    const topic = topics.find(t => t.topic_id === topicId);
                    const userScores = userScoresByTopic[topicId] || []; // Получаем оценки пользователей для этой темы
                    if (topic) {
                        return <TopicScore key={index} topicId={topic.topic_id} score={topic.average_score} userScores={userScores} />;
                    }
                    return <TopicScore key={index} topicId={topicId} score={0} userScores={userScores} />; // Placeholder для отсутствующих тем
                })}
            </div>
        </div>
    );
}


// Main Overview component to render all categories
export default function DepMetricsOverview({ categories = [], userScoresByTopic = {} }) { // Добавляем userScoresByTopic как пропс
    return (
        <div className="row gx-5 gy-3">
            {categories.map(category => (
                <CategoryOverview
                    key={category.category_id} // Используем category_id из ответа API
                    categoryId={category.category_id} // Передаем category_id
                    topics={category.topics || []} // Передаем массив тем
                    totalScore={category.total_score || 0} // Передаем общий балл
                    userScoresByTopic={userScoresByTopic} // Передаем оценки пользователей по темам
                />
            ))}
        </div>
    );
}