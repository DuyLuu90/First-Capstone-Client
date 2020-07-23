import React, { Component } from 'react'
//import { div } from '../../components/Utils/Utils'
import {Route, Link} from 'react-router-dom';
import {MovieApiServices} from '../../services/api-service'
import AddMovieForm from '../../components/Forms/AddMovieForm'
import {MovieBox,UserBox} from '../../components/Admin_Utils/utils'
import './AdminPage.css'

export default class AdminPage extends Component {
    constructor(props){
        super(props)
        this.state= {
            movieList: []
        }
    }

    static defaultProps = {
        history: {
        push: () => {},
        },
        movieList:[]
    }

    componentDidMount(){
        MovieApiServices.getAllMovies().then(json=>{
            this.setState({movieList:json})
        })
    }

    handleAddMovieSuccess = (user) => {
        const { history } = this.props
        history.push('/admin')
    }

    renderMovieForm(){
        return (<div className='admin_content'>
        <header>Add a new movie</header>
        <AddMovieForm onSuccess={this.handleAddMovieSuccess}/>
        </div>)
    }
    //{movieList.map((movie,index)=>(<MovieBox key={index} movie={movie}/>))}
    //{userList.map((user,index)=>(<UserBox key={index} user={user}/>))}

    renderMovieList(){
        
        return (
            <div className='admin_content'>
                <header>MOVIE LIST</header>
                <div>
                    {this.state.movieList.map((movie,index)=>MovieBox(movie,index))}
                </div>
            </div>
        )
    }
    renderUserList(){
        const userList= MovieApiServices.getAllUsers();
        return <div className='admin_content'>
                    <header>USER LIST</header>
                    <div>
                        {userList.map((user,index)=>UserBox(user,index))}
                    </div>
                </div>
    }

    render() {
        return (
            <>
                <h2 className ='AdminPage_header'>PAGE MANAGEMENT</h2>
                <div className='AdminPage'>
                    <nav className='admin_nav'>
                        <Link to='/admin/movies'>MOVIES LIST</Link>
                        <Link to='/admin/users'>USERS LIST</Link>
                        <Link to='/admin/reports'>REPORTS</Link>
                        <Link to='/admin/add'>RECENTLY ADDED </Link>
                        <Link to='/admin/addMovie'>NEW MOVIE FORM </Link>
                    </nav>
                    
                    <Route path={'/admin/addMovie'} component={()=>this.renderMovieForm()}/> 
                    <Route path={'/admin/movies'} component={()=>this.renderMovieList()}/> 
                    <Route path={'/admin/users'} render={()=>this.renderUserList()}/> 
                    
                </div>
            </>
        
        )
    }
}
