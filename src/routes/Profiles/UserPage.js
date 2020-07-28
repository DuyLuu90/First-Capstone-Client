import React, {Component} from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import ControlButtons from '../../components/Misc/ControlButtons'
import {ProfileBox} from '../../components/Admin_Utils/utils'
//import {UserApiServices} from '../../services/api-service'
import {GeneralApiServices} from '../../services/api-service'
import './Profile.css'

export default class UserPage extends Component {
    
    state= {
        user: {username:'',firs_name:'',last_name:'',country:'',gender:''},
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
    
    render(){
        const profileBox= ProfileBox(this.state.user)
        return (
            <div className='Profile_Page'>
                {profileBox}
                <div className='profile_content'>
                    <h2>My favorite movies :</h2>
                </div>
            </div>
        )
    }
}