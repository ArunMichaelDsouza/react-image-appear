/*
    react-image-appear v1.0.0
    Copyright (c) 2018 Arun Michael Dsouza (amdsouza92@gmail.com)
    Licence: MIT
*/

import React, { Component } from 'React';
import PropTypes from 'prop-types';
import { LOADER, PLACEHOLDER_STYLES, ANIMATION, ANIMATION_DURATION, EASING } from './constants';

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
        const { imgComponent } = this.state,
            { loader, showLoader, placeholderStyles } = this.props,
            placeholderStyling = Object.assign({}, PLACEHOLDER_STYLES, placeholderStyles);

        const placeholder = React.createElement('div', {
            style: Object.assign({}, placeholderStyling, {
                width,
                height,
                backgroundImage: showLoader ? `url(${loader})` : null
            })
        }, React.cloneElement(imgComponent));

        this.setState((prevState, props) => {
            return {
                imgComponent: placeholder
            };
        });
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
    placeholderStyles: PropTypes.object
};

ReactImageAppear.defaultProps = {
    loader: LOADER,
    animation: ANIMATION,
    animationDuration: ANIMATION_DURATION,
    easing: EASING,
    showLoader: true,
    placeholderStyles: {}
}

export default ReactImageAppear;