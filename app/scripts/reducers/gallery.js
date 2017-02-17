import { projects } from '../components/projects.js';
import { GALLERY_PLAY, GALLERY_STOP, GALLERY_NEXT, GALLERY_PREV } from '../actions/actions'

let initialState = {
    active: 0,
    loader: false,
    projects: projects
};

function reducer ( state = initialState, action ) {
    let newState = {};

    switch (action.type) {
        case GALLERY_PLAY:
            newState = Object.assign( {}, state, {
                loader: true
            });
            break;
        case GALLERY_STOP:
            newState = Object.assign( {}, state, {
                loader: false
            });
            break;
        case GALLERY_NEXT:
            newState = Object.assign( {}, state, {
                active: state.active + 1 >= state.projects.length ? 0 : state.active + 1
            });
            break;
        case GALLERY_PREV:
            newState = Object.assign( {}, state, {
                active: state.active - 1 < 0 ? state.projects.length - 1 : state.active - 1
            });
            break;
        default: newState = state
    }

    return newState;
}

export default reducer;
