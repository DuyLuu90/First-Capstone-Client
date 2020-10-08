import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import ListItem from '../../components/ListItem/ListItem'

describe(`Footer Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <ListItem />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})
