import React, { Component } from 'react'
import ListItem from '../../components/ListItem/ListItem'

export default class HomePage extends Component {
    render(){
        return(
            <>
                <ListItem genres='Film' title= 'Film List'/>
                <ListItem genres='TV Series' title= 'TV Series'/>
            </>
        )
    }
}