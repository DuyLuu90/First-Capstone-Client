import React, {Component} from 'react'
import ControlButtons from '../Misc/ControlButtons'
import './utils.css'

//import {Link} from 'react-router-dom'

export default class UserBox extends Component {
    render(){
        return(
            <div className='box'>
                <div className='boxNav'>
                    <h3>{this.props.user.first_name}{' '}{this.props.user.last_name}</h3>
                    <ControlButtons icons={[
                        {name:'folder-open'},
                        {name:'edit'},
                        {name:'user-lock'},
                        {name:'trash'}]}/>
                </div>
                <div className='boxFooter'>
                    <span>Username: {this.props.user.username}</span>
                    <span>Age: {this.props.user.age}</span>
                    <span>Country: {this.props.user.country}</span>
                    <span>Reports:</span>
                </div>
            </div>
        )
    }
}