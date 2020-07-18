import React, {Component} from 'react'
import ListItem from '../../components/ListItem/ListItem'
import {filmList,dramaList} from './AllLists'
import './List.css'

export default class AllListPage extends Component {
    render() {
        return (
            <div className='MovieListPage'>
                <ListItem list ={filmList}/>
                <ListItem list={dramaList}/>
            </div>
        )
    }
}

