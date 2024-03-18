import React from 'react';
import { FaStar } from 'react-icons/fa';

/**
 * StarRatingコンポーネントは、星の評価を表示するためのUIコンポーネントです。
 * 
 * @param {number} rating - 評価値（0から5の間の数値）
 * @param {number} starsNumber - 表示する星の数（デフォルトは5）
 * @param {number} size - 星のサイズ（デフォルトは24）
 * @param {boolean} clickable - 評価をクリック可能にするかどうか（デフォルトはfalse）
 * @param {function} onRate - 評価がクリックされたときのコールバック関数
 * @param {string} sumreview - レビューの総数などの追加情報
 * @returns {JSX.Element} StarRatingコンポーネント
 */
const StarRating = ({ rating = 0, starsNumber = 5, size = 24, clickable = false, onRate, sumreview }) => {

  /**
   * 星をクリックしたときのハンドラ関数。
   * clickableプロパティがtrueであり、onRateプロパティが設定されている場合にのみ呼び出されます。
   * 
   * @param {number} value - クリックされた星の値
   */
  const handleClick = (value) => {
    if (clickable && onRate) {
      onRate(value);
    }
  };

  /**
   * 星のレンダリングを行う関数。
   * ratingプロパティの値に応じて星の色や数を調整します。
   * 
   * @returns {JSX.Element[]} 星のJSX要素の配列
   */
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const remainder = rating - fullStars;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={i}
          color="#ffc107"
          size={size}
          onClick={() => clickable && handleClick(i + 1)}
        />
      );
    }

    if (remainder > 0) {
      stars.push(
        <div key={fullStars} className='position-relative d-flex justify-content-center'>
          <FaStar
            key={fullStars}
            color='#ffc107'
            size={size}
            style={{
              clipPath: `polygon(0 0, ${remainder * 100}% 0, ${remainder * 100}% 100%, 0 100%)`,
              position: 'absolute',
              zIndex: 1,
            }}
            onClick={() => clickable && handleClick(fullStars + 1)}
          />
          <FaStar
            color="#e4e5e9"
            size={size}
          />
        </div>
      );
    }

    const remainingStars = starsNumber - fullStars - (remainder > 0 ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaStar
          key={fullStars + i + 1}
          color="#e4e5e9"
          size={size}
          onClick={() => clickable && handleClick(fullStars + i + 1)}
        />
      );
    }

    return stars;
  };

  return (
    <div>
      {!clickable && <p className='m-0'>総合評価：{rating.toFixed(1)}/5</p>}
      <div className='d-flex align-items-center'>
        {renderStars()}
        {clickable && <p className='m-0 ps-1'>{rating.toFixed(1)}</p>}
        {sumreview && <p className='m-0 fs-7 ps-1'>{sumreview}</p>}
      </div>
    </div>
  );
};

export default StarRating;
