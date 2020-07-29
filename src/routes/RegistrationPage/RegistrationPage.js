import React, { Component } from 'react'
//import { div } from '../../components/Utils/Utils'
import RegistrationForm from '../../components/Forms/RegistrationForm'
import {UserApiServices} from '../../services/api-service'

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }
  state= {
    user: {},
    error: null,
  }

  componentDidMount(){

  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, last_name, username, password,
    country, birth_year,gender } = ev.target

    const data= {
      first_name: first_name.value, last_name: last_name.value, 
      username: username.value, password: password.value,
      gender: gender.value,
      country: country.value, age: 2020-birth_year.value,
    }
    
    this.setState({error:null})

    UserApiServices.postUser(data)
    .then(user=>{
      first_name.value=''
      last_name.value= ''
      username.value = ''
      password.value = ''
      gender.value=''
      country.value=''
      birth_year.value=''
      this.props.history.push('/login')
    })
    .catch(res=>{
      this.setState({error: res.error})
    })
  }

  render() {
    return (
      <div className='RegistrationPage'>
        <h2>Register</h2>
        <RegistrationForm
          handleSubmit={this.handleSubmit}
          error={this.state.error}
        />
      </div>
    )
  }
}
