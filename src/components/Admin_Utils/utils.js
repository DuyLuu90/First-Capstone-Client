import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  femaleProfile from '../../resources/female-profile.png'
import  maleProfile from '../../resources/male-profile.png'
import  unFlag from '../../resources/un-flag.png'
import {countryList} from '../../resources/countryList'
import './utils.css'

export function MovieBox(movie={},id,icons) {
    const genres= movie.genres || []
    const buttons= ControlButtons(icons)
    return (
        <div className='box' key={id}>
            <div className='boxNav'>
                <h3>{movie.title}</h3>
                {buttons}
            </div>
            <div className='boxFooter'>
                <span>{movie.country}{' | '}{movie.year}{' | '}{genres.join(' ')}</span>
            </div>
        </div>
    )   
}
export function InfoBox(person,index,icons=[],path='',boolean) {
    const buttons= ControlButtons(icons)
    const name= (person.full_name) ? person.full_name : person.first_name+' '+person.last_name
    const defaultAvatar= (person.gender==='Female') ? femaleProfile: maleProfile
    
    const miniAvatar= <img className='mini-avatar'alt='avatar' 
    src={(person.avatar) ? person.avatar :defaultAvatar}/>
    const header= (boolean)? <h2><Link to={path+person.id} aria-label='profile-page'>{name}</Link></h2>:<h1>{name}</h1>
    const flag= (person.country)? `https://www.countryflags.io/${person.country}/flat/64.png`: ''

    return(
        <div className='basicInfo' key={index}>
            <header>
                {boolean && miniAvatar}
                {header}
                <img className='flag' alt='flag'src={flag} onError={(e)=>{
                    e.target.onError= null;
                    e.target.src= unFlag
                }}></img>
                {buttons}
            </header>
            <div>
                {(person.title)&&<span>{person.title}{' | '}</span>}  
                {(person.birth_year)&&<span>Born:{' '}{person.birth_year}{' | '}</span>}
                {(person.age)&&<span>Age:{' '}{person.age}{' | '}</span>}
                {(person.title)
                ?<span><Link to={'/artists/country/'+person.country}aria-label='artist-list'>{person.country}</Link>{' | '}</span>
                :<span>{person.country}{' | '}</span>}
                {(person.username)&&<span>Username:{' '}{person.username}{' | '}</span>}
            </div>
        </div>
    )
}
export function ProfileBox(props){
    const person= props.person || {}
    const defaultAvatar= (person.gender==='Female') ? femaleProfile: maleProfile
    const box= InfoBox(person)
    
    return (
        <div className='profile'>
            <img className='avatar'alt='avatar' 
                src={(person.avatar) ? person.avatar :defaultAvatar}/>
            <div className='info'>
                {box}
                {props.boolean && <button onClick={props.handleEdit}>Edit</button>}
            </div>
               
        </div>
    )
}
export function UserPage(props,user={}, handleSubmit=()=>{}) {
    return (
        <form className='form userPage' onSubmit={handleSubmit}>
            <div>
                <header>Full Name:</header>
                <span>{user.first_name}{' '}{user.last_name}</span>
            </div>
            <div>
                <header>Username:</header>
                <span>{user.username}</span>
            </div>
            <div>
                <header>Age/Country/Gender:</header>
                <span>{user.age}{' | '}{user.country}{' | '}{user.gender}{' | '}</span>
            </div>
            <div>
                <header>Password:</header>
                <input name='password'type='text' id='passwordReset'/>
            </div>
            <div>
                <header>Add to Blocked List</header>
                <select  name='block_list'>
                    <option value='false'>False</option>
                    <option value='true'>True</option>
                </select>
            </div>
            <div className='form_control'>
                <input type='button' value='Cancel'
                    onClick={()=>props.history.push('/admin/users')}/>
                <input type="submit" value='SAVE'/>
                <input type='button' value='Reset PASS' onClick={()=>{
                    const randomPass= Math.random().toString(36).substring(2,6)+ '@'+ Math.random().toString(36).substring(2,6)
                    document.getElementById('passwordReset').value=randomPass
                }}/>
            </div>
        </form>
    )
}
export function ReviewControlButtons(){
    return (
        <div>
            <FontAwesomeIcon className='control_icons' icon='ThumbsUp'/>
            <FontAwesomeIcon className='control_icons'icon='thumbs-down'/>
            <span>Reply</span>
        </div>
    )
}
export function ControlButtons(icons=[{name:''}]){
    return(
        <div className='control_icons'>
            {icons.map((icon,index)=>
                <FontAwesomeIcon key={index} className='control_icon' 
                icon={icon.name} onClick={icon.method}/>)}
        </div>
    )
}
export function PopUpMessage(message,action) {
    return(
        <div className='popup'>
            <div>{message}</div>
            <div className='buttons'>
                <button onClick={action.handleYes}>YES</button>
                <button onClick={action.handleNo}>NO</button>
            </div>
        </div>
    )
}
export function NoAuthTokenMessage(){
    return (
        <div className='noAuth'>
            <Link to={'/login'}aria-label='login-page'>LOG IN{' '}</Link> or <Link to={'/register'}aria-label='registration-page'>REGISTER{' '}</Link> to post reviews
        </div>
    )
}
function createArray(from,to){
    let array=[]
    for (let i=from; i>=to; i--){
        array.push(i)
    }
    return array
}

export function BirthYear(){
    const array= createArray(2005,1905)
    const options= array.map(i=><option key={i} value={i}>{i}</option>)
    return (
        <>{options}</>
    )  
}
export function MovieYear(){
    const array= createArray(2020,1980)
    const options= array.map(i=><option key={i} value={i}>{i}</option>)
    return (
        <>{options}</>
    )  
}
export function CountryList(){
    const options= countryList.map((obj,i)=><option key={i} value={obj.code}>{obj.name}</option>)
    return (
        <optgroup label="List of countries (A-Z)" id='countryGroup2'>
            {options}
        </optgroup>
    )
}
