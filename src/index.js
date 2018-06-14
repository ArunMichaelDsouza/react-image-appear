import React from 'React';

const parseComputedDimensions = el => {
    return {
        width: Number(window.getComputedStyle(el).width.match(/\d+/)),
        height: Number(window.getComputedStyle(el).height.match(/\d+/))
    };
}, createContainer = (el, width, height) => {
    return <div style={{ width, height, background: '#aaa' }}>{el}</div>
};

const onLoad = function () {
    console.log('loaded');
}

class ReactImageAppear extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            img: null
        };

        this.getImageDimensions = this.getImageDimensions.bind(this);
    }

    componentDidMount() {
        const { src } = this.props;

        this.setState({ img: React.createElement('img', { src, onLoad }) });
    }

    getImageDimensions(imgEl) {
        const dimensionsInterval = setInterval(() => {
            const { width, height } = parseComputedDimensions(imgEl);

            console.log(width, height);
            if (width && height) {
                clearInterval(dimensionsInterval);
                console.log('interval cleared');
                console.log(width, height);
                this.setState({ container: createContainer(imgEl, width, height) });
            }
        }, 10);
    }

    render() {
        const { img } = this.state;

        return img;
    }
}

export default ReactImageAppear;