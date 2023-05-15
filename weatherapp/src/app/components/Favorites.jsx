import React from 'react';

const Favorites = ({ favorites, setWeather }) => {
  return (
    <div>
      <h2>Favorite Cities</h2>
      <ul>
        {favorites.map((f, index) => (
          <li key={index}>
            <button className='myButton' onClick={() => setWeather(f)}>{f.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
