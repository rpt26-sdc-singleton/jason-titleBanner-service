import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import './style.css';

import Titles from './components/titles.jsx';
import Enrolled from './components/enrolled.jsx';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      num: 0,
      titles: '',
      totalEnrolled: 0,
      instructor: '',
      offeredBy: '',
      img: '',
      month: '',
      date: 0
    };
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
  }

  // API Get request
  componentDidMount() {

    if (document) {
      var uri = window.location.href.split('/');
      var id = uri[uri.length - 1] === '' ? 1 : uri[uri.length - 1];
    }

    axios.get(`http://3.140.219.139/api/getTitle/${id}`)
      .then(response => {
        this.setState({
          titles: response.data
        });
      })
      .catch(err => console.log('Issue with getting course Title', err));


    axios.get(`http://3.140.219.139/api/getEnrolled/${id}`)
      .then(response => {
        this.setState({
          totalEnrolled: response.data,
          month: months[Math.floor(Math.random() * months.length)],
          date: Math.floor(Math.random() * 30)
        });
      })
      .catch(err => console.log('Error while getting total Enrolled', err));


    //get instructors name

    axios.get(`http://54.176.19.199:3003/api/instructors/${id}`)
      .then(response => {
        this.setState({
          instructor: `${response.data[0].firstName} ${response.data[0].lastName}`
        });
      })
      .catch(err => console.log('Cannot get instructors', err));


    axios.get(`http://54.176.19.199:3003/api/offeredBy/${id}`)
      .then(response => {
        this.setState({
          offeredBy: response.data[0].offeredByName
        });
      })
      .catch(err => console.log('Cannot get offered by', err));

    axios.get(`http://54.176.19.199:3006/api/image/${id}/primaryInstructor `)
      .then(response => {
        this.setState({
          img: response.data.primaryInstructor
        });
      })
      .catch(err => console.log('Could not get images', err));

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


  //TODO: Can remove as used only for seeding
  add() {
    $.ajax({
      type: 'POST',
      url: 'http://3.140.219.139/api/addTitle',
      data: {total: this.state.num},
      success: () => console.log('successfully made a post')
    });
  }


  render() {
    return (
      <div className="title-service">
        <div>
          <h4>Enter number of titles to populate</h4>
          <input value = {this.state.num} onChange={this.onChange} />
          <button onClick={this.add}> Add Titles </button>
        </div>
        <div className="title-inner">
          <div className="title-service1">
            <div className="title-nav">
              Browse {'>'}   Data Science {'>'}   Machine Learning
            </div>
            <div className="banner-title">
              <Titles title={this.state.titles}/>
            </div>
            <div className="title-star">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star "></span>
              <span className="checked title-num">4.9</span>
              <span className="title-rating">157,748 rating</span>
            </div>
            <div className="instructor-main">
              <img src= {this.state.img} className="instructor"/>
              <span className = "title-instructorName">
                {this.state.instructor}
              </span>
              <span id="top-instructor">Top instructor</span>
            </div>
            <div className="white-box">
              <div className="title-charge"> Enroll for Free</div>
              <div className="title-date">Starts {this.state.month} {this.state.date}</div>
            </div>
            <div className="title-aid">Financial aid available</div>
            {/* <div>{this.state.totalEnrolled}</div> */}
            <div className="enrolled">
              <span> <Enrolled enrolled={this.state.totalEnrolled} /> </span>
              <span style = { {marginLeft: '10px'} }>already enrolled</span>
            </div>
          </div>
          <div className="side-bar">
            <span>
              <p className="offered">Offered By </p>
              <div className="university">{this.state.offeredBy}</div>
            </span>
          </div>
        </div>
      </div>
    );
  }
}


ReactDom.render(<Title />, document.getElementById('title'));


