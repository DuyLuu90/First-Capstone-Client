import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
//import TokenService from '../../services/token-service'
import './Header.css'


export default class Header extends Component {

    renderLogoutLink(){
        return(
            <div className='Header-logged-in'>
                <Link onClick={this.props.onLogoutSuccess} to='/'>Logout</Link>
                <Link to={'/users/'+this.props.userid} className='blue'>{this.props.first_name}</Link>
                <Link to='/admin'> Admin</Link>
            </div>
        )
    }
    renderLoginLink(){
        return(
            <div className='Header-not-logged-in'>
                <Link to='/login'>Log in </Link>
                <Link to='/register' > Sign up</Link>
                <Link to='/admin'> Admin</Link>
            </div>
        )
    }
    render() {
        return (
            <nav className='Header'>
                <h1>
                    <Link to='/'>
                        <FontAwesomeIcon className='blue' icon='film'/>
                            {' '}{' '}DramaPEDIA
                    </Link>
                </h1>
                {(this.props.hasAuthToken)
                ? this.renderLogoutLink()
                : this.renderLoginLink()}    
            </nav>
        )
    }
}