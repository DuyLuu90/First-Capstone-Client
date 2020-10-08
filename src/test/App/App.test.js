import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../components/App/App'

import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'


describe.only(`App Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    });

    it('Snapshot test-Prevent unexpected change', () => {
//render the component and create a human-readable JSON file
        const myRenderedElement= renderer.create(
        <BrowserRouter>
            <App />
        </BrowserRouter>).toJSON();
//compare the rendered component to a saved version of the component 
        expect(myRenderedElement).toMatchSnapshot();
    })

})
