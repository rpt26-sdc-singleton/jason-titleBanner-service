import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num : 0
    }
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
  }

  onChange (e) {
    this.setState({
      num: Number(e.target.value)
    })
  }

  add() {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/addTitle/add",
      data: {total: this.state.num},
      success: () => console.log('successfully made a post')
    })
  }

  render() {
    return (
      <div>
        <h4>Enter number of titles to populate</h4>
        <input value = {this.state.num} onChange={this.onChange} />
        <button onClick={this.add}> Add Titles </button>
      </div>
    )
  }
}


ReactDom.render(<App />, document.getElementById('root'));


