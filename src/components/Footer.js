import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <p>{(new Date().getFullYear())} © Web en ReactJS</p>
            </footer>
        );
    }
}

export default Footer;
