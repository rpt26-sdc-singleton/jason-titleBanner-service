import React from 'react';
import ReactDom from 'react-dom';





const Stars = ( {stars, rating} ) => (
  <span className="title-overall-star" dangerouslySetInnerHTML={{__html: stars(rating)}}></span>
);

export default Stars;