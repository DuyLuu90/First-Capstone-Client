/* eslint-disable */
import React, { Component } from 'react'
import './Form.css'

//import PropTypes from 'prop-types'
import {ValidationError,validateName,validateUsername,validatePassword} from './form-helpers'
import {GeneralApiServices,UserApiServices} from '../../services/api-service'
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
    country: {value:this.props.user.country},
    gender: {value:this.props.user.gender},
    birth_year: {value: 2020-this.props.user.age}
  }

  componentDidMount(){
    GeneralApiServices.getAllItems('users').then(json=>{
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

  render() {
    const usernameError= (this.props.user && !this.state.username.value)
      ? false
      : (this.props.user.username===this.state.username.value) ? false
      : validateUsername(this.state.userList,this.state.username.value)
    const passwordError= (this.props.user && !this.state.password.value)
      ? false
      : validatePassword(this.state.password.value)
    const nameError= (this.props.user && (!this.state.first_name.value||!this.state.last_name.value))
      ? false 
      : validateName(this.state.first_name.value,this.state.last_name.value)
    
    const error= this.props.error
    const countries= CountryList()
    const years= BirthYear()
    const submitButton= (this.props.user)? 'Save' : 'Register'
    
    
    return (
      <form className='form RegistrationForm'
        onSubmit={this.props.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='error'>{()=>error}</p>}
        </div>

        <div className='full_name'>
          <input name='first_name'placeholder='First name' type='text' id='first_name'
            defaultValue={this.state.first_name.value}
            onClick={this.hideStatusMessage}
            onChange={this.onChange}
          />
          <input name='last_name' placeholder='Last name' type='text' id='last_name'
            value={this.state.last_name.value}
            onClick={this.hideStatusMessage}
            onChange={this.onChange}
          />
        </div>
        {(this.state.first_name.touch||this.state.last_name.touch) &&<ValidationError message={nameError}/>}

        <div className='username'>
          <input name='username'placeholder='New username'type='text' id='user_name'
            value={this.state.username.value}
            onClick={this.hideStatusMessage}
            onChange={this.onChange}
          />
        </div>
        {this.state.username.touch && <ValidationError message={usernameError}/>}

        <div className='password'>
          <input name='password' placeholder='New password'type='password' id='password'
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

        <div className='year'>
          <h3>Birth year:</h3>
          <select name="birth_year" id='birth_year' disabled={this.state.birth_year.value}
          defaultValue={this.state.birth_year.value}>
              {years}
          </select>
          
        </div>

        <div className='gender'>
            <h3>Gender</h3>
            <select id='gender' name='gender' defaultValue={this.state.gender.value}>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to answer</option>
            </select>
        </div>

        <div className='country'>
            <h3>Country</h3>
            <select id="country" name="country" className="form-control"
            defaultValue={this.state.country.value}>
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
          <input type='button' value='Cancel'
            onClick={this.props.handleCancel}/>
          <input type="submit" value={submitButton}
            disabled={
              (nameError)||(passwordError)||(usernameError)
            }
          />
        </div>
        
      </form>
    )
  }
}
