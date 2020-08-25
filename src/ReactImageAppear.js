/*
    react-image-appear v1.3.26
    Copyright (c) 2018 Arun Michael Dsouza (amdsouza92@gmail.com)
    Licence: MIT
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    LOADER, LOADER_STYLE, PLACEHOLDER, PLACEHOLDER_STYLE, ANIMATION, ANIMATION_DURATION, EASING
} from './constants';
import { injectAnimationsScript } from './helpers';

injectAnimationsScript();

class ReactImageAppear extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgComponent: null,
            loading: false
        };
        this.imageOnLoad = this.imageOnLoad.bind(this);
        this.getImageDimensions = this.getImageDimensions.bind(this);
        this.parseComputedDimensions = this.parseComputedDimensions.bind(this);
        this.createPlaceholder = this.createPlaceholder.bind(this);
        this.getPlaceholderStyle = this.getPlaceholderStyle.bind(this);
        this.createLoader = this.createLoader.bind(this);
        this.getLoaderStyle = this.getLoaderStyle.bind(this);
    }

    componentDidMount() {
        const { src, className } = this.props;

        let imgElement;
        this.setState((prevState, props) => {
            return {
                loading: true,
                imgComponent: React.createElement('img', {
                    src,
                    onLoad: this.imageOnLoad,
                    style: {
                        opacity: 0
                    },
                    className,
                    ref: ref => {
                        imgElement = ref;
                    }
                })
            };
        }, () => {
            this.getImageDimensions(imgElement);
        });
    }

    imageOnLoad() {
        const { src, animation, animationDuration, easing, className, onClick } = this.props;

        this.setState((prevState, props) => {
            return {
                loading: false,
                imgComponent: React.createElement('img', {
                    src,
                    style: {
                        animation: `${animation} ${animationDuration} ${easing}`
                    },
                    className,
                    onClick
                })
            };
        });
    }

    getImageDimensions(imgElement) {
        const that = this,
            dimensionsInterval = setInterval(() => {
                const { width, height } = this.parseComputedDimensions(imgElement);

                if (width && height) {
                    clearInterval(dimensionsInterval);
                    that.createPlaceholder(width, height);
                }
            }, 10);
    }

    parseComputedDimensions(el) {
        const widthMatch = window.getComputedStyle(el).width.match(/\d+\.?\d+/g);
        const heightMatch = window.getComputedStyle(el).height.match(/\d+\.?\d+/g);
        return {
            width: widthMatch ? Number(widthMatch.join('')) : undefined,
            height: heightMatch ? Number(heightMatch.join('')) : undefined,
        };
    }

    createPlaceholder(width, height) {
        const { imgComponent } = this.state,
            { placeholderClass } = this.props;

        const placeholder = React.createElement('div', {
            style: this.getPlaceholderStyle(width, height),
            className: placeholderClass
        }, React.cloneElement(imgComponent), this.createLoader());

        this.setState((prevState, props) => {
            return {
                imgComponent: placeholder
            };
        });
    }

    getPlaceholderStyle(width, height) {
        const { placeholderStyle, placeholder } = this.props;
        let placeholderStyling = Object.assign({}, PLACEHOLDER_STYLE, placeholderStyle);

        switch (typeof (placeholder)) {
            case 'boolean':
                if (placeholder) {
                    placeholderStyling = Object.assign({}, placeholderStyling, {
                        backgroundImage: `url(${PLACEHOLDER})`
                    })
                }
                break;
            case 'string':
                placeholderStyling = Object.assign({}, placeholderStyling, {
                    backgroundImage: `url(${placeholder})`
                })
                break;
        }
        return Object.assign({}, placeholderStyling, { width, height });
    }

    createLoader() {
        const { loader, loaderClass, showLoader } = this.props;
        const { loading } = this.state
        return (showLoader && loading ) ? React.createElement('img', {
            src: loader ? loader : LOADER,
            style: this.getLoaderStyle(),
            className: loaderClass
        }) : null;
    }

    getLoaderStyle() {
        const { loaderStyle } = this.props;

        return Object.assign({}, LOADER_STYLE, loaderStyle);
    }

    render() {
        const { imgComponent } = this.state;

        return imgComponent;
    }
}

ReactImageAppear.propTypes = {
    src: PropTypes.string.isRequired,
    loader: PropTypes.string,
    loaderStyle: PropTypes.object,
    loaderClass: PropTypes.string,
    placeholder: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    placeholderStyle: PropTypes.object,
    placeholderClass: PropTypes.string,
    animation: PropTypes.string,
    animationDuration: PropTypes.string,
    easing: PropTypes.string,
    showLoader: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
};

ReactImageAppear.defaultProps = {
    loader: LOADER,
    loaderStyle: {},
    loaderClass: '',
    placeholder: false,
    placeholderStyle: {},
    placeholderClass: '',
    animation: ANIMATION,
    animationDuration: ANIMATION_DURATION,
    easing: EASING,
    showLoader: true,
    className: '',
    onClick: () => {}
};

export default ReactImageAppear;
