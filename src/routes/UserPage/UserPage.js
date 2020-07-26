import React, {Component} from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ControlButtons from '../../components/Misc/ControlButtons'
import {UserApiServices} from '../../services/api-service'
import './UserPage.css'

export default class UserPage extends Component {
    state= {
        user: {
            username:'',
            firs_name:'',
            last_name:'',
            country:'',
            gender:''
        },
        avatar: 'https://painrehabproducts.com/wp-content/uploads/2014/10/facebook-default-no-profile-pic-300x300.jpg'
    }
    componentDidMount(){
        UserApiServices.getUserById(this.props.match.params.userId)
        .then(json=>{
            this.setState({user:json})
        })
        .then(()=>{
            if(this.state.user.gender==='Female') {
                this.setState({avatar:'https://fajslawice24.pl/wp-content/uploads/2014/09/Kontur-twarzy-kobiety.jpg'})
            }
        })
    }
    render(){
        return(
            <div className='UserPage'>
                <div className='userInfo'>
                    <img className='avatar'alt='avatar' src={this.state.avatar}/>
                    <div className='basicInfo'>
                        <header>
                            <h2>{this.state.user.first_name}{' '}{this.state.user.last_name}{' '}</h2>
                            <img alt='flag'src={"https://www.countryflags.io/"+this.state.user.country+"/flat/64.png"}></img>
                            <ControlButtons icons={[{name:'edit'},]}/>
                        </header>
                        <div>
                            <span>{this.state.user.username}{' '}</span>
                            <span>({this.state.user.age}{' '}{this.state.user.country})</span>
                        </div>
                    </div>
                </div>
                <div className='userFavorite'>
                    <h2>My Favorite Movie</h2>
                </div>

            </div>
        )
    }
}