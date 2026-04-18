import React from 'react';
import categories from '../data/categories';
import { useNavigate } from 'react-router-dom';

const CategorySlider = () => {
  const navigate = useNavigate();

  const handleClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className='hide-scrollbar mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto p-1 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none]'>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className='min-w-[118px] flex-none snap-start rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-[1.03]'
          style={{ background: `linear-gradient(135deg, ${cat.color}, rgba(255,255,255,0.12))` }}
          onClick={() => handleClick(cat.id)}
          type='button'
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategorySlider;
