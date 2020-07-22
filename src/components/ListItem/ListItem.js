import React, {Component} from 'react'
import { Link} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ListItem.css'

export default class ListItem extends Component {
    render() {
        const items= this.props.list.items.slice(0,this.props.numberOfDisplay)
        let nav;
        if (this.props.numberOfDisplay < this.props.list.items.length) {
            nav = <Link to={this.props.list.url}>More{' '}{'>>'}</Link>
        } else {
            nav = <Link to='/'>{'<<'} {' '}Go Back</Link>
        }
        return (
            <div className='list'>
                <header>
                    <h2>{this.props.list.title}</h2>
                    {nav}
                </header>
                <div className='ListItem'>
                    {items.map((item,index)=>
                        <div className='item' key={index}>
                            <div className='poster' style={{backgroundImage:`url(${item.poster})`}}>
                                MOVIE POSTER
                            </div>
                            <Link to={item.url}>{item.title}</Link>
                        </div>
                    )}   
                </div>
            </div>
        )
    }
}
ListItem.defaultProps = {
    
    list: {
        title: '',
        url:'',
        items: []
    },
    numberOfDisplay: 3,
}