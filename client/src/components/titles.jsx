import React from 'react';
import ReactDom from 'react-dom';

// const mapper = (title) => {
//   return title.map(currentTitle => <div>{currentTitle.title}</div>);
// };
//Render the received Data from API in a basic Div
const Titles = ({ title }) => (
  <div data-testid="title">
    <div>
      { title }
    </div>
  </div>
);




export default Titles;