import React, {Component} from 'react'
import { Link} from 'react-router-dom'
import './Header.css'

export default class Header extends Component {
    render() {
        return (
            <nav className='Header'>
                <h1>
                    <Link to='/'>
                        DramaPEDIA
                    </Link>
                </h1>
                <div className='Header_not-logged-in'>
                    <Link to='/login'>Log in </Link>
                    <Link to='/register'> Sign up</Link>
                </div>

            </nav>
        )
    }
}