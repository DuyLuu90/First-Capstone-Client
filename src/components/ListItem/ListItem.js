import React, {Component} from 'react'
import { Link} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ListItem.css'
import { MovieApiServices } from '../../services/api-service';

export default class ListItem extends Component {
    static defaultProps= {
        match:{params:{}}
    }
    state= {
        movieList: [],
        displayAll: false,
        genres: this.props.match.params.genres,
        country: this.props.match.params.country,
        title: this.props.title,
    }
    
    componentDidMount(){
        if (this.state.country) {
            const country= this.state.country.replace('-',' ')
            const title= 'Movies | '+ country
            MovieApiServices.getMoviesByCountry(country)
                .then(json=>this.setState({
                    movieList: json,
                    title: title,
                    displayAll: true
                }))
        }
        else if (this.state.genres) {
            const genres= this.state.genres.replace('-',' ')
            const title= 'Movies | '+ genres
            MovieApiServices.getMoviesByGenres(genres)
                .then(json=>this.setState({
                    movieList: json,
                    title: title,
                    displayAll: true
                }))
        }
        else {
            MovieApiServices.getMoviesByGenres(this.props.genres)
            .then(json=> this.setState({movieList: json}))
        }  
    }

    handleMoreButton= e =>this.setState({displayAll: true})
    handleLessButton= e =>this.setState({displayAll: false})

    render() {
        let nav;
        let items;

        if (!this.state.displayAll) {
            nav= <span onClick={this.handleMoreButton}>More{' '}{'>>'}</span>
            items= this.state.movieList.slice(0,3)
        }
        else {
            nav= <span onClick={this.handleLessButton}>{'<<'} {' '}Less</span>
            items= this.state.movieList
        }

        return (
            <div className='list'>
                <header>
                    <h2>{this.state.title}</h2>
                    {!this.props.displayAll && nav}
                </header>
                <div className='ListItem'>
                    {items.map((item,index)=>
                        <div className='item' key={index}>
                            <div className='poster' >
                                <img alt='movie poster' className='movie_poster' src={item.posterurl}/>
                            </div>
                            <Link to={'/movies/'+ item.id}>{item.title}</Link>
                        </div>
                    )}   
                </div>
            </div>
        )
    }
}
