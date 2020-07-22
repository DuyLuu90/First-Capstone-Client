import React, {Component} from 'react'
import MovieBox from './MovieBox'

export default class MovieList extends Component {
    render(){
        const movieList=[
            {title:'DRAMA 1',year:2020,url:'movies/d1',modified:new Date()},
            {title:'DRAMA 2',year:2019,url:'movies/d2',modified:new Date()},
            {title:'DRAMA 3',year:2018,url:'movies/d3',modified:new Date()},
            {title:'FILM 4',year:2017,url:'movies/f4',modified:new Date()},
            {title:'FILM 5',year:2016,url:'movies/f5',modified:new Date()},
            {title:'FILM 6',year:2015,url:'movies/f6',modified:new Date()},
        ]
        return (
            <div className='admin_content'>
                <header>MOVIE LIST</header>
                <div>
                    {movieList.map((movie,index)=>(<MovieBox key={index} movie={movie}/>))}
                </div>
            </div>
        )
    }
}