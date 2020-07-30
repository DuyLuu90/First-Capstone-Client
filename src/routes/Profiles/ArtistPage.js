import React, {Component} from 'react'
import {Link} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import ControlButtons from '../../components/Misc/ControlButtons'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import {ProfileBox} from '../../components/Admin_Utils/utils'
import {GeneralApiServices,ArtistApiServices} from '../../services/api-service'
import './Profile.css'

export default class ArtistPage extends Component {
    state= {
        artist:{},
        movies: []
    }
    componentDidMount(){
        GeneralApiServices.getItemById('artists',this.props.match.params.id)
        .then(json=>this.setState({artist: json}))
        ArtistApiServices.getMoviesByArtist(this.props.match.params.id)
        .then(json=>this.setState({movies:json}))
    }
    renderPage(){
        const filmList= this.state.movies.map((movie,index)=>(
            <div key={index}>
                <span>{movie.year}</span>{' : '}
                <Link to={'/movies/'+movie.movieid}>{movie.title}</Link>
                
            </div>
        ))
        return(
            <div className='Profile_Page'>
                <ProfileBox person={this.state.artist}  />
                <div className='profile_content'>
                    <h2>Fillmography :</h2>
                    {filmList}
                </div>
            </div>
        )
    }
    render(){
        const Page= (this.state.artist.id)? this.renderPage(): <NotFoundPage/>
        return Page
    }
}