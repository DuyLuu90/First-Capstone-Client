import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './Movie.css'

export default class MovieDetails extends Component {
    static defaultProps ={
        movie: {},
        cast:[],
        director:[]
    }
    
    render() {
        const {movie,cast,director}= this.props
        const genres= movie.genres || []
        const country= movie.country || ''

        const artistLink= (item,i)=><Link to={'/artists/'+item.id}key={i} aria-label='artist-page'>{item.name}{' '}</Link>

        const castList= cast.map((item,i)=>artistLink(item,i))
        const directorList= director.map((item,i)=>artistLink(item,i))

        const genresList= genres.map((item,i)=><Link to={'/movies?genres='+ item}key={i} aria-label='sort-by-genres'>{item}{' '}</Link>)
        return (
            <div className='movie_details'>
                <div>
                    <h2>{movie.title} ({movie.year})</h2>
                    <p>
                        {genresList}<span>{' '}{'|'}{' '}</span>
                        <Link to={'/movies?country='+ country.replace(' ','-')} aria-label='sort-by-country'>{country}</Link>
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
                    {(this.props.director.length!==0) && 
                        <div>
                            <h3>DIRECTOR</h3>
                            <div>
                                {directorList}
                            </div>
                        </div>
                    }
                    {(this.props.cast.length>0) && 
                        <div>
                            <h3>CAST</h3>
                            <div>
                                {castList}
                            </div>  
                        </div>
                    }
                    <div>
                        <h3>SUMMARY:</h3>
                        <div className='summary'>
                            {movie.summary}
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
    
}