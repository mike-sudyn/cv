import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducers from './reducers/reducers'
import Header from './components/header.jsx';
import Gallery from './components/gallery.jsx';
import Skills from './components/skills.jsx';
import Education from './components/education.jsx';
import Video from './components/video.jsx';
import Decorations from './components/decorations.jsx';

let store = createStore(reducers);

ReactDOM.render(
    <div>
        <Header/>
        <Provider store = {store}>
            <Gallery />
        </Provider>
        <Skills/>
        <Video/>
        <Education/>
        <Decorations/>
    </div>,

    document.getElementById('wrapper')
);
