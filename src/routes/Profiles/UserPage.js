import React, {Component} from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import ControlButtons from '../../components/Misc/ControlButtons'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import {ProfileBox} from '../../components/Admin_Utils/utils'
import RegistrationForm from '../../components/Forms/RegistrationForm'
//import {UserApiServices} from '../../services/api-service'
import {GeneralApiServices} from '../../services/api-service'
import './Profile.css'

export default class UserPage extends Component {
    static defaultProps={
        match:{params:{}},
    }
    
    state= {
        user: {username:'',firs_name:'',last_name:'',country:'',gender:''},
        displayForm: false
    }
    
    componentDidMount(){
        GeneralApiServices.getItemById('users',this.props.match.params.id)
        .then(json=>this.setState({user:json}))
    }
    
    componentDidUpdate(prevProps){
        if(this.props.match.params.id !== prevProps.match.params.id) {
            GeneralApiServices.getItemById('users',this.props.match.params.id)
            .then(json=>this.setState({user:json}))
        }
    }

    handleSubmit = ev => {
        ev.preventDefault()
        const { first_name, last_name, username, password,
        country,gender } = ev.target
    
        let data= {
          first_name: first_name.value, last_name: last_name.value, 
          username: username.value, password: password.value,
          gender: gender.value,
          country: country.value, 
          last_modified: new Date().toLocaleString('en',{timeZone:'UTC'})
        }
        for (let key of ['first_name', 'last_name', 'username', 'password',
            'country','gender']) {
            if(!data[key]) delete data[key]
        }
        
        this.setState({error:null})
    
        GeneralApiServices.patchItemById('users',this.props.match.params.id,data)
            .then(user=>{
                first_name.value=''
                last_name.value= ''
                username.value = ''
                gender.value=''
                country.value=''
                
            })
            .catch(res=>this.setState({error:res.error}))
        this.onSubmitSuccess()
      }

    onSubmitSuccess= ()=>{
        GeneralApiServices.getItemById('users',this.props.match.params.id)
        .then(json=>this.setState({
            user:json,
            displayForm: false
        }))
    }

    handleEdit= ()=>this.setState({displayForm: true})
    handleCancel=()=>this.setState({displayForm:false})
    
    renderPage(){
        const userId= Number(this.props.currentUserid)
        const currentUserid= Number(this.props.match.params.id)
        const boolean= userId===currentUserid
        //const icons= (boolean) ? [{name:'edit'},] :[]
        //console.log(icons)
        //const profileBox= ProfileBox(this.state.user,icons,boolean)
        return (
            <div className='Profile_Page'>
                <ProfileBox person={this.state.user} boolean={boolean} handleEdit={this.handleEdit} />

                {this.state.displayForm && <RegistrationForm user={this.state.user} handleCancel={this.handleCancel}
                handleSubmit={this.handleSubmit}/>}
    
                <div className='profile_content'>
                    <h2>My favorite movies :</h2>
                </div>
            </div>
        )
    }
    render(){
        const Page= (this.state.user.id)? this.renderPage(): <NotFoundPage/>
        return Page
    }
}