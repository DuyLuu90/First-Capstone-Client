import React, { Component } from 'react'
import './Form.css'
//import TokenService from '../../services/token-service'
//import AuthService from '../../services/auth-api-service'
//import { Button, Input } from '../Utils/Utils'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }
  state = { error: null }

  handleSubmitBasicAuth = ev => {
    ev.preventDefault()
    //const { user_name, password } = ev.target
    /*
    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value,password.value)
    )
    user_name.value = ''
    password.value = ''
    this.props.onLoginSuccess()*/
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    /*
    this.setState({error: null})
    const { user_name,password} = ev.target
    AuthService.postLogin({
      user_name: user_name.value,
      password: password.value,
    }).then(res=>{
      user_name.value= ''
      password.value=''
      TokenService.saveAuthToken(res.authToken)
      this.props.onLoginSuccess()
    }).catch(res=>{
      this.setState({error: res.error})
    })*/
  }

  render() {
    const { error } = this.state
    return (
      <form className='form LoginForm'
        //onSubmit={this.handleSubmitBasicAuth}
        //onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <input required name='user_name' id='LoginForm__user_name' placeholder='User name'/>
        </div>
        <div className='password'>
          <input required name='password'type='password'id='LoginForm__password' placeholder='Password'/>
          
        </div>
        <input type='submit' value='Log in'/>
          
      </form>
    )
  }
}
