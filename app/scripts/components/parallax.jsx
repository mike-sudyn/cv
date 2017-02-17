import React from 'react';

class Parallax extends React.Component {
    constructor(props) {
        super(props);
        this.speed = this.props.speed ? this.props.speed : 4;
        this.calcTranslation = this.calcTranslation.bind(this);
    }

    componentDidMount () {
        window.addEventListener('scroll', this.throttle( this.calcTranslation, 10, this ) , false);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.calcTranslation)
    }

    calcTranslation () {
        let translateValue = window.scrollY * this.speed;
        this.refs.root.style.transform = 'skewY(15deg) translate3d(0px,' + translateValue + 'px, 0px)';
    }

    throttle ( func, wait, options ) {
        let context, args, result;
        let timeout = null;
        let previous = 0;
        if (!options) options = {};

        const later = function() {
            previous = options.leading === false ? 0 : Date.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            let now = Date.now();
            if (!previous && options.leading === false) previous = now;
            let remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if ( remaining <= 0 || remaining > wait ) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    }

    render () {
        return(
            <div className={this.props.className} ref={'root'}>
                {this.props.children}
            </div>
        )
    }
}

export default Parallax;
