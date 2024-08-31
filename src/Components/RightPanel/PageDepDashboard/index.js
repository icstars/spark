import React from 'react';
import '../right-panel-style.css';

const categoryNameMap = {
    1: "Teamwork",
    2: "Code Aesthetics",
    3: "Communication",
    4: "Best Practices",
    5: "Knowledge Application and Problem Solving Comments"
};

// Function to truncate the category name to 13 characters
const truncateName = (name, length = 15 ) => {
    return name.length > length ? name.substring(0, length) + '...' : name;
};

// Компонент для отображения списка тем в категории
function CategoryOverview({ categoryId, totalScore }) {
    const categoryName = truncateName(categoryNameMap[categoryId] || `Category ${categoryId}`);

    return (
        <li className="topic-item">
            {/* Список тем */}
            <span className="topic-name">{categoryName}</span>
            <span className="topic-score"> {totalScore}</span>
        </li>
    );
}

// Основной компонент страницы, выводящий категории и темы
export default function PageDepDashboard({ categories = [] }) {
    return (
        <div className="page-dep-dashboard">
            <h6 className="category-title">Topic scores:</h6>
            <ul className="topic-list">
                {categories.map(category => (
                    <CategoryOverview
                        key={category.category_id}
                        categoryId={category.category_id}
                        totalScore={category.total_score || 0}
                    />
                ))}
            </ul>
        </div>
    );
}
