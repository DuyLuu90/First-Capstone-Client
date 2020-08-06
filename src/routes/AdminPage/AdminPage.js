import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';

import AutoComplete from '../../components/AutoComplete/AutoComplete'
import MovieForm from '../../components/Forms/MovieForm'
import ArtistForm from '../../components/Forms/ArtistForm'
import {MovieBox,InfoBox,PopUpMessage,UserPage} from '../../components/Admin_Utils/utils'
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
            displayMovieForm: true,
            displayPopup: false,
            itemToDelete:{dbName:'', id:''}
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
    renderMainPage(){
        return (
            <div className='summary'>
                <AutoComplete />
            </div>
        )
    }
    renderPopUpMessage(){
        const {dbName,id}= this.state.itemToDelete
        const action = {
            handleYes: ()=>this.deleteItem(dbName,id),
            handleNo: ()=> this.setState({
                            itemToDelete:{dbName:'', id:''},
                            displayPopup: false})     
        }
        const message= 'This item will be permanently deleted. Continue?'
        const popup= PopUpMessage(message,action)
        return popup
    }
    renderMovieList(props={}){
        return this.state.movieList.map(movie=>{
            const icons=[
                {name:'edit', method: ()=>props.history.push(`/admin/edit/movies/${movie.id}`) },
                {name:'trash',method: ()=> this.handleDeleteClicked('movies',movie.id) }
            ]
            return MovieBox(movie,movie.id,icons)
        })
    }
    renderUserList(props){
        const path='/users/'
        return this.state.userList.map((user,index)=>{
            const icons= [
                {name:'edit',method: ()=>props.history.push(`/admin/edit/users/${user.id}`)},
                {name:'trash', method:()=>this.handleDeleteClicked('users',user.id)},
                {name:'user-lock'}]
            return InfoBox(user,index,icons,path,true)  
        })
    }
    renderArtistList(props){
        const path='/artists/'
        return this.state.artists.map((artist,index)=>{
            const icons= [
                {name:'edit',method: ()=>props.history.push(`/admin/edit/artists/${artist.id}`)},
                {name:'trash', method:()=>this.handleDeleteClicked('artists',artist.id)}]
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
                {this.state.displayMovieForm
                ? <MovieForm onSuccess={this.onChangeMovie}{...props}/>
                : <ArtistForm onSuccess={this.onChangeArtist}{...props}/>}
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
    }
    onChangeMovie=()=>{
        GeneralApiServices.getAllItems('movies').then(json=>{
            this.setState({movieList:json})
        }).then(()=>{
            GeneralApiServices.getAllItems('artists').then(json=>{
                this.setState({artists:json})
            })
        }).then(()=>this.props.history.push('/admin/movies'))
    }
    handleDeleteClicked=(dbname,id)=>{
        this.setState({
            displayPopup: true, itemToDelete: {dbName: dbname, id: id}
        })
    }
    deleteItem=(dbName,id)=>{
        const key = (dbName==='movies')? 'movieList'
                    :(dbName==='artists')? 'artists'
                    :(dbName==='users')? 'userList' :''
        GeneralApiServices.DeleteItemById(dbName,id).then(()=>{
            GeneralApiServices.getAllItems(dbName).then(json=>this.setState({
                [key]:json,
                itemToDelete:{dbName:'', id:''},
                displayPopup: false,
            }))
        })
    }
    render() {
        const popup= this.renderPopUpMessage()
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
                        {this.state.displayPopup && popup}
                        <Route exact path={'/admin'} component={()=>this.renderMainPage()}/> 
                        <Route path={'/admin/forms'} component={(props)=>this.renderForms(props)}/> 
                        <Route path={'/admin/movies'} component={(props)=>this.renderMovieList(props)}/> 
                        <Route path={'/admin/artists'} component={(props)=>this.renderArtistList(props)}/> 
                        <Route path={'/admin/users'} render={(props)=>this.renderUserList(props)}/> 
                        <Route path={'/admin/edit/movies/:id'} component={(props)=>{
                            return <MovieForm {...props} onSuccess={this.onChangeMovie}/>
                        }}/>
                        <Route path={'/admin/edit/artists/:id'} component={(props)=>{
                            return <ArtistForm {...props} onSuccess={this.onChangeArtist}/>
                        }}/>
                        <Route path={'/admin/edit/users/:id'} component={(props)=>{
                            const id= Number(props.match.params.id)
                            const user= this.state.userList.find(user=>user.id===id)
                            const handleSubmit = (ev)=>{
                                ev.preventDefault()
                                const {password,block_list} = ev.target
                                const boolean= (block_list.value==='true')? true: false
                                const data = (password.value)
                                            ? {password: password.value,block_list: boolean}
                                            : {block_list: boolean}
                                GeneralApiServices.patchItemById('users',id,data)
                                    .then(()=>{
                                        password.value=''
                                        props.history.goBack()
                                    })
                                    .catch(err=>console.log(err))
                            }
                            const userPage= UserPage(props,user,handleSubmit)
                            return userPage
                        }}/>
                    </div>
                </div>
            </>
        
        )
    }
}
