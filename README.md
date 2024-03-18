## Reactアプリケーションに星評価UIを追加する

Reactで簡単に星評価UIを実装する方法を紹介します。この記事では、`react-icons`パッケージを使用して星のアイコンを表示し、`react-bootstrap`パッケージを使用してスタイリングを行います。

### 1. `react-icons`のインストール

まず、`react-icons`パッケージをインストールします。これにより、FontAwesomeなどのアイコンセットを簡単にReactに統合することができます。

```bash
npm install react-icons
```
### 2. `react-bootstrap`のインストール

次に、react-bootstrapパッケージをインストールします。これにより、Reactアプリケーションに簡単にBootstrapのコンポーネントを追加することができます。

```bash
npm install react-bootstrap bootstrap@5
```

### 3. 星評価コンポーネントの実装
以下は、星評価コンポーネントの実装例です。
Rating.jsを作成し、以下のソースコードをコピぺします。
```js script  
//Rating.js
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


```
### 4. アプリケーションに星評価を追加
任意の場所(今回はApp.js)で星評価コンポーネントを使用します。

```js script  
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


```
これで、Reactアプリケーションに星評価UIを簡単に追加することができます。
