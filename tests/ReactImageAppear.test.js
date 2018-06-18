// Test for ReactImageAppear component

import React from 'react';
import { shallow } from 'enzyme';
import ReactImageAppear from '../src/ReactImageAppear';

describe('ReactImageAppear Component', () => {
    it('Check for "src" prop to be present and to have a string value', () => {
        const src = 'https://newevolutiondesigns.com/images/freebies/tropical-beach-background-8.jpg',
            el = shallow(<ReactImageAppear src={src} />);

        expect(el.props().src).toEqual(src);
        expect(typeof el.props().src).toEqual('string');
    })
})