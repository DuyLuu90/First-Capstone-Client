import React, {Component} from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MovieDetails from '../../components/Movie/MovieDetails'
import MovieReviews from '../../components/Movie/MovieReviews'
import ReviewForm from '../../components/Forms/ReviewForm'

import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import {NoAuthTokenMessage} from '../../components/Admin_Utils/utils'
import {MovieApiServices} from '../../services/api-service'
import {GeneralApiServices} from '../../services/api-service'
/*
import TokenService from '../../services/token-service'
import AuthService from '../../services/auth-api'
*/

export default class MoviePage extends Component {
    constructor(props) {
        super(props)
        this.id=this.props.match.params.id
        this.state={
            movie: {},
            reviews:[],
            cast:[],
            director:[]
        }
    }
    static defaultProps = {
        match: {params:{}}
    }
    componentDidMount(){
        GeneralApiServices.getItemById('movies',this.id).then(json=>{
            this.setState({movie: json})
        })
        MovieApiServices.getMovieReviews(this.id).then(json=>{
            this.setState({reviews: json})
        })
        MovieApiServices.getMovieCast(this.id).then(json=>{
            this.setState({cast:json})
        })
        MovieApiServices.getMovieDirector(this.id).then(json=>{
            this.setState({director:json})
        })
    }
    onPostReviewSuccess=()=>{
        MovieApiServices.getMovieReviews(this.id).then(json=>{
            this.setState({reviews: json})
        })  
    }
    renderPage(){
        const noAuthMess = NoAuthTokenMessage()
        return (
            <div className='MoviePage'>
                <MovieDetails 
                    movie= {this.state.movie}
                    cast={this.state.cast}
                    director={this.state.director}/>
                {this.props.hasAuthToken
                ?<ReviewForm movieid={this.props.match.params.id} onSuccess={this.onPostReviewSuccess}/>
                : noAuthMess}
                <MovieReviews reviews={this.state.reviews}/>
            </div>
        )
    }

    render() {
        const MoviePage= (this.state.movie.id)? this.renderPage() : <NotFoundPage/>
        return MoviePage
    }
}