import React from 'react';
import ReactDOM from 'react-dom';
import Enrolled from '../enrolled';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import renderer from 'react-test-renderer';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Enrolled></Enrolled>, div);
});


it('render enrolled correctly', () => {
  const {getByTestId} = render(<Enrolled enrolled= {5}></Enrolled>);
  expect(getByTestId('enrolled')).toHaveTextContent(5);
});

//test DOM cleanup
it('render enrolled correctly', () => {
  const {getByTestId} = render(<Enrolled enrolled= {10}></Enrolled>);
  expect(getByTestId('enrolled')).toHaveTextContent(10);
});

//test snapshot
it('matches snapshot', () => {
  const tree = renderer.create(<Enrolled enrolled={100}></Enrolled>).toJSON();
  expect(tree).toMatchSnapshot();
});

