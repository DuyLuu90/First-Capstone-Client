import React, {Component} from 'react'
import { Link} from 'react-router-dom'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ListItem.css'
import { MovieApiServices } from '../../services/api-service';

export default class ListItem extends Component {
    static defaultProps= {
        match:{params:{}},
        location:{}
    }
    state= {
        movieList: [],
        displayAll: false,
        title: this.props.title,
        displayArrow: true,
        hasError: false
    }
    
    componentDidMount(){
        const sort= this.props.location.search
        if (sort) {
            const query= sort.slice(1).split('=')
            let name
            let value= query[1]
            if (query[0]==='country') {
                name=(value==='US') ? 'Domestic'
                    :(value==='CN') ? 'CDrama'
                    :(value==='JP') ? 'JDrama'
                    :(value==='VN') ? 'VDrama'
                    :(value==='KR') ? 'KDrama'
                    :'International'
            }
            else name = query[1].replace('%20',' ')
            const title= 'Movies | '+ name
            MovieApiServices.sortMovies(sort)
                .then(json=>this.setState({
                        movieList: json,
                        title: title,
                        displayAll: true,
                        displayArrow: false,
                })).catch(err=>this.setState({hasError: true}))
        }
        else {
            MovieApiServices.sortMovies(this.props.sort)
                .then(json=>this.setState({movieList:json}))
        }
    }

    handleMoreButton= e =>this.setState({displayAll: true})
    handleLessButton= e =>this.setState({displayAll: false})

    renderMovieList(){
        let nav;
        let items;

        if (this.state.displayAll) {
            items= this.state.movieList
            nav= (this.state.displayArrow)
                    ? <span onClick={this.handleLessButton}>{'<<'} {' '}Less</span>: ''
        }
        else {
            nav= <span onClick={this.handleMoreButton}>More{' '}{'>>'}</span>
            items= this.state.movieList.slice(0,3)
        }
        return (
            <div className='list'>
                <div className='list-control'>
                    <h2>{this.state.title}</h2>
                    {!this.props.displayAll && nav}
                </div>
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

    render() {
        const content= (!this.state.hasError)? this.renderMovieList(): <NotFoundPage/>
        return content
    }
}
