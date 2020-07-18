import React, { Component } from 'react'
import './Form.css'
//import { button, input, Required } from '../Utils/Utils'
//import AuthApiService from '../../services/auth-api-service'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    //const { full_name, nick_name, user_name, password } = ev.target
  /*
    console.log('registration form submitted')
    console.log({ full_name, nick_name, user_name, password })
  
    this.setState({error:null})
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      full_name: full_name.value,
      nick_name: nick_name.value,
    })
    .then(user=>{
      full_name.value = ''
      nick_name.value = ''
      user_name.value = ''
      password.value = ''
      this.props.onRegistrationSuccess()
    })
    .catch(res=>{
      this.setState({error: res.error})
    })
   */ 
  }

  render() {
    const { error } = this.state
    return (
      <form className='form RegistrationForm'
        //onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='full_name'>
          <input name='first_name'placeholder='First name' type='text'required id='new_first_name'/>
          <input name='last_name' placeholder='Last name' type='text'required id='new_last_name'/>
        </div>

        <div className='user_name'>
          <input name='user_name'placeholder='New username'type='text'required id='new_user_name'/>
        </div>

        <div className='password'>
          <input name='password' placeholder='New password'type='password'required id='new_password'/>
        </div>

        <div className='nick_name'>
          <input name='nick_name'placeholder='Choose a nickname'type='text'required id='new_nick_name'/>
        </div>

        <div className='age'>
          <h3>Age</h3>
          <input name='nick_name'type='text'required id='new_age'/>
        </div>

        <div className='gender'>
            <h3>Gender</h3>
            <select id='gender' name='gender'>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to answer</option>
            </select>
        </div>

        <div className='country'>
            <h3>Country</h3>
            <select id="country" name="country" class="form-control">
            <optgroup label="Most Popular">
                <option value="US">United States</option>
                <option value="CN">China</option>
                <option value="JP">Japan</option>
                <option value="VN">Viet Nam</option>
                <option value="FR">France</option>
            </optgroup>
            <optgroup label="List of countries (A-Z)" id='countryGroup2'>
            </optgroup>
            </select>
        </div>
        <input type="submit" value="Register"id='new_register'/>
      </form>
    )
  }
}
