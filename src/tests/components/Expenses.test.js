import React from 'react';
import {shallow} from 'enzyme';
import {Expenses} from "../../components/Expenses";
import expenses from "../fixtures/expenses";

test('should render expense list with expenses', () => {
    const wrapper = shallow(<Expenses expenses={expenses}/>);

    expect(wrapper).toMatchSnapshot();
});

test('should render expense list with no expeses', () => {
    const wrapper = shallow(<Expenses expenses={[]}/>);

    expect(wrapper).toMatchSnapshot();
});