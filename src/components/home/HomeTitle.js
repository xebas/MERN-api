import React, { Component } from 'react';

class HomeTitle extends Component {
    render() {
        return (
            <div className='homeTitle'>
                <div className="title">
                    <p>App en </p>
                    <b>
                        <div className="innerTitle">
                            ReactJS<br />
                            NodeJS<br />
                            MongoDB<br />
                        </div>
                    </b>
                </div>
            </div>
        );
    }
}

export default HomeTitle;
