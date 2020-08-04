import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';

import AutoComplete from '../../components/AutoComplete/AutoComplete'
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
        history: {push: () => {},},
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
                {name:'edit', method: ()=>props.history.push(`/admin/edit/movies/${movie.id}`) },
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
                {name:'edit',method: ()=>props.history.push(`/admin/edit/users/${user.id}`)},
                {name:'trash'},
                {name:'user-lock'}]
            return InfoBox(user,index,icons,path,true)
        })
    }
    renderArtistList(props){
        const path='/artists/'
        return this.state.artists.map((artist,index)=>{
            const icons= [
                {name:'folder-open'},
                {name:'edit',method: ()=>props.history.push(`/admin/edit/artists/${artist.id}`)},
                {name:'trash'}]
            return InfoBox(artist,index,icons,path,true)})
    } 
    renderForms(props){
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
                {this.state.displayMovieForm? <MovieForm {...props}/>: <ArtistForm onSuccess={this.onChangeArtist} {...props}/> }
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
    onChangeArtist=()=>{
        GeneralApiServices.getAllItems('artists').then(json=>{
            this.setState({artists:json})
        }).then(()=>this.props.history.push('/admin/artists'))
        //this.props.history.push('/admin/artists')
    }

    render() {
        return (
            <>
                <h2 className ='AdminPage_header'>
                    <Link to='/admin'> PAGE MANAGEMENT</Link>
                </h2>
                <div className='AdminPage'>
                    <nav id='admin_nav'>
                        <Link to='/admin/movies'className='tab'onClick={this.activeTab}>MOVIES</Link>
                        <Link to='/admin/artists'className='tab'onClick={this.activeTab}>ARTISTS</Link>
                        <Link to='/admin/users'className='tab'onClick={this.activeTab}>USERS</Link>
                        <Link to='/admin/reports'className='tab'onClick={this.activeTab}>REPORTS</Link>
                        <Link to='/admin/forms'className='tab'onClick={this.activeTab}>FORMS </Link>
                        <Link to='/admin/add'className='tab'onClick={this.activeTab}>RECENTLY ADDED </Link>
                    </nav>
                    <div className='admin_content'>
                        <Route exact path={'/admin'} component={AutoComplete}/> 
                        <Route path={'/admin/forms'} component={(props)=>this.renderForms(props)}/> 
                        <Route path={'/admin/movies'} component={(props)=>this.renderMovieList(props)}/> 
                        <Route path={'/admin/artists'} component={(props)=>this.renderArtistList(props)}/> 
                        <Route path={'/admin/users'} render={(props)=>this.renderUserList(props)}/> 
                        <Route path={'/admin/edit/movies/:id'} component={MovieForm}/>
                        <Route path={'/admin/edit/artists/:id'} component={(props)=>{
                            return <ArtistForm {...props} onSuccess={this.onChangeArtist}/>
                        }}/>
                    </div>
                </div>
            </>
        
        )
    }
}
