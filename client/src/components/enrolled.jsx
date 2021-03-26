import React from 'react';
import ReactDom from 'react-dom';

// const mapper = (enrolled) => {
//   console.log(enrolled);
//   return enrolled.map(currentEnrolled => <div>{currentEnrolled.enrolled}</div>);
// };
//Render the received Data from API in a basic Div
const Enrolled = ({ enrolled }) => (
  <div data-testid="enrolled">
    <div>
      { enrolled }
    </div>
  </div>
);




export default Enrolled;