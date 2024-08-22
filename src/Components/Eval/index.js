import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryComponent from '../CategoryComponent';
import { Helmet } from 'react-helmet';

function Eval() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('http://localhost:5212/categories');
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    return (
        <div>
             <Helmet>
                <title>
                    Evaluation
                </title>
            </Helmet>
            <h1>Evaluation Page</h1>
            <CategoryComponent categories={categories} />
        </div>
    );
}

export default Eval;
