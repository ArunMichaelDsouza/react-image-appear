import React, { Component } from 'React';

class ReactImageAppear extends Component {
    constructor(props) {
        super(props);

        this.onLoad = this.onLoad.bind(this);
    }

    onLoad() {
        console.log('loaded');
    }

    render() {
        return <img onLoad={this.onLoad} />
    }
}

export default ReactImageAppear;