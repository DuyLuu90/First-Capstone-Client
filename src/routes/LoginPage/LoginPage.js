import React, {Component} from 'react'
import LoginForm from '../../components/Forms/LoginForm'

export default class LoginPage extends Component {
    render() {
        return (
            <div className='LoginPage'>
                <h2>Login</h2>
                <LoginForm/>
            </div>
        )
    }
}