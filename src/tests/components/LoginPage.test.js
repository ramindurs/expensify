import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from "../../components/LoginPage";

test('should render login page', () => {
    const wrapper = shallow(<LoginPage startLogin={() => {
    }}/>);

    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin when login button is clicked', () => {
    const startLoginSpy = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={startLoginSpy}/>);

    wrapper.find('button').simulate('click');

    expect(startLoginSpy).toHaveBeenCalled();
});

