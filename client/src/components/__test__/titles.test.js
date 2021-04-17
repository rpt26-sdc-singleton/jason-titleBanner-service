import React from 'react';
import ReactDOM from 'react-dom';
import Titles from '../titles';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import renderer from 'react-test-renderer';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Titles></Titles>, div);
});


it('render titles correctly', () => {
  const {getByTestId} = render(<Titles title= {'hi'}></Titles>);
  expect(getByTestId('title-test')).toHaveTextContent('hi');
});

//test DOM cleanup
it('render titles correctly', () => {
  const {getByTestId} = render(<Titles title= {'bye'}></Titles>);
  expect(getByTestId('title-test')).toHaveTextContent('bye');
});

//test snapshot
it('matches snapshot', () => {
  const tree = renderer.create(<Titles title={'snapshot'}></Titles>).toJSON();
  expect(tree).toMatchSnapshot();
});

