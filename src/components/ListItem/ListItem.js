import React, {Component} from 'react'
import { Link} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ListItem.css'
import { MovieApiServices } from '../../services/api-service';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state= {
            movieList: [],
            displayAll: false
        }
    }
    componentDidMount(){
        MovieApiServices.getMoviesByGenres(this.props.genres)
            .then(json=> this.setState({movieList: json}))
    }
    handleMoreButton= e =>{
        e.preventDefault()
        this.setState({displayAll: true})
    }
    handleLessButton= e =>{
        e.preventDefault()
        this.setState({displayAll: false})
    }
    render() {
        //const items= this.props.list.items.slice(0,this.props.numberOfDisplay)
        //const items = this.state.movieList.slice(0,this.props.numberOfDisplay)
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
                    <h2>{this.props.title}</h2>
                    {nav}
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
ListItem.defaultProps = {
    
    list: {
        title: '',
        url:'',
        items: []
    },
    numberOfDisplay: 3,
}