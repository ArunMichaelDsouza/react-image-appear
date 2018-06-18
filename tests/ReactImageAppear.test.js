// Test for ReactImageAppear component

import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactImageAppear from '../src/ReactImageAppear';
import { LOADER } from '../src/constants';
import renderer from 'react-test-renderer';

const src = 'https://newevolutiondesigns.com/images/freebies/tropical-beach-background-8.jpg';

describe('ReactImageAppear Component', () => {
    it('Snapshot test', () => {
        const tree = renderer
            .create(<ReactImageAppear src={src} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Check for "src" prop to be present and to have a string value', () => {
        const el = shallow(<ReactImageAppear src={src} />);

        expect(el.props().src).toEqual(src);
        expect(typeof el.props().src).toEqual('string');
    });

    it('Check for "loader" prop to have a string value', () => {
        const el = mount(<ReactImageAppear src={src} />);

        expect(el.props().loader).toEqual(LOADER);
        expect(typeof el.props().loader).toEqual('string');
    });

    it('Check for "loader" prop to be custom and have a string value', () => {
        const loader = "https://cache.dominos.com/nolo/ca/en/010048/assets/build/images/img/spinner.gif",
            el = mount(<ReactImageAppear src={src} loader={loader} />);

        expect(el.props().loader).toEqual(loader);
        expect(typeof el.props().loader).toEqual('string');
    });

    it('Check for "loaderStyle" prop to have an object value', () => {
        const loaderStyle = { border: "2px solid red" },
            el = mount(<ReactImageAppear src={src} loaderStyle={loaderStyle} />);

        expect(el.props().loaderStyle).toEqual(loaderStyle);
        expect(typeof el.props().loaderStyle).toEqual('object');
    });

    it('Check for "loaderClass" prop to have a string value', () => {
        const loaderClass = 'my-loader',
            el = mount(<ReactImageAppear src={src} loaderClass={loaderClass} />);

        expect(el.props().loaderClass).toEqual(loaderClass);
        expect(typeof el.props().loaderClass).toEqual('string');
    });

    it('Check for "placeholder" prop to have a boolean value', () => {
        const el = mount(<ReactImageAppear src={src} placeholder />);

        expect(el.props().placeholder).toEqual(true);
        expect(typeof el.props().placeholder).toEqual('boolean');
    });

    it('Check for "placeholder" prop to be custom and to have a string value', () => {
        const placeholder = "http://getuikit.com/docs/images/placeholder_600x400.svg",
            el = mount(<ReactImageAppear src={src} placeholder={placeholder} />);

        expect(el.props().placeholder).toEqual(placeholder);
        expect(typeof el.props().placeholder).toEqual('string');
    });

    it('Check for "placeholderStyle" prop to have an object value', () => {
        const placeholderStyle = { border: "2px solid red", backgroundColor: 'black' },
            el = mount(<ReactImageAppear src={src} placeholderStyle={placeholderStyle} />);

        expect(el.props().placeholderStyle).toEqual(placeholderStyle);
        expect(typeof el.props().placeholderStyle).toEqual('object');
    });

    it('Check for "placeholderClass" prop to have a string value', () => {
        const placeholderClass = 'my-placeholder',
            el = mount(<ReactImageAppear src={src} placeholderClass={placeholderClass} />);

        expect(el.props().placeholderClass).toEqual(placeholderClass);
        expect(typeof el.props().placeholderClass).toEqual('string');
    });

    it('Check for "animation" prop to have a string value', () => {
        const animation = 'bounceIn',
            el = mount(<ReactImageAppear src={src} animation={animation} />);

        expect(el.props().animation).toEqual(animation);
        expect(typeof el.props().loader).toEqual('string');
    });

    it('Check for "animationDuration" prop to have a string value', () => {
        const animationDuration = '1s',
            el = mount(<ReactImageAppear src={src} animationDuration={animationDuration} />);

        expect(el.props().animationDuration).toEqual(animationDuration);
        expect(typeof el.props().animationDuration).toEqual('string');
    });

    it('Check for "easing" prop to have a string value', () => {
        const easing = 'ease-in',
            el = mount(<ReactImageAppear src={src} easing={easing} />);

        expect(el.props().easing).toEqual(easing);
        expect(typeof el.props().easing).toEqual('string');
    });

    it('Check for "showLoader" prop to have a boolean value', () => {
        const showLoader = false,
            el = mount(<ReactImageAppear src={src} showLoader={showLoader} />);

        expect(el.props().showLoader).toEqual(showLoader);
        expect(typeof el.props().showLoader).toEqual('boolean');
    });

    it('Check for rendered element to be an "img" with the expected src', () => {
        const el = mount(<ReactImageAppear src={src} />);

        expect(el.children().at(0).type()).toEqual('img');
        expect(el.find('img').prop('src')).toEqual(src);
    });
});