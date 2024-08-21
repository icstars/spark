import { Helmet } from 'react-helmet';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import return_icon from '../img/union-1.svg'
import './eval-overlook-style.css';

function EvalOverlook() {

   

    const navigate = useNavigate();
   
    const handleBack = () => {
        navigate(-1); // This goes back one step in the history stack
    };
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [clickedIndex, setClickedIndex] = useState(null); // State for click

    const handleClick = (index) => {
        setSelectedIndex(index); // Set the clicked index
        setClickedIndex(index);  // Set the clicked index for keeping the explanation visible
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index); // Set the hovered index
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null); // Reset the hovered index when the mouse leaves
    };

    const explanations = [
        "Point",
        "2 Points",
        "3 Points",
        "4 Points",
        "5 Points"
    ];

    return (

        <div>
            <Helmet>
                <title>
                    Your evaluation
                </title>
            </Helmet>
            <div>
                <h1>Bob's Rubrics</h1>
            </div>
            <div className="title-container">
                <div className="return-button-container">
                    <button onClick={handleBack}>
                        <img className="return-button-icon" src={return_icon} alt='img'></img>Return
                    </button>
                </div>
                <div className='h1-evaluation-container'>
                    <h1 className='h1-evaluation-title'>Teamwork</h1>
                </div>
            </div>

            <div>
                <hr className='hr-element'></hr>
            </div>

            <div className='cat-wrapper'>
                <div>
                    <h2 className='h2-evaluatoin-title'>Collaboration</h2>
                </div>
                <div className='option-wrapper'>


                    <div className="title-wrapper">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className={`wrapper-element ${selectedIndex === index ? 'selected' : ''}`}
                                onClick={() => handleClick(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {(hoveredIndex === index || clickedIndex === index) && (
                                    <p className="hover-explanation">{explanations[index]}</p>
                                )}
                                <p className="option">Text {index + 1}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="comment-title">Comment about Collaboration:</p>
                </div>
                <div>
                    <form>
                        <textarea className="comment-topic">Type your comment...</textarea>
                    </form>
                </div>
            </div>
            <div>
                <p className="comment-title">Comment about Teamwork:</p>
            </div>
            <div>
                <form>
                    <textarea className="comment-topic">Type your comment...</textarea>
                </form>
            </div>
        </div>

    );
}

export default EvalOverlook;
