import React from 'react'
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
                        {review.user.first_name}{' '}{review.user.last_name}
                    </div>
                    <p className='review-details'>
                        <FontAwesomeIcon 
                            icon='quote-left'
                            className='review-icon'/>
                        <span className='review-text'>{review.text}</span>
                        <MovieStarRating rating={review.rating}/>
                    </p>
                </li>)}

        </ul>
    )
}