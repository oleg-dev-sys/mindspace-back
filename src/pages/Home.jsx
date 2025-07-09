import { useState } from 'react';
import './Home.css';
import CategorySlider from '../components/CategorySlider';
import MoodTracker from '../components/MoodTracker';
import Achievements from '../components/Achievements';

export const Home = ({ streak }) => {
  const currentDayIndex = new Date().getDay() - 1;

    return (
      <>
        <div className='App__content_user_results'>
          <MoodTracker />
        </div>
        <div className='App__content_user_results'>
          <div>
            Вы медитируете уже {streak} дней подряд!
          </div>

          <div className='App__content_user_results_days'>
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => {
              const isToday = index === currentDayIndex;
              return (
                <div 
                  key={index} 
                  className={`App__content_user_results_data ${isToday ? 'today' : ''}`}
                >
                  <div className='day-name'>{day}</div>
                  <div className='day-circle'></div>
                  <div className='day-date'>{new Date().getDate() + (index - currentDayIndex)}</div>
                </div>
              );
            })}
          </div>
        </div>

        

        <div className='Slider__meditations_conteiner'>
          <p>Выберите медитацию:</p>
          <CategorySlider />
        </div>
        <div className='App__content_user_results'>
          <Achievements />
        </div>
      </>
    )
}