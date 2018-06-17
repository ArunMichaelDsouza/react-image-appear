// Test for ReactImageAppear component

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ReactImageAppear from '../src/index';

describe('ReactImageAppear Component', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<ReactImageAppear />));
    })
})