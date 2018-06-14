import React from 'React';

const parseComputedDimensions = el => {
    return {
        width: Number(window.getComputedStyle(el).width.match(/\d+/)),
        height: Number(window.getComputedStyle(el).height.match(/\d+/))
    };
};

class ReactImageAppear extends React.Component {
    constructor(props) {
        super(props);

        this.getImageDimensions = this.getImageDimensions.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }

    componentDidMount() {
        const { img: imgEl } = this.refs;

        this.getImageDimensions(imgEl);
    }

    getImageDimensions(imgEl) {
        const dimensionsInterval = setInterval(() => {
            const { width, height } = parseComputedDimensions(imgEl);

            if (width && height) {
                clearInterval(dimensionsInterval);
                console.log('interval cleared');
                console.log(width, height);
            }
        }, 10);
    }

    onLoad() {
        console.log('loaded');
    }

    render() {
        return <img onLoad={this.onLoad} ref="img" src="https://newevolutiondesigns.com/images/freebies/tropical-beach-background-8.jpg" />
    }
}

export default ReactImageAppear;