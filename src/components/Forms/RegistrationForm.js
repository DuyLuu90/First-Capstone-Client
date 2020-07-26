/* eslint-disable */
import React, { Component } from 'react'
import './Form.css'

import PropTypes from 'prop-types'
import {ValidationError,validateName,validateUsername,validatePassword} from './form-helpers'

import {UserApiServices}  from '../../services/api-service'
//import AuthApiService from '../../services/auth-api'
import {CountryList,BirthYear} from '../Admin_Utils/utils'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
    user: {
      id:'',first_name:'',last_name:'',
      username:'', password: '',
      country:'', gender:'', birth_year:'',block_list:'',
      last_modified:''
    }
  }

  state = { 
    error: null, statusMessage: false,
    userList:[],
    first_name:{value: this.props.user.first_name, touch: false}, 
    last_name:{value: this.props.user.last_name, touch: false},
    username:{value: this.props.user.username, touch: false}, 
    password:{value: this.props.user.password, touch: false},
  }

  componentDidMount(){
    UserApiServices.getAllUsers().then(json=>{
      this.setState({userList: json})
    })
  }
  onChange=e=> {
    const key= e.target.name;
    const newValue= e.target.value;
    this.setState({[key]:{value:newValue,touch:true}})
  }

  hideStatusMessage=()=>{
    this.setState({statusMessage:false})
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, last_name, username, password,nick_name,
    country, birth_year,gender } = ev.target
    
    const data= {
      first_name: first_name.value, last_name: last_name.value, 
      username: username.value, password: password.value,
      nick_name: nick_name.value, gender: gender.value,
      country: country.value, age: 2020-birth_year.value,
    }
    
    this.setState({error:null})
    UserApiServices.postUser(data)
    .then(user=>{
      first_name.value=''
      last_name.value= ''
      user_name.value = ''
      password.value = ''
      nick_name.value = ''
      gender.value=''
      country.value=''
      birth_year.value=''
      this.props.onRegistrationSuccess()
    })
    .catch(res=>{
      this.setState({error: res.error})
    })
   
  }

  render() {
    const { error } = this.state
    const countries= CountryList()
    const years= BirthYear()
    const nameError= validateName(this.state.first_name.value,this.state.last_name.value)
    const passwordError= validatePassword(this.state.password.value)
    const usernameError= validateUsername(this.state.userList,this.state.username.value)
    return (
      <form className='form RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='error'>{()=>error}</p>}
        </div>

        <div className='full_name'>
          <input name='first_name'placeholder='First name' type='text'required id='first_name'
            onClick={this.hideStatusMessage}
            onChange={this.onChange}
          />
          <input name='last_name' placeholder='Last name' type='text'required id='last_name'
            onClick={this.hideStatusMessage}
            onChange={this.onChange}
          />
        </div>
        {(this.state.first_name.touch||this.state.last_name.touch) &&<ValidationError message={nameError}/>}

        <div className='username'>
          <input name='username'placeholder='New username'type='text'required id='user_name'
            onClick={this.hideStatusMessage}
            onChange={this.onChange}
          />
        </div>
        {this.state.username.touch && <ValidationError message={usernameError}/>}

        <div className='password'>
          <input name='password' placeholder='New password'type='password'required id='password'
            onClick={this.hideStatusMessage}
            onChange={this.onChange}
          /> 
          <div className='display'>
            <input type="checkbox" id="togglePassword"
              onClick={()=>{
                const password= document.getElementById('password')
                if(password.type==='password') {
                    password.type='text'
                }
                else password.type='password'
              }}
            />
            <label htmlFor="togglePassword">show password</label> 
          </div>
        </div>
        
        {this.state.password.touch && <ValidationError message={passwordError}/>}

        <div className='nick_name'>
          <input name='nick_name'placeholder='Nickname (optional)'type='text' id='nick_name'/>
        </div>

        <div className='year'>
          <h3>Birth year:</h3>
          {years}
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
            <select id="country" name="country" className="form-control">
              <optgroup label="Most Popular">
                  <option value="US">United States</option>
                  <option value="CN">China</option>
                  <option value="JP">Japan</option>
                  <option value="VN">Viet Nam</option>
                  <option value="KR">South Korea</option>
              </optgroup>
              {countries}
            </select>
        </div>
        
        <div className='form_control'>
          <input type='button' value='Back'
            onClick={()=>this.props.history.goBack()}/>
          <input type="submit" value="Register"
            disabled={
              (nameError)||(passwordError)||(usernameError)
            }
          />
        </div>
        
      </form>
    )
  }
}
