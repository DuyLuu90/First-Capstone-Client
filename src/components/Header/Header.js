import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
//import TokenService from '../../services/token-service'
import './Header.css'


export default class Header extends Component {
    static defaultProps= {
        onLogoutSuccess: ()=>{},
        token: {}
    }

    renderLogoutLink(){
        return(
            <div className='Header-logged-in'>
                <Link onClick={this.props.onLogoutSuccess} to='/'>Logout</Link>
                <Link to={'/users/'+this.props.token.userid} className='blue'>{this.props.token.first_name}</Link>
                {this.props.token.isAdmin && <Link to='/admin'> Admin</Link> }
            </div>
        )
    }
    renderLoginLink(){
        return(
            <div className='Header-not-logged-in'>
                <Link to='/login'>Log in </Link>
                <Link to='/register' > Sign up</Link>
                {this.props.token.isAdmin && <Link to='/admin'> Admin</Link> }
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
                {(this.props.token.hasAuthToken)
                ? this.renderLogoutLink()
                : this.renderLoginLink()}    
            </nav>
        )
    }
}