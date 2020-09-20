import React, { Component } from 'react'
import './Form.css'
import TokenService from '../../services/token-service'
import {GeneralApiServices,AuthApiServices} from '../../services/api-service'
//import AuthApiServices from '../../services/auth-api'


export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  }
  state = { 
    userList:[],
    error: null,
    displayForm:1,
    usernameMessage:'',
    passwordMessage:''
  }

  componentDidMount(){
    GeneralApiServices.getAllItems('users').then(json=>{
      this.setState({userList: json})
    })
  }

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
    const { username,password} = ev.target
    AuthApiServices.postLogin({username: username.value,password: password.value,})
      .then(res=>{
          username.value= ''
          password.value=''
          TokenService.saveAuthToken(res.authToken)
          this.props.onLoginSuccess()
          this.props.history.goBack()
          /*
          const{location,history}=this.props
          const destination=(location.state||{}).from || '/'
          history.push(destination)*/
      })
      .catch(res=>{
          this.setState({error: res.error})
      })
  }
  handleLoginReady=()=>this.setState({displayForm:1, usernameMessage:'',passwordMessage:''})
  handleForgotUsernameClicked=()=>this.setState({displayForm:2})
  handleForgotPasswordClicked=()=>this.setState({displayForm:3})

  handleForgotUsernameSubmitted=(e)=>{
    e.preventDefault()
    const {first_name,last_name,birth_year}= e.target
    const first= first_name.value.toLowerCase()
    const last= last_name.value.toLowerCase()
    const birth= Number(birth_year.value)
    const user= this.state.userList.find(u=>{
      const first_name= u.first_name.toLowerCase()
      const last_name=u.last_name.toLowerCase()
      return first_name===first && last_name===last && u.age===(2020-birth)
    })
    const message= (user)? `Hooray, we found you. Your username is ${user.username}`
                        : `Sorry, we cound not find your information. Please try it again!`
    this.setState({usernameMessage: message})
  }
  handleForgotPasswordSubmitted=(e)=>{
    e.preventDefault()
    this.setState({passwordMessage:`Your password has been reset and sent to your email on file.`})
  }
  renderForgotUserNameForm(){
    const message= (this.state.usernameMessage)? <span className='error'>{this.state.usernameMessage}</span>: ''
    return(
      <form className='form' onSubmit={this.handleForgotUsernameSubmitted}>
        <h3>Let's help find your username</h3>
        <div>
          <header>First name:</header>
          <input type='text'name='first_name'></input>
          <header>Last Name:</header>
          <input type='text'name='last_name'></input>
          <header>Birth Year:</header>
          <input type='number' name='birth_year'></input>
        </div>
        {message}
        <div className='form_control'>
          <button type='button'onClick={this.handleLoginReady}>Go back</button>
          <button type='submit'>Find me</button>
        </div>
      </form>
    )
  }
  renderForgotPasswordForm(){
    const {passwordMessage}= this.state
    //const boolean= (passwordMessage)? true: false
    const message= (passwordMessage)? <span className='error'>{passwordMessage}</span>: ''
    return (
      <form className='form' onSubmit={this.handleForgotPasswordSubmitted}>
          <h3>Reset your password</h3>
          <div>
            <header>Enter your username:</header>
            <input type='text'name='first_name'></input>
          </div>
          {message}
          <div className='form_control'>
          <button type='button'onClick={this.handleLoginReady}>Go back</button>
          <button type='submit' disabled={passwordMessage}>Reset password</button>
        </div>
      </form>
    )
  }
  renderLoginForm(){
    return (
      <form className='form LoginForm'onSubmit={this.handleSubmitJwtAuth}>
        <h2>Login</h2>
        <div className='username'>
          <input required name='username' id='LoginForm__user_name' placeholder='User name'/>
        </div>
        <div className='password'>
          <input required name='password'type='password'id='LoginForm__password' autoComplete='off'
          placeholder='Password'/>
        </div>
        <div className='displayPassword'>
            <input type="checkbox" id="togglePassword"
              onClick={()=>{
                const password= document.getElementById('LoginForm__password')
                if(password.type==='password') password.type='text'
                else password.type='password'
              }}
            />
            <label htmlFor="togglePassword">show password</label> 
        </div>
        <div className='form_help'>
            <span onClick={this.handleForgotUsernameClicked}>Forgot username</span>{' | '}
            <span onClick={this.handleForgotPasswordClicked}>Forgot password</span>{' | '}
        </div>
        <div className='form_control'>
            <input type='submit' value='Log in'/>
        </div>
          
      </form>
    )
  }

  render() {
    const { error,displayForm } = this.state
    const form = (displayForm===1)? this.renderLoginForm()
                : (displayForm===2)? this.renderForgotUserNameForm()
                : (displayForm===3)? this.renderForgotPasswordForm(): ''
    return (
      <div id='help-me-login'>
          <div role='alert'>
            {error && <p className='error'>{error}</p>}
          </div>
          {form}
      </div>
    )
  }
}
