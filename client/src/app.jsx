import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import Titles from './components/titles.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      titles: [],
      totalEnrolled: 0
    };
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
  }

  // API Get request
  componentDidMount() {
    $.get('http://localhost:4000/api/getTitle', (data) => {
      console.log('got response from server', data);
      this.setState({
        titles: data
      });
    })
      .done(() => {
        console.log('successfully received data from API endpoint');
      });

      $.get('http://localhost:4000/api/getEnrolled', (data) => {
        console.log('got total Enrolled from server', data);
        this.setState({
          totalEnrolled: data
        });
      })
        .done(() => {
          console.log('successfully received data from API endpoint');
        });
  }

  onChange (e) {
    this.setState({
      num: Number(e.target.value)
    });
  }

  add() {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4000/api/addTitle',
      data: {total: this.state.num},
      success: () => console.log('successfully made a post')
    });
  }

  render() {
    return (
      <div>
        <h4>Enter number of titles to populate</h4>
        <input value = {this.state.num} onChange={this.onChange} />
        <button onClick={this.add}> Add Titles </button>
        <div>
          <Titles title={this.state.titles}/>
        </div>
      </div>
    );
  }
}


ReactDom.render(<App />, document.getElementById('root'));


