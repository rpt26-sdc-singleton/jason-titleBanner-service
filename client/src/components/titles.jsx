import React from 'react';
import ReactDom from 'react-dom';

//Render the received Data from API in a basic Div
const Titles = ({ title }) => (
  <div>
    {mapper(title)}
  </div>

)


const mapper = (title) => {
  return title.map(currentTitle => <div>{currentTitle.title}</div>)
}

export default Titles;