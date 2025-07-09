import React from 'react';
import categories from '../data/categories';
import './CategorySlider.css';
import { useNavigate } from 'react-router-dom';

const CategorySlider = () => {
  const navigate = useNavigate();

  const handleClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="slider-container">
      {categories.map(cat => (
        <div
          key={cat.id}
          className="category-card"
          style={{ backgroundColor: cat.color }}
          onClick={() => handleClick(cat.id)}
        >
          {cat.label}
        </div>
      ))}
    </div>
  );
};

export default CategorySlider;