import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MovieStarRating from './MovieStarRating'
import './Movie.css'

export default function MovieReviews({reviews=[]}) {
    return (
        <ul className='movie_reviews'>
            {reviews.map(review=>
                <li key={review.id} className='review'>
                    <div className='review-user'>
                        <span className='Hyph'>{' - '}</span>
                        <Link to={'/users/'+review["user:id"]} className='userLink'>
                            {review['user:first_name']}{' '}{review['user:last_name']}
                        </Link> 
                    </div>
                    <p className='review-details'>
                        <FontAwesomeIcon 
                            icon='quote-left'
                            className='review-icon'/>
                        <span className='review-text'>{review.comment}</span>
                        <MovieStarRating rating={review.rating}/>
                    </p>
                </li>)}

        </ul>
    )
}