import PropTypes from 'prop-types';
import React from 'react';

function Rating ({ onChangeFuncProp }) {
  const onHover = ({ target }) => {
    const stars = document.querySelectorAll('section label img');
    const starCount = Number(target.alt[5]);

    stars.forEach((star) => {
      if (star.style) {
        star.style.filter = 'brightness(0) saturate(100%) invert(90%) sepia(14%) saturate(22%) hue-rotate(313deg) brightness(93%) contrast(83%)';
      }
    });
  
    for (let i = 1; i <= starCount; i += 1) {
      // Make hover stars yellow
      const hoverStar = document.querySelector(`section label:nth-child(${i}) img`);
      if (hoverStar && hoverStar.style) {
        hoverStar.style.filter = 'none';
      }
    }
  };

  return (
    <section className="rating">
      <label htmlFor="1-rating">
        <input
          name="rating"
          type="radio"
          value="1"
          onChange={onChangeFuncProp}
          data-testid="1-rating"
          id="1-rating"
        />
        <img
          src="https://freepikpsd.com/file/2019/10/gold-star-icon-png-1-Transparent-Images-Free.png"
          alt="Star 1"
          onMouseEnter={onHover}
        />
      </label>
      <label htmlFor="5-rating">
        <input
          name="rating"
          type="radio"
          value="5"
          onChange={onChangeFuncProp}
          data-testid="5-rating"
          id="5-rating"
        />
        <img
          src="https://freepikpsd.com/file/2019/10/gold-star-icon-png-1-Transparent-Images-Free.png"
          alt="Star 5"
          onMouseEnter={onHover}
        />
      </label>
    </section>
  );
};

Rating.propTypes = {
  onChangeFuncProp: PropTypes.func.isRequired,
};

export default Rating;
