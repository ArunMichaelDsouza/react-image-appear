import React from 'React';
import PropTypes from 'prop-types';
import { LOADER } from './constants';

class ReactImageAppear extends React.Component {
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
        this.setState({
            imgComponent: React.createElement('img', {
                src, onLoad: this.imageOnLoad, ref: ref => {
                    imgElement = ref;
                }
            })
        }, () => {
            this.getImageDimensions(imgElement);
        });
    }

    imageOnLoad() {
        console.log('loaded');
        this.setState({
            imgComponent: React.createElement('img', {
                src: this.props.src, style: {
                    animation: 'fadeInUp 2s ease-in-out'
                }
            })
        });
    }

    getImageDimensions(imgElement) {
        const that = this, dimensionsInterval = setInterval(() => {
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
            { loader } = this.props;

        const placeholder = React.createElement('div', {
            style: {
                width,
                height,
                display: 'inline-block',
                backgroundColor: '#f0f0f0',
                backgroundImage: `url(${loader})`,
                backgroundPosition: 'center center',
                backgroundSize: '40px 40px',
                backgroundRepeat: 'no-repeat'
            }
        }, React.cloneElement(imgComponent, {
            style: {
                display: 'none'
            }
        }));

        this.setState({ imgComponent: placeholder });
    }

    render() {
        const { imgComponent } = this.state;

        return imgComponent;
    }
}

ReactImageAppear.propTypes = {
    src: PropTypes.string.isRequired,
    loader: PropTypes.string
};

ReactImageAppear.defaultProps = {
    loader: LOADER
}

export default ReactImageAppear;