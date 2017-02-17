import React from 'react';
import Parallax from './parallax';

class Decorations extends React.Component {
    render() {
        return (
            <div className="decorations">
                <Parallax className="decorations__top" speed={1.8}></Parallax>
            </div>
        );
    }
}

export default Decorations;
