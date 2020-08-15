import React, {Component} from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MovieDetails from '../../components/Movie/MovieDetails'
import ReviewForm from '../../components/Forms/ReviewForm'
import Review from '../../components/Movie/Review'

import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import {NoAuthTokenMessage} from '../../components/Admin_Utils/utils'
import {MovieApiServices,GeneralApiServices} from '../../services/api-service'

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
        GeneralApiServices.sortItems('reviews',`movieid=${this.id}`).then(json=>{
            this.setState({reviews:json})
        })
        /*
        MovieApiServices.getMovieReviews(this.id).then(json=>{
            this.setState({reviews: json})
        })*/
        MovieApiServices.getMovieCast(this.id).then(json=>{
            this.setState({cast:json})
        })
        MovieApiServices.getMovieDirector(this.id).then(json=>{
            this.setState({director:json})
        })
    }
    onReviewChangeSuccess=()=>{
        MovieApiServices.getMovieReviews(this.id).then(json=>{
            this.setState({reviews: json})
        })  
    }
    renderReviewForm() {
        return(
            <div className='postReview'>
                <h2>Leave a review</h2>
                <ReviewForm movieid={this.id} onSuccess={this.onReviewChangeSuccess}/>
            </div>
        )
    }
    renderPage(){
        const {movie,cast,director,reviews}= this.state
        const ReviewForm= (this.props.hasAuthToken) ? this.renderReviewForm(): NoAuthTokenMessage()
        const MovieReviews= (reviews.length)
                        ? reviews.map(review=><Review key={review.id} review={review} onDeleteSuccess={this.onReviewChangeSuccess}/>) 
                        : <div className='error'>{'\xa0'.repeat(10)}This movie currently has no review...</div>
        return (
            <div className='MoviePage'>
                <MovieDetails movie= {movie} cast={cast} director={director}/>
                {ReviewForm}
                <div className='movie_reviews'>
                    {MovieReviews}
                </div>
            </div>
        )
    }

    render() {
        const MoviePage= (this.state.movie.id)? this.renderPage() : <NotFoundPage/>
        return MoviePage
    }
}