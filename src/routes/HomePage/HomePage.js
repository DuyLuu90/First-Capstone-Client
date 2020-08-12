import React, { Component } from 'react'
import ListItem from '../../components/ListItem/ListItem'

export default class HomePage extends Component {
    render(){
        return(
            <>
                <ListItem sort='?genres=Film' title= 'Film List'/>
                <ListItem sort='?genres=TV Series' title= 'TV Series'/>
            </>
        )
    }
}