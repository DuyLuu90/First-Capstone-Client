import React from 'react'
//import {pnk} from 'react-router-dom'
import './Movie.css'

export function MovieDetails({movie}) {
    return (
        <div className='movie_details'>
            <div>
                <h2>{movie.title} ({movie.year})</h2>
                <p>
                    <span>{movie.genres}</span>
                    <span>{' '}{'|'}{' '}({movie.country})</span>
                </p>
            </div>
            <div className='movie_visual'>
                <div className='left'>
                    <img alt='movie poster' className='movie_poster' src={movie.posterurl}/>
                </div>
                <div className='right'>
                    <iframe  alt='movie video' title={movie.title}className='movie_video' src={movie.trailerurl}/>  
                </div> 
                
            </div>
            <div className='movie_content'>
                <p><span>DIRECTOR:</span>{' '}</p>
                <p><span>CAST:</span>{' '}</p>
                <p><span>SUMMARY:</span> {movie.summary}</p>
            </div>
        </div>
    )
}