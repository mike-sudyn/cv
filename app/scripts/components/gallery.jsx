import React from 'react';
import { connect } from 'react-redux'
import { galleryPlay, galleryStop, galleryPrev, galleryNext } from '../actions/actions';

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.dispatch = props.dispatch;
        this.loaderTime = 5000;
        this.loaderTimer = null;
        this.loaderSubTimer = null;

        this.startLoader = this.startLoader.bind(this);
        this.restartLoader = this.restartLoader.bind(this);
        this.stopLoader = this.stopLoader.bind(this);
    };

    componentDidMount() {
        this.startLoader();
    };

    startLoader () {
        this.dispatch(galleryPlay());
        this.loaderTimer = setTimeout( () => {
            this.dispatch(galleryNext());
            this.restartLoader();
        }, this.loaderTime);
    };

    restartLoader () {
        this.stopLoader();
        this.loaderSubTimer = setTimeout( () => {
            this.startLoader();
        }, 100);
    };

    stopLoader () {
        this.dispatch(galleryStop());
        if ( this.loaderTimer !== null ) {
            clearTimeout( this.loaderTimer );
            this.loaderTimer = null;
        }
        if ( this.loaderSubTimer !== null ) {
            clearTimeout( this.loaderSubTimer );
            this.loaderSubTimer = null;
        }
    };

    render() {
        const { gallery, dispatch } = this.props;

        return (
            <div className={gallery.loader ? 'gallery block gallery--loader' : 'gallery block'}>
                <div onMouseLeave={this.startLoader} onMouseEnter={this.stopLoader} className="gallery__inner block__inner">
                    <h1>Portfolio</h1>
                    <div className="gallery__body">
                        {gallery.projects && gallery.projects.map((project, i) =>
                            <div className={gallery.active === i ? 'gallery__item gallery__item--active' : 'gallery__item'} key = {i}>
                                <div className="gallery__item__image p3d" style={{backgroundImage: 'url(' + project.image + ')'}}>
                                    <div className="gallery__loader"></div>
                                </div>
                                <p className="gallery__item__title">{project.title}</p>
                                <p className="gallery__item__body">{project.text}</p>
                            </div>
                        )}
                    </div>
                    <button onClick={()=>dispatch(galleryPrev())} className="gallery__button gallery__button--left">&#10092;</button>
                    <button onClick={()=>dispatch(galleryNext())} className="gallery__button gallery__button--right">&#10093;</button>
                </div>
            </div>
        );
    }
}

export default connect(state=>state)(Gallery);
