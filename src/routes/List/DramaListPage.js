import React, {Component} from 'react'
import ListItem from '../../components/ListItem/ListItem'
import {dramaList} from './AllLists'
import './List.css'

export default class DramaList extends Component {
    render() {
        return (
            <div className='MovieListPage'>
                <ListItem list ={dramaList} numberOfDisplay={dramaList.items.length}/>
            </div>
        )
    }
}