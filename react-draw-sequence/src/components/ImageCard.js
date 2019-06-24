import React from 'react';

export default class ImageCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            backgroundColor: 'red',
            imageId: 20
        };
    }

    render() {
        return <li class="image-card">
            <div style={{backgroundColor: this.state.backgroundColor}}>
                <p class="image-card-title">{ this.state.imageId + 1 }</p>
            </div>
          </li>;
    }
}
