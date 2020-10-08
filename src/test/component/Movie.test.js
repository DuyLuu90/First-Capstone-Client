import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import MovieDetails from '../../components/Movie/MovieDetails'
import MovieStarRating from '../../components/Movie/MovieStarRating'
import Review from '../../components/Movie/Review'

describe(`MovieDetails Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <MovieDetails />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})

describe(`MovieStarRating Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <MovieStarRating />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})

describe(`Review Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <Review />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})
