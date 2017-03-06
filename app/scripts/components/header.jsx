import React from 'react';
import Perspective from './perspective';

class Header extends React.Component {
    render() {
        return (
            <div className="block">
                <div onMouseMove={Perspective.do} onMouseLeave={Perspective.stop} className="header block__inner p3d">
                    <h3>Mike Sudyn</h3>
                    <h1>Front-End Developer</h1>
                    <p>Location: Kyiv, Ukraine</p>
                    <p>Skype: mike.sudyn</p>
                    <p>Email: mike.sudyn@gmail.com</p>
                    <img src="images/me.png"/>
                </div>
            </div>
        );
    }
}

export default Header;
