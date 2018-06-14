import React from 'React';

class ReactImageAppear extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            img: null
        };

        this.imageLoaded = this.imageLoaded.bind(this);
        this.getImageDimensions = this.getImageDimensions.bind(this);
        this.parseComputedDimensions = this.parseComputedDimensions.bind(this);
    }

    componentDidMount() {
        const { src } = this.props;

        this.setState({ img: React.createElement('img', { src, onLoad: this.imageLoaded }) });
    }

    imageLoaded() {
        console.log('loaded');
    }

    getImageDimensions(imgEl) {
        const dimensionsInterval = setInterval(() => {
            const { width, height } = this.parseComputedDimensions(imgEl);

            console.log(width, height);
            if (width && height) {
                clearInterval(dimensionsInterval);
                console.log('interval cleared');
                console.log(width, height);
                this.setState({ container: createContainer(imgEl, width, height) });
            }
        }, 10);
    }

    parseComputedDimensions(el) {
        return {
            width: Number(window.getComputedStyle(el).width.match(/\d+/)),
            height: Number(window.getComputedStyle(el).height.match(/\d+/))
        };
    }

    render() {
        const { img } = this.state;

        return img;
    }
}

export default ReactImageAppear;