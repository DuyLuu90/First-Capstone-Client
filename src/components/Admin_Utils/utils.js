import React from 'react'
import ControlButtons from '../Misc/ControlButtons'
import './utils.css'



export function MovieBox(movie,key) {
    const d= new Date(movie.last_modified).toDateString()
    
    return (
        <div className='box' key={key}>
            <div className='boxNav'>
                <h3>{movie.title}({movie.year})</h3>
                <ControlButtons icons={[
                    {name:'folder-open'},{name:'edit'},{name:'trash'}]}/>
            </div>
            <div className='boxFooter'>
                <span>{movie.country}</span>
                <span>Modified on {d}</span>
            </div>
            <div>{movie.genres.join(' ')}</div>
        </div>
    )   
}

export function UserBox(user,key) {
    return(
        <div className='box' key={key}>
            <div className='boxNav'>
                <h3>{user.first_name}{' '}{user.last_name}{' '}({user.age},{user.country}) </h3>
                <ControlButtons icons={[
                    {name:'folder-open'},
                    {name:'edit'},
                    {name:'user-lock'},
                    {name:'trash'}]}/>
            </div>
            <div className='boxFooter'>
                <span>Username: {user.username}</span>
                <span>Reports: {user.reports} </span>
            </div>
        </div>
    )
}