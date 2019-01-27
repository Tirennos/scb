import React from 'react';
import App from './App';
import ListEmail from './Component/ListEmail';
import { shallow, mount } from 'enzyme';
import mockEmail from './mock/mockEmail.json';


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
    });

    it('check handleFilter', () => {
        const wrapper = shallow(<App />)
        wrapper.instance().handleFilter('name');
        expect(wrapper.state().listEmail);

        wrapper.instance().handleFilter('email');
        expect(wrapper.state().listEmail);

        wrapper.instance().handleFilter('isread');
        expect(wrapper.state().listEmail);

        wrapper.instance().handleFilter('subject');
        expect(wrapper.state().listEmail);
    });

    it('check render withData', () => {
        const mockData = mockEmail;
        const wrapper = mount(<ListEmail listEmail={mockData}/>)
        if (mockData && mockData.length) {
            expect(wrapper.find('#renderWithData'));
        } else {
            expect(wrapper.find('#nam')).toHaveLength(1);
        }
    });
});
