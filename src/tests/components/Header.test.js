import React from 'react';
import {shallow} from 'enzyme';
import {Header} from "../../components/Header";

test('should render header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {
    }}/>);

    expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on logout button clicked', () => {
    const logoutSpy = jest.fn();
    const wrapper = shallow(<Header startLogout={logoutSpy}/>);

    wrapper.find('button').simulate('click');

    expect(logoutSpy).toHaveBeenCalled();
});

