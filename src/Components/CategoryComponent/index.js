// Currently not in use ----------    //import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../EvalOverlook/eval-overlook-style.css';
// import { useParams } from "react-router-dom";
// import axios from 'axios';
// const CategoryComponent = ({ categories }) => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [selectedIndexes, setSelectedIndexes] = useState({});
//     const [comments, setComments] = useState({});
//     const handleBack = () => {
//         navigate(-1);
//     };

//     const [departmentId, setDepartmentId] = useState(null); // State for department ID
//     const [error, setError] = useState('');

//     useEffect(() => {
//         // Fetch the user's department ID from the backend
//         axios.get(`http://localhost:5212/users/${id}`)
//             .then(response => {
//                 if (response.data && response.data.department) {
//                     setDepartmentId(response.data.department.id); // Store department ID in state
//                 }
//             })
//             .catch(error => {
//                 setError('Failed to fetch user department');
//                 console.error(error);
//             });
//     }, [id]);

//     const handleClick = (topicId, optionIndex) => {
//         setSelectedIndexes(prevState => ({
//             ...prevState,
//             [topicId]: optionIndex
//         }));
//     };

//     const handleMouseEnter = (topicId, optionIndex) => {
//         setSelectedIndexes(prevState => ({
//             ...prevState,
//             [`hover-${topicId}`]: optionIndex
//         }));
//     };

//     const handleMouseLeave = (topicId) => {
//         setSelectedIndexes(prevState => ({
//             ...prevState,
//             [`hover-${topicId}`]: null
//         }));
//     };

//     const explanations = [
//         "Point",
//         "2 Points",
//         "3 Points",
//         "4 Points",
//         "5 Points"
//     ];

//     // Update comment state
//     const handleCommentChange = (e, parentId, type) => {
//         const updatedText = e.target.value;
//         setComments(prevState => ({
//             ...prevState,
//             [`${type}-${parentId}`]: updatedText
//         }));
//     };

//     // Function to gather all data and submit to backend
//     const handleSubmitForm = async () => {

//         const payload = {
//             userId: parseInt(id),
//             departmentId: departmentId, // Add department ID here
//             managerId: parseInt(localStorage.getItem('userId')),
//             selectedOptions: [],  // For storing selected options
//             topicComments: [],    // For storing topic comments
//             categoryComments: []  // For storing category comments
//         };

//         // Gather selected options
//         categories.forEach(category => {
//             category.topic.forEach(topic => {
//                 if (selectedIndexes[topic.id] !== undefined) {
//                     const selectedOptionId = topic.evaluationOptions[selectedIndexes[topic.id]].id;
//                     payload.selectedOptions.push({
//                         topicId: topic.id,
//                         optionId: selectedOptionId
//                     });
//                 }

//                 // Gather topic comments
//                 if (comments[`topic-${topic.id}`]) {
//                     payload.topicComments.push({
//                         topicId: topic.id,
//                         comment: comments[`topic-${topic.id}`]
//                     });
//                 }
//             });

//             // Gather category comments
//             if (comments[`category-${category.id}`]) {
//                 payload.categoryComments.push({
//                     categoryId: category.id,
//                     comment: comments[`category-${category.id}`]
//                 });
//             }
//         });
//         console.log("Отправляемые данные:", JSON.stringify(payload, null, 2));
//         // Send data to the backend
//         try {
//             const response = await fetch('http://localhost:5212/evaluate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to submit evaluation form');
//             }

//             console.log('Form submitted successfully');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div>

//             {categories.map(category => (
//                 <div className='cat-wrapper' key={category.id}>
//                     <div className='h1-evaluation-container'>
//                         <h1 className='h1-evaluation-title'>{category.name}</h1>
//                         <hr className='hr-element'></hr>
//                     </div>
//                     {category.topic.map(topic => (
//                         <div className='option-wrapper' key={topic.id}>
//                             <h2 className='h2-evaluatoin-title'>{topic.name}</h2>
//                             <div className="title-wrapper">
//                                 {topic.evaluationOptions && topic.evaluationOptions.length > 0 ? (
//                                     topic.evaluationOptions
//                                         .sort((a, b) => a.score - b.score)
//                                         .map((option, optionIndex) => (
//                                             <div key={option.id}>
//                                                 <div
//                                                     className={`wrapper-element ${selectedIndexes[topic.id] === optionIndex ? 'selected' : ''}`}
//                                                     onClick={() => handleClick(topic.id, optionIndex)}
//                                                     onMouseEnter={() => handleMouseEnter(topic.id, optionIndex)}
//                                                     onMouseLeave={() => handleMouseLeave(topic.id)}
//                                                 >

//                                                     {(selectedIndexes[`hover-${topic.id}`] === optionIndex || selectedIndexes[topic.id] === optionIndex) && (

//                                                         <p className="hover-explanation">{explanations[optionIndex]}</p>
//                                                     )}
//                                                     <p className="option">{option.text}</p>
//                                                 </div>
//                                             </div>
//                                         ))
//                                 ) : (
//                                     <p>No Evaluation Options available.</p>
//                                 )}
//                             </div>
//                             <div>
//                                 <p className="comment-title">Comment about Topic:</p>
//                                 <textarea
//                                     className="comment-topic"
//                                     value={comments[`topic-${topic.id}`] || ''}
//                                     onChange={(e) => handleCommentChange(e, topic.id, 'topic')}
//                                     placeholder="Type your comment..."
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                     <div>
//                         <p className="comment-title">Comment about Category:</p>
//                         <textarea
//                             className="comment-topic"
//                             value={comments[`category-${category.id}`] || ''}
//                             onChange={(e) => handleCommentChange(e, category.id, 'category')}
//                             placeholder="Type your comment..."
//                         />
//                     </div>
//                 </div>
//             ))}
//             <button type="button" onClick={handleSubmitForm}>Submit form</button>
//         </div>
//     );
// };

// export default CategoryComponent;
//