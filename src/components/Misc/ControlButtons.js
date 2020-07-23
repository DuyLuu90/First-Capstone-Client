import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ControlButtons(props){
    return(
        <div className='control_icons'>
            {props.icons.map((icon,index)=>
                <FontAwesomeIcon key={index} className='control_icon' icon={icon.name}/>)}
        </div>
    )
}

ControlButtons.defaultProps= {
    icons: [
        {name:'',path:''}
    ]
}