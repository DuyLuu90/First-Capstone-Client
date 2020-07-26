import React, {Component} from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MovieDetails } from '../../components/Movie/MovieDetails'
import MovieReviews from '../../components/Movie/MovieReviews'
import ReviewForm from '../../components/Forms/ReviewForm'

import {MovieApiServices} from '../../services/api-service'
/*
import TokenService from '../../services/token-service'
import AuthService from '../../services/auth-api'
*/

export default class MoviePage extends Component {
    constructor(props) {
        super(props)
        this.state={
            movie: {},
            reviews:[]
        }
    }
    static defaultProps = {
        match: {params:{}}
    }
    componentDidMount(){
        const id=this.props.match.params.movieId
        MovieApiServices.getMovieById(id).then(json=>{
            this.setState({movie: json})
        })
        MovieApiServices.getMovieReviews(id).then(json=>{
            this.setState({reviews: json})
        })
        
    }

    render() {
        return (
            <div className='MoviePage'>
                <MovieDetails movie= {this.state.movie}/>
                <ReviewForm movieid={this.props.match.params.movieId}/>
                <MovieReviews reviews={this.state.reviews}/>
            </div>
        )
    }
}