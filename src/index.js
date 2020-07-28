import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {library} from '@fortawesome/fontawesome-svg-core'
import './index.css';
import App from './components/App/App';

import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

import {
  faFilm,
  faUserLock,
  faFolderOpen,
  faEdit,
  faTrash,
  faArrowRight,
  faBookOpen,
  faComment,
  faGift,
  faGlobeAmericas,
  faListOl,
  faListUl,
  faPenAlt,
  faQuoteLeft,
  faStar as fasStar,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faFilm,
  faUserLock,
  faGift, // logo
  faListUl, // style: listicle
  faListOl, // style: howto
  faGlobeAmericas, // style: news
  faPenAlt, // style: interview
  faBookOpen, // style: story
  faComment,
  faQuoteLeft,
  farStar,
  fasStar,
  faArrowRight,
  faFolderOpen,
  faEdit,
  faTrash
)


ReactDOM.render(
<BrowserRouter>
  <App/>
</BrowserRouter>,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

