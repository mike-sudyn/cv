import ReactDOM from 'react-dom';

const perspective = function () {
    /**
     * Do 3d perspective
     * @param event, mouse move event
     * @return void
     */
    const do3d = function ( event ) {
        let element = event.currentTarget,
            layers = element.querySelectorAll( '.p3d' ),
            offsets = element.getBoundingClientRect(),
            width = element.clientWidth || element.offsetWidth || element.scrollWidth,
            height = element.clientHeight || element.offsetHeight || element.scrollHeight,
            offsetX = ( event.pageX - offsets.left ) / width,
            offsetY = ( event.pageY - offsets.top ) / height,
            x = ( event.pageX - offsets.left - window.scrollX ) - width / 2,
            y = ( event.pageY - offsets.top - window.scrollY ) - height / 2,
            xRotate = ( y - offsetY ) * 0.08 /* x tilt coefficient */,
            yRotate = ( offsetX - x ) * 0.05 /* y tilt coefficient */,
            layerTilt = 0.25 /* layer tilt coefficient */;

        ReactDOM.findDOMNode(element).style.transform = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)';

        for ( let i = 0; i < layers.length; i++ ) {
            ReactDOM.findDOMNode(layers[i]).style.transform = 'rotateX(' + ( xRotate * layerTilt ) + 'deg) rotateY(' + ( yRotate * layerTilt ) + 'deg) translateZ(200px)';
        }
    };

    /**
     * Stop perspective
     * @param event, mouse leave event
     * @return void
     */
    const stop = function ( event ) {
        const element = event.currentTarget;
        const layers = element.querySelectorAll( '.p3d' );

        ReactDOM.findDOMNode(element).style.transform = '';
        for ( let i = 0; i < layers.length; i++ ) {
            ReactDOM.findDOMNode(layers[i]).style.transform = '';
        }
    };

    return {
        do: do3d,
        stop: stop
    }
};

export default perspective();
