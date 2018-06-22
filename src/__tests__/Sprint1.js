import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Home from '../components/Home';

/*

Story 1: User landing on page
-1 User 
- User can see `Danke schoen From Gate6` in message box
- User can see `No Action` in action box

Story 2: User can click on the Go button
- On button click change action box to `Button Clicked`

-- When user click on the button 
-- Then action box change to `Button Clicked`

*/

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Home />, div);
});

it('renders without crashing', () => {
  	shallow(<Home />);
});

it('renders welcome text', () => {
	const wrapper = shallow(<Home />);
	const message = <div className="message">Danke schoen From Gate6</div>;
	expect(wrapper.contains(message)).toEqual(true);
	const welcome = <div className="action">No Action</div>;
	expect(wrapper.contains(welcome)).toEqual(true);
});

it('renders button', () => {
	const wrapper = shallow(<Home />);
	const button = wrapper.find('button');
	button.simulate('click');
	expect(wrapper.state('clicked')).toEqual(true);
	const welcome = <div className="action">Button Clicked</div>;
	expect(wrapper.contains(welcome)).toEqual(true);
});

it('renders button with id', () => {
	const wrapper = shallow(<Home />);
	const button = wrapper.find('#test');  
	button.simulate('click');
	expect(wrapper.state('clicked')).toEqual(true); 
	const welcome = <div className="action">Button Clicked</div>;
  	expect(wrapper.contains(welcome)).toEqual(true);  
});
