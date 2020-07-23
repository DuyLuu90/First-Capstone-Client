import React, {Component} from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MovieDetails } from '../../components/Movie/MovieDetails'
import MovieReviews from '../../components/Movie/MovieReviews'
import ReviewForm from '../../components/Forms/ReviewForm'

import {MovieApiServices} from '../../services/api-service'

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
        console.log(this.props.match.params.movieId)
        MovieApiServices.getMovieById(this.props.match.params.movieId).then(json=>{
            this.setState({movie: json})
        })
        const reviews= MovieApiServices.getMovieReviews()
        this.setState({reviews: reviews})
    }

    render() {
        return (
            <div className='MoviePage'>
                <MovieDetails movie= {this.state.movie}/>
                <MovieReviews reviews={this.state.reviews}/>
                <ReviewForm/>
            </div>
        )
    }
}