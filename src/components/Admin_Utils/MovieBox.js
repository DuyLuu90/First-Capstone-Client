import React, {Component} from 'react'
import ControlButtons from '../Misc/ControlButtons'
import './utils.css'

//import {Link} from 'react-router-dom'

export default class MovieBox extends Component {
    render (){
        const d= new Date(this.props.movie.modified).toDateString()
        return (
            <div className='box'>
                <div className='boxNav'>
                    <h3>{this.props.movie.title}({this.props.movie.year})</h3>
                    <ControlButtons icons={[
                        {name:'folder-open'},{name:'edit'},{name:'trash'}]}/>
                </div>
                <div className='boxFooter'>
                    Modified on {d}
                </div>
            </div>
        )   
    }
}