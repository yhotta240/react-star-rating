import './App.css';
import React, { useState } from 'react';
import StarRating from './StarRating';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userRating, setUserRating] = useState(0);
  const handleUserRatingChange = (value) => {
    setUserRating(value);
  };
  return (
    <div className="App mt-3">
      <div className='container '>
        <h2>ユーザによる星評価</h2>
        <div className='d-flex justify-content-center m-4'>
          <StarRating rating={userRating} size={24} clickable={true} onRate={handleUserRatingChange}/>
        </div>
      </div>
      <div className='container '>
        <h2>星評価の表示のみ</h2>
        <div className='d-flex justify-content-center m-4'>
          <StarRating rating={1.5} size={30} sumreview={1234}/>
        </div>
      </div>
    </div>
  );
}

export default App;
