import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import './style.css';
import icon from './icons/instructor.png';

import Titles from './components/titles.jsx';
import Enrolled from './components/enrolled.jsx';


class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      num: 0,
      titles: [],
      totalEnrolled: []
    };
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
  }

  // API Get request
  componentDidMount() {

    if (document) {
      var uri = window.location.href.split('/');
      var id = uri[uri.length - 1] === '' ? 1 : uri[uri.length - 1];
      console.log('asdsad', id);
    }
    console.log(`http://localhost:3001/api/getTitle/${id}`);

    $.get(`http://localhost:3001/api/getTitle/${id}`, (data) => {
      console.log('got response from server', data);
      this.setState({
        titles: data
      });
    })
      .done(() => {
        console.log('successfully received data from API endpoint');
      });

    $.get(`http://localhost:3001/api/getEnrolled/${id}`, (data) => {
      console.log('got total Enrolled from server', data);
      this.setState({
        totalEnrolled: data
      });
    })
      .done(() => {
        console.log('successfully received data from Enrolled API endpoint', this.state.totalEnrolled);
      });
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback)=>{
      return;
    };
  }

  onChange (e) {
    this.setState({
      num: Number(e.target.value)
    });
  }

  add() {
    console.log('ADD', this.state.totalEnrolled);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3001/api/addTitle',
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
          <h1 className="banner-title">
            <Titles title={this.state.titles}/>
          </h1>
        </div>
        <span className="side-bar">
          <span className="offered">Offered By: </span>
          <span className="university">Stanford</span>
        </span>
        <div>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star "></span>
        </div>
        <div className="instructor-main">
          <img src= {icon} className="instructor"/>
          <span style= {{color: 'white', fontSize: '20px'}}>Andrew Ng</span>
          <span id="top-instructor">Top instructor</span>
        </div>
        <div className="white-box">
          <div style= {
            {
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '20px'
            }}> Enroll for Free</div>
          <div style= {{color: 'black', fontWeight: 'bold', textAlign: 'center'}}>Starts Mar 29th</div>
        </div>
        {/* <div>{this.state.totalEnrolled}</div> */}
        <div className="enrolled" style = { {marginTop : '30px', color: 'white', fontSize: '30px', display: 'flex'} }>
          <span> <Enrolled enrolled={this.state.totalEnrolled} /> </span>
          <span style = { {marginLeft: '10px'} }>already enrolled</span>
        </div>

      </div>
    );
  }
}


ReactDom.render(<Title />, document.getElementById('title'));


