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
        displayForm: false,
        error: false
    }
    
    componentDidMount(){
        GeneralApiServices.getItemById('users',this.props.match.params.id)
        .then(json=>{
            if (json.error) this.setState({error:true})
            else this.setState({user:json})
        })
    }
    
    componentDidUpdate(prevProps){
        if(this.props.match.params.id !== prevProps.match.params.id) {
            GeneralApiServices.getItemById('users',this.props.match.params.id)
            .then(json=>{
                if (json.error) this.setState({error:true})
                else this.setState({user:json})
            })
        }
    }

    editSuccess= ()=>{
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
        
        return (
            <div className='Profile_Page'>
                <ProfileBox person={this.state.user} boolean={boolean} handleEdit={this.handleEdit} />

                {this.state.displayForm && <RegistrationForm user={this.state.user} handleCancel={this.handleCancel}
                editSuccess={this.editSuccess}/>}
    
                <div className='profile_content'>
                    <h2>My favorite movies :</h2>
                </div>
            </div>
        )
    }
    render(){
        const Page= (this.state.user.id)? this.renderPage(): <div/>
        const render= (!this.state.error)? Page: <NotFoundPage/>
        return render
    }
}