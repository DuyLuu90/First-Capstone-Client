import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import AutoComplete from '../../components/AutoComplete/AutoComplete'

describe(`AutoComplete Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <AutoComplete />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})
