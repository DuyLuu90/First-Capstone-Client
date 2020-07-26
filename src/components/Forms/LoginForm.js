import React, { Component } from 'react'
import './Form.css'
import TokenService from '../../services/token-service'
import AuthService from '../../services/auth-api'


export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }
  state = { error: null }

  handleSubmitBasicAuth = ev => {
    ev.preventDefault()
    const { username, password } = ev.target
    TokenService.saveAuthToken(TokenService.makeBasicAuthToken(username.value,password.value))
      .then(()=>{
        username.value = ''
        password.value = ''
        this.props.onLoginSuccess()
      })
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({error: null})
    const { username,password} = ev.target

    AuthService.postLogin({username: username.value,password: password.value,})
      .then(res=>{
          username.value= ''
          password.value=''
          TokenService.saveAuthToken(res.authToken)
          this.props.onLoginSuccess()
      })
      .catch(res=>{
          this.setState({error: res.error})
      })
    }

  render() {
    const { error } = this.state
    return (
      <form className='form LoginForm'
        //onSubmit={this.handleSubmitBasicAuth}
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='error'>{error}</p>}
        </div>
        <div className='username'>
          <input required name='username' id='LoginForm__user_name' placeholder='User name'/>
        </div>
        <div className='password'>
          <input required name='password'type='password'id='LoginForm__password' placeholder='Password'/>
          <div className='display'>
            <input type="checkbox" id="togglePassword"
              onClick={()=>{
                const password= document.getElementById('LoginForm__password')
                if(password.type==='password') {
                    password.type='text'
                }
                else password.type='password'
              }}
            />
            <label htmlFor="togglePassword">show password</label> 
          </div>
        </div>
        <div className='form_control'>
            <input type='submit' value='Log in'/>
        </div>
          
      </form>
    )
  }
}
