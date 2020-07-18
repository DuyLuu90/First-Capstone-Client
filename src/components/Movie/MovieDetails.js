import React from 'react'
import {Link} from 'react-router-dom'
import './Movie.css'

export function MovieDetails({movie}) {
    return (
        <div className='movie_details'>
            <div className='left'>
                <div className='movie_poster' style={{
                    backgroundImage:`url(${movie.poster})`
                }}>MOVIE POSTER</div>
                <div className='movie_trailer'>
                    <Link to={movie.trailer}>
                        WATCH TRAILER
                    </Link>
                </div>
                
            </div>
            <dvi className='right'>
                <h2>{movie.title}</h2>
                <ul>
                    <li><span>DIRECTOR:</span>{movie.director}</li>
                    <li><span>CAST:</span>{movie.cast.toString()}</li>
                    <li><span>YEAR:</span>{movie.year}</li>
                    <li><span>COUNTRY:</span>{movie.country}</li>
                    <li><span>GENRES:</span>{movie.genres}</li>
                </ul>
            </dvi>
        </div>
    )
}