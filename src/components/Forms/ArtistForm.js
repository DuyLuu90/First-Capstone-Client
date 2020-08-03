import React, { Component } from 'react'
import './Form.css'
//import AuthApiService from '../../services/auth-api-service'
import {ProfileBox} from '../Admin_Utils/utils'
import {CountryList,BirthYear} from '../Admin_Utils/utils'
import {GeneralApiServices} from '../../services/api-service'

export default class ArtistForm extends Component {
    static defaultProps = {
        onSuccess: () => {},
        match: {params:{}}
    }
    state={
        displayForm: true,
        artist: {
            full_name: 'Full Name',
            title: 'Actor',
            birth_year: 2050,
            country:'US'
        }
    }
    componentDidMount(){
        const id= Number(this.props.match.params.id)
        if(id) GeneralApiServices.getItemById(id).then(json=>this.setState({artist:json}))
    }
    onChangeArtist=e=>{
        const key= e.target.name;
        const newValue= e.target.value;
        this.setState({artist:{...this.state.artist,[key]:newValue}})
    }
    displayForm=e=>{
        this.setState({displayForm:true})
      }
      displayPreview=e=>{
        this.setState({displayForm:false})
      }
    renderArtistForm(){
        const {artist}= this.state
        const countries= CountryList()
        const years= BirthYear()
        return(
            <div>
                <div className='full_name'>
                    <input name='full_name' placeholder='Full Name' type='text' id='full_name'
                        value={artist.full_name}
                        onChange={this.onChangeArtist}/>
                </div>
                <div>
                    <header>Avatar</header>
                    <textarea name='avatar'type='text'required id='avatar'
                    defaultValue={artist.avatar}rows='2'onChange={this.onChangeArtist}/>
                </div>
                <div className='otherInfo'>
                    
                    <div className='country'>
                        <header>Country</header>
                        <select id="country" name="country"value={artist.country}onChange={this.onChangeArtist}>
                            {countries}
                        </select>
                    </div>
                    <div className='birth_year'>
                        <header>Birth Year</header>
                        <select id='birth_year'name='birth_year'value={artist.birth_year}onChange={this.onChangeMovie}>
                            {years} 
                        </select>
                    </div>
                    <div className='title'>
                        <header>Title</header>
                        <select id='title'name='title'value={artist.title} onChange={this.onChangeArtist}>
                            <option value="Director">Director</option>
                            <option value="Actor">Actor</option>
                            <option value="Actress">Actress</option>
                        </select>
                    </div>
                </div>
                <div className='form_control'>
                    <input type='button' value='Cancel'
                        onClick={this.props.handleCancel}/>
                    <input type="submit" value='SAVE' id='new_movie'/>
        </div>
            </div>
        )

    }
    render(){
        const form = this.renderArtistForm()
        const preview= <ProfileBox person={this.state.artist}/>
        return(
            <form className='Form MovieForm'>
                <div className='formNav'>
                    <button type='button' onClick={this.displayForm}>Form</button>
                    <button type='button' onClick={this.displayPreview}>Preview</button>  
                </div>
                {this.state.displayForm?form : preview}
            </form>
        )
    }
}