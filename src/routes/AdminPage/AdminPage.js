import React, { Component } from 'react'
//import { div } from '../../components/Utils/Utils'
import {Route, Link} from 'react-router-dom';
import AddMovieForm from '../../components/Forms/AddMovieForm'
//import MovieList from '../../components/Admin_Utils/MovieList'
import MovieBox from '../../components/Admin_Utils/MovieBox'
import UserBox from '../../components/Admin_Utils/UserBox'
import './AdminPage.css'

export default class AdminPage extends Component {
    static defaultProps = {
        history: {
        push: () => {},
        },
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
    renderMovieList(){
        const movieList=[
            {title:'DRAMA 1',year:2020,url:'movies/d1',modified:new Date()},
            {title:'DRAMA 2',year:2019,url:'movies/d2',modified:new Date()},
            {title:'DRAMA 3',year:2018,url:'movies/d3',modified:new Date()},
            {title:'FILM 4',year:2017,url:'movies/f4',modified:new Date()},
            {title:'FILM 5',year:2016,url:'movies/f5',modified:new Date()},
            {title:'FILM 6',year:2015,url:'movies/f6',modified:new Date()},
        ]
        return (
            <div className='admin_content'>
                <header>MOVIE LIST</header>
                <div>
                    {movieList.map((movie,index)=>(<MovieBox key={index} movie={movie}/>))}
                </div>
            </div>
        )
    }
    renderUserList(){
        const userList=[
            {first_name:'Mike',last_name:'Thompson',username:'mthompson',age: 18,country:'US',reports: 0},
            {first_name:'John',last_name:'Wong',username:'jwong',age: 18,country:'CN',reports: 0},
            {first_name:'Math',last_name:'Kim',username:'mkim',age: 18,country:'SK',reports: 0},
        ]
        return <div className='admin_content'>
                    <header>USER LIST</header>
                    <div>
                        {userList.map((user,index)=>(<UserBox key={index} user={user}/>))}
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
