import React, { Component } from 'react'
import './Form.css'
//import AuthApiService from '../../services/auth-api-service'
import {ProfileBox} from '../Admin_Utils/utils'
import {CountryList,BirthYear} from '../Admin_Utils/utils'
import {GeneralApiServices} from '../../services/api-service'

export default class ArtistForm extends Component {
    static defaultProps = {
        onSuccess: () => {},
        match: {params:{}},
        history: {},
    }
    constructor(props) {
        super(props)
        this.state={
            error: '',
            displayForm: true,
            artist: {
                full_name: '',
                avatar: '',
                title: '',
                birth_year: '',
                country: ''
            },
        }
    }
    
    componentDidMount(){
        const id= Number(this.props.match.params.id)
        if(id) GeneralApiServices.getItemById('artists',id).then(json=>this.setState({artist:json}))
    }
    onChangeArtist=e=>{
        const key= e.target.name;
        const newValue= e.target.value;
        this.setState({artist:{...this.state.artist,[key]:newValue}})
    }
    displayForm=e=>this.setState({displayForm:true})
    displayPreview=e=>this.setState({displayForm:false})

    handleSubmit = ev => {
        ev.preventDefault()
        const {full_name,avatar,title,birth_year,country} = ev.target
        const data = {
            "full_name": full_name.value,
            "avatar": avatar.value,
            "title": title.value,
            "birth_year": birth_year.value,
            "country": country.value
        }
        const id= Number(this.props.match.params.id)
        if (id) {
            /*
            for (let key of ['full_name', 'avatar', 'title', 'birth_year',
            'country']) {
                if(!data[key]) delete data[key]
            }*/
            GeneralApiServices.patchItemById('artists',id,data)
                .then(()=>{
                    full_name.value= ''
                    avatar.value=''
                    title.value=''
                    country.value=''
                    birth_year.value= ''
                    this.props.onSuccess()
                    //this.props.history.push('/admin/artists')
                })
                .catch(err=>this.setState({error: err.message}))
        }
        else {
            GeneralApiServices.postItem('artists',data)
            .then(artist=>{
                full_name.value= ''
                avatar.value=''
                title.value=''
                country.value=''
                birth_year.value= ''
                this.props.onSuccess()
                //this.props.history.push('/admin/artists')  
            })
            .catch(err=>this.setState({error: err.message}))
        }
        
         
    }
    renderArtistForm(){
        const {artist}= this.state
        const countries= CountryList()
        const years= BirthYear()
        const country= (artist.country)? artist.country: ''
        const year= (artist.birth_year)? artist.birth_year: ''
        const title= (artist.title)? artist.title: ''
        return(
            <div>
                <div className='full_name'>
                    <input name='full_name' required type='text' id='full_name'
                        value={artist.full_name} className='main_input'
                        onChange={this.onChangeArtist}/>
                </div>
                <div>
                    <header>Avatar</header>
                    <textarea name='avatar'type='text' id='avatar'
                    defaultValue={artist.avatar}rows='2'onChange={this.onChangeArtist}/>
                </div>
                <div className='otherInfo'>
                    
                    <div className='country'>
                        <header>Country</header>
                        <select id="country" name="country"value={country}onChange={this.onChangeArtist}>
                            {countries}
                        </select>
                    </div>
                    <div className='birth_year'>
                        <header>Birth Year</header>
                        <select id='birth_year'name='birth_year'value={year}onChange={this.onChangeArtist}>
                            {years} 
                        </select>
                    </div>
                    <div className='title'>
                        <header>Title</header>
                        <select id='title'name='title'value={title} onChange={this.onChangeArtist}>
                            <option value="Director">Director</option>
                            <option value="Actor">Actor</option>
                            <option value="Actress">Actress</option>
                        </select>
                    </div>
                </div>
                <div className='form_control'>
                    <input type='button' value='Cancel'
                        onClick={()=>this.props.history.push('/admin')}/>
                    <input type="submit" value='SAVE' id='new_movie'/>
        </div>
            </div>
        )

    }
    render(){
        const {error,displayForm}= this.state
        const form = this.renderArtistForm()
        const preview= <ProfileBox person={this.state.artist}/>
        return(
            <form className='form ArtistForm' onSubmit={this.handleSubmit}>
                <div className='formNav'>
                    <button type='button' onClick={this.displayPreview} className={!displayForm?'active':''}>Preview</button> 
                    <button type='button' onClick={this.displayForm} className={displayForm?'active':''}>Form</button> 
                </div>
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
                {displayForm? form : preview}
            </form>
        )
    }
}