import React from 'react';
import App from './App';
import ListEmail from './Component/ListEmail';
import { shallow, mount, render } from 'enzyme';


describe('Test Case', function() {
    const wrapper = shallow(<App />);

    it('check render layout', () => {
        expect(wrapper.find('#layout')).toHaveLength(1);
    });

    it('check render dropdown', () => {
        expect(wrapper.find('#btnDropdown')).toHaveLength(1);
    });

    it('check render component', () => {
        const component = mount(<ListEmail />);
        expect(component.length).toBe(1);
    })

});
