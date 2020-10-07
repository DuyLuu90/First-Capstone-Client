import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './Movie.css'



export default class MovieDetails extends Component {
    static defaultProps ={
        movie: {},
        cast:[],
        director:[]
    }
    /*
    addPassvive=(e)=>{
        document.getElementsByName('ytvideo').addEventListener('touchstart',this.touchstart,{passsive: false})
    }*/
    
    componentDidMount() {
        //document.getElementById('ytvideo').addEventListener('touchstart',this.touchstart,{passive:false})
        
    }
    componentWillUnmount(){
        //document.getElementById('ytvideo').removeEventListener('touchstart',this.touchstart)
    }
    
    render() {
        const {movie,cast,director}= this.props
        const genres= movie.genres || []
        const country= movie.country || ''

        const artistLink= (item,i)=><Link to={'/artists/'+item.id}key={i} aria-label='artist-page'>{item.name}{' '}</Link>

        const castList= cast.map((item,i)=>artistLink(item,i))
        const directorList= director.map((item,i)=>artistLink(item,i))
        const flag= `https://www.countryflags.io/${country}/flat/64.png`

        const genresList= genres.map((item,i)=><Link to={'/movies?genres='+ item}key={i} aria-label='sort-by-genres'>{item}{' '}</Link>)
        return (
            <div className='movie_details'>
                <div>
                    <h2>{movie.title} ({movie.year})</h2>
                    <div className='title_links'>
                        <span className='genresList'>{genresList}</span>
                        <Link to={'/movies?country='+ country.replace(' ','-')} aria-label='sort-by-country'>
                            <img className='flag' alt='flag'src={flag}/>
                        </Link>
                    </div>
                </div>
                <div className='movie_visual'>
                    <div className='right'>
                        <iframe  alt='movie video' title={movie.title}className='movie_video' 
                        src={movie.trailerurl} id='ytvideo' rel="preconnect"/>  
                    </div> 
                    <div className='left'>
                        <img alt='movie poster' className='movie_poster' src={movie.posterurl}/>
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