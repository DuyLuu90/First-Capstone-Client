import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
import './footer-style.css'

export default class Footer extends Component{
    render(){
        return (
            <footer className='app_footer'> 
                <div>
                    <FontAwesomeIcon className='icon' icon='copyright'/>
                    <span>{' '}Duy Luu 2020</span>
                </div>
                <a href='mailto:duyluu90@hotmail.com'aria-label='email' target='_blank' rel="noopener noreferrer"><FontAwesomeIcon className='icon' icon='envelope'/>
                            {' '}{' '}EMAIL ME
                </a>   
            </footer>
        )
    }
}