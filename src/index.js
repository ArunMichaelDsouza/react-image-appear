import React from 'React';

class ReactImageAppear extends React.Component {
    constructor(props) {
        super(props);

        this.state = { el: null };
        this.imageLoaded = this.imageLoaded.bind(this);
        this.getImageDimensions = this.getImageDimensions.bind(this);
        this.parseComputedDimensions = this.parseComputedDimensions.bind(this);
        this.createContainer = this.createContainer.bind(this);
    }

    componentDidMount() {
        const { src } = this.props;

        let img;
        this.setState({
            el: React.createElement('img', {
                src, onLoad: this.imageLoaded, ref: ref => {
                    img = ref;
                }
            })
        }, () => {
            this.getImageDimensions(img);
        });
    }

    imageLoaded() {
        console.log('loaded');
        //this.setState({ el: React.createElement('img', { src: this.props.src }) });
    }

    getImageDimensions(img) {
        const that = this, dimensionsInterval = setInterval(() => {
            const { width, height } = this.parseComputedDimensions(img);

            if (width && height) {
                clearInterval(dimensionsInterval);
                that.createContainer(width, height);
            }
        }, 10);
    }

    parseComputedDimensions(el) {
        return {
            width: Number(window.getComputedStyle(el).width.match(/\d+/)),
            height: Number(window.getComputedStyle(el).height.match(/\d+/))
        };
    }

    createContainer(width, height) {
        const { el } = this.state;

        const container = React.createElement('div', {
            style: {
                width,
                height,
                display: 'inline-block',
                background: '#bbb'
            }
        }, React.cloneElement(el, {
            style: {
                display: 'none'
            }
        }));

        this.setState({ el: container });
    }

    render() {
        const { el } = this.state;

        return el;
    }
}

export default ReactImageAppear;