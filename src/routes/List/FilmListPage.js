import React, {Component} from 'react'
import ListItem from '../../components/ListItem/ListItem'
import {filmList} from './AllLists'
import './List.css'

export default class FilmList extends Component {
    render() {
        return (
            <div className='MovieListPage'>
                <ListItem list ={filmList} numberOfDisplay={filmList.items.length}/>
            </div>
        )
    }
}