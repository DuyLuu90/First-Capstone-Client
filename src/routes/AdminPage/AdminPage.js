import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';

import AddMovieForm from '../../components/Forms/AddMovieForm'
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
            artists:[]
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

    handleAddMovieSuccess = (user) => {
        const { history } = this.props
        history.push('/admin')
    }
    renderSummaryPage(){
        return (
            <div>
                
            </div>
        )
    }

    renderMovieForm(){
        return <AddMovieForm onSuccess={this.handleAddMovieSuccess}/> 
    }
    renderMovieList(){
        return this.state.movieList.map((movie,index)=>MovieBox(movie,index))
    }
    renderUserList(){
        const icons= [{name:'folder-open'},{name:'edit'},{name:'user-lock'},{name:'trash'}]
        const path='/users/'
        return this.state.userList.map((user,index)=>InfoBox(user,index,icons,path,true))
    }
    renderArtistList(){
        const icons= [{name:'folder-open'},{name:'edit'},{name:'trash'}]
        const path='/artists/'
        return this.state.artists.map((artist,index)=>InfoBox(artist,index,icons,path,true))
    }

    activeTab= (e)=>{
        let activeTabs= document.getElementsByClassName('active')
        if (activeTabs.length > 0) {
            activeTabs[0].className = activeTabs[0].className.replace("active","");
            }
        e.target.className += " active";    
        console.log('clicked',e.target.className)         
    }

    render() {
        return (
            <>
                <h2 className ='AdminPage_header'>PAGE MANAGEMENT</h2>
                <div className='AdminPage'>
                    <nav id='admin_nav'>
                        <Link to='/admin/movies'className='tab'onClick={this.activeTab}>MOVIES LIST</Link>
                        <Link to='/admin/users'className='tab'onClick={this.activeTab}>USERS LIST</Link>
                        <Link to='/admin/artists'className='tab'onClick={this.activeTab}>ARTISTS</Link>
                        <Link to='/admin/reports'className='tab'onClick={this.activeTab}>REPORTS</Link>
                        <Link to='/admin/add'className='tab'onClick={this.activeTab}>RECENTLY ADDED </Link>
                        <Link to='/admin/addMovie'className='tab'onClick={this.activeTab}>NEW MOVIE FORM </Link>
                    </nav>
                    <div className='admin_content'>
                        <Route path={'/admin/addMovie'} component={()=>this.renderMovieForm()}/> 
                        <Route path={'/admin/movies'} component={()=>this.renderMovieList()}/> 
                        <Route path={'/admin/artists'} component={()=>this.renderArtistList()}/> 
                        <Route path={'/admin/users'} render={()=>this.renderUserList()}/> 
                    </div>
                </div>
            </>
        
        )
    }
}
