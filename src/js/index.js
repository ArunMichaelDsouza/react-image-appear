/*
    react-image-appear v1.0.0
    Copyright (c) 2018 Arun Michael Dsouza (amdsouza92@gmail.com)
    Licence: MIT
*/

import React, { Component } from 'React';
import PropTypes from 'prop-types';
import {
    LOADER,
    PLACEHOLDER,
    PLACEHOLDER_STYLES,
    ANIMATION,
    ANIMATION_DURATION,
    EASING
} from './constants';

class ReactImageAppear extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgComponent: null
        };
        this.imageOnLoad = this.imageOnLoad.bind(this);
        this.getImageDimensions = this.getImageDimensions.bind(this);
        this.parseComputedDimensions = this.parseComputedDimensions.bind(this);
        this.createPlaceholder = this.createPlaceholder.bind(this);
        this.getPlaceholderStyles = this.getPlaceholderStyles.bind(this);
        this.createLoader = this.createLoader.bind(this);
    }

    componentDidMount() {
        const { src } = this.props;

        let imgElement;
        this.setState((prevState, props) => {
            return {
                imgComponent: React.createElement('img', {
                    src,
                    onLoad: this.imageOnLoad,
                    style: {
                        opacity: 0
                    },
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
        const { animation, animationDuration, easing } = this.props;

        console.log('loaded');
        this.setState((prevState, props) => {
            return {
                imgComponent: React.createElement('img', {
                    src: this.props.src,
                    style: {
                        animation: `${animation} ${animationDuration} ${easing}`
                    }
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
        return {
            width: Number(window.getComputedStyle(el).width.match(/\d+/)),
            height: Number(window.getComputedStyle(el).height.match(/\d+/))
        };
    }

    createPlaceholder(width, height) {
        const { imgComponent } = this.state;

        const placeholder = React.createElement('div', {
            style: this.getPlaceholderStyles(width, height)
        }, React.cloneElement(imgComponent), this.createLoader());

        this.setState((prevState, props) => {
            return {
                imgComponent: placeholder
            };
        });
    }

    getPlaceholderStyles(width, height) {
        const { placeholderStyles, placeholder } = this.props;
        let placeholderStyling = Object.assign({}, PLACEHOLDER_STYLES, placeholderStyles);

        switch (typeof (placeholder)) {
            case 'boolean':
                placeholderStyling = Object.assign({}, placeholderStyling, {
                    backgroundImage: `url(${PLACEHOLDER})`
                })
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
        const { showLoader } = this.props;

        return showLoader ? React.createElement('img', { src: LOADER }) : null;
    }

    render() {
        const { imgComponent } = this.state;

        return imgComponent;
    }
}

ReactImageAppear.propTypes = {
    src: PropTypes.string.isRequired,
    loader: PropTypes.string,
    animation: PropTypes.string,
    animationDuration: PropTypes.number,
    easing: PropTypes.string,
    showLoader: PropTypes.bool,
    placeholderStyles: PropTypes.object,
    placeholder: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ])
};

ReactImageAppear.defaultProps = {
    loader: LOADER,
    animation: ANIMATION,
    animationDuration: ANIMATION_DURATION,
    easing: EASING,
    showLoader: true,
    placeholderStyles: {},
    placeholder: false
}

export default ReactImageAppear;