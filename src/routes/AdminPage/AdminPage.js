import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';

import MovieForm from '../../components/Forms/MovieForm'
import ArtistForm from '../../components/Forms/ArtistForm'
import {MovieBox,InfoBox} from '../../components/Admin_Utils/utils'
import './AdminPage.css'

import {GeneralApiServices} from '../../services/api-service'
//import {MovieApiServices,UserApiServices} from '../../services/api-service'

export default class AdminPage extends Component {
    constructor(props){
        super(props)
        this.state= {
            movieList: [],
            userList:[],
            artists:[],
            displayMovieForm: true
        }
    }

    static defaultProps = {
        history: {
        push: () => {},
        },
    }

    componentDidMount(){
        GeneralApiServices.getAllItems('movies').then(json=>{
            this.setState({movieList:json})
        })
        GeneralApiServices.getAllItems('users').then(json=>{
            this.setState({userList:json})
        })
        GeneralApiServices.getAllItems('artists').then(json=>{
            this.setState({artists:json})
        })
    }

    renderSummaryPage(){
        return (
            <div className='summary'>
                <div>MOVIES</div>
                <div></div>
                <div></div>   
            </div>
        )
    }

    renderMovieList(props={}){
        return this.state.movieList.map(movie=>{
            const icons=[
                {name:'edit', method: ()=>props.history.push(`/admin/movies/edit/${movie.id}`) },
                {name:'trash',method: ()=>props.history.push(`/admin/movies/delete/${movie.id}`) }
            ]
            return MovieBox(movie,movie.id,icons)
        })
    }
    renderUserList(props){
        const path='/users/'
        return this.state.userList.map((user,index)=>{
            const icons= [
                {name:'folder-open'},
                {name:'edit',method: ()=>props.history.push(`/admin/users/edit/${user.id}`)},
                {name:'trash'},
                {name:'user-lock'}]
            return InfoBox(user,index,icons,path,true)
        })
    }
    renderArtistList(){
        const icons= [{name:'folder-open'},{name:'edit'},{name:'trash'}]
        const path='/artists/'
        return this.state.artists.map((artist,index)=>InfoBox(artist,index,icons,path,true))
    } 

    renderForms(){
        const movieClass= (this.state.displayMovieForm)? 'highlighted': ''
        const artistClass= (!this.state.displayMovieForm)? 'highlighted':''
        return (
            <div className='forms'>
                <div className='forms_nav'>
                    <span className={movieClass} onClick={()=>this.setState({displayMovieForm:true})}>
                        ADD MOVIE
                    </span>
                    <span className={artistClass} onClick={()=>this.setState({displayMovieForm:false})} >
                        ADD ARTIST
                    </span>
                </div>
                {this.state.displayMovieForm? <MovieForm/>: <ArtistForm/> }
            </div>
        )
    }
    activeTab= (e)=>{
        let activeTabs= document.getElementsByClassName('active')
        if (activeTabs.length > 0) {
            activeTabs[0].className = activeTabs[0].className.replace("active","");
            }
        e.target.className += " active";            
    }

    render() {
        return (
            <>
                <h2 className ='AdminPage_header'>
                    <Link to='/admin'> PAGE MANAGEMENT</Link>
                </h2>
                <div className='AdminPage'>
                    <nav id='admin_nav'>
                        <Link to='/admin/movies'className='tab'onClick={this.activeTab}>MOVIES LIST</Link>
                        <Link to='/admin/users'className='tab'onClick={this.activeTab}>USERS LIST</Link>
                        <Link to='/admin/artists'className='tab'onClick={this.activeTab}>ARTISTS</Link>
                        <Link to='/admin/reports'className='tab'onClick={this.activeTab}>REPORTS</Link>
                        <Link to='/admin/add'className='tab'onClick={this.activeTab}>RECENTLY ADDED </Link>
                        <Link to='/admin/forms'className='tab'onClick={this.activeTab}>FORMS </Link>
                    </nav>
                    <div className='admin_content'>
                        <Route path={'/admin/forms'} component={()=>this.renderForms()}/> 
                        <Route exact path={'/admin/movies'} component={(props)=>this.renderMovieList(props)}/> 
                        <Route path={'/admin/movies/edit/:id'} component={MovieForm}/>
                        <Route path={'/admin/artists'} component={()=>this.renderArtistList()}/> 
                        <Route path={'/admin/users'} render={(props)=>this.renderUserList(props)}/> 
                    </div>
                </div>
            </>
        
        )
    }
}
