import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import LoginForm from '../../components/Forms/LoginForm'
import RegForm from '../../components/Forms/RegistrationForm'
import ReviewForm from '../../components/Forms/ReviewForm'
import MovieForm from '../../components/Forms/MovieForm'
import ArtistForm from '../../components/Forms/ArtistForm'

describe(`LoginForm Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <LoginForm />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})

describe(`RegForm Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <RegForm />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})

describe(`ReviewForm Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <ReviewForm />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})

describe(`MovieForm Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <MovieForm />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})

describe(`ArtistForm Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <ArtistForm />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})
