import React, {Component} from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MovieDetails } from '../../components/Movie/MovieDetails'
import MovieReviews from '../../components/Movie/MovieReviews'
import ReviewForm from '../../components/Forms/ReviewForm'

export default class MoviePage extends Component {
    static defaultProps = {
        match: {params:{}}
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }
    renderMoviePage(){
        const movie={
            id:1,title:'MOVIE TITLE',poster:'https://poster1.com',trailer:'https://trailer1.com',
            director:'directorOne',cast:['actorOne','actressOne'],year: 2020, country:'US',genres:'Comedy'
        }
        const reviews=[
            {id:1,text:'This movie is amazing',movie_id:1,rating:5,
            user: {first_name:'Adam',last_name:'Smith'}},
            {id:2,text:'Not as expected.',movie_id:1,rating:2,
            user: {first_name:'Mike',last_name:'Hall'}}
        ]
        return <>
            <MovieDetails movie= {movie}/>
            <MovieReviews reviews={reviews}/>
            <ReviewForm/>
        </>
    }
    render() {
        let details= this.renderMoviePage()
        return (
            <div className='MoviePage'>
                {details}
            </div>
        )
    }
}