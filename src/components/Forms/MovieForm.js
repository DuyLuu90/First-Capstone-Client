import React, { Component } from 'react'
import './Form.css'
//import AuthApiService from '../../services/auth-api-service'
import {CountryList,MovieYear} from '../Admin_Utils/utils'
import MovieDetails from '../Movie/MovieDetails'
import {MovieApiServices,GeneralApiServices} from '../../services/api-service'

export default class MovieForm extends Component {
  
  static defaultProps = {
    onSuccess: () => {},
    match: {params:{}}
  }
  state = {
    id: this.props.match.params.id,
    error: null, displayForm: true,
    movie: {
      title:'',
      posterurl:'',
      trailerurl:'',
      summary:'',
      country:'',
      year:'',
      genres:''},
    cast:[],
    director:[]
  }
  componentDidMount(){
    const id= Number(this.props.match.params.id)
    if(id) {
      GeneralApiServices.getItemById('movies',id).then(json=>this.setState({movie: json}))
      MovieApiServices.getMovieCast(id).then(json=>this.setState({cast:json}))
      MovieApiServices.getMovieDirector(id).then(json=>this.setState({director:json}))
    }
  }

  onChange=e=> {
    const key= e.target.name;
    const newValue= e.target.value;
    this.setState({[key]:newValue})
  }
  onChangeMovie=e=> {
    const key= e.target.name;
    const newValue= e.target.value;
    this.setState({movie:{...this.state.movie,[key]:newValue}})
  }
  onChangeCheckBox=e=>{
    const val=e.target.value
    let genres= this.state.movie.genres || []
    
    if (!genres.includes(val)) genres.push(val)
    else genres= genres.filter(item=>item!==val)

    this.setState({movie:{...this.state.movie,genres: genres}})
  }

  renderMovieForm(){
    const {error,movie} = this.state
    const countries= CountryList()
    const years= MovieYear()
    const director= (this.state.director[0])? this.state.director[0].full_name :''
    const actor1= (this.state.cast.length)? this.state.cast[0].full_name :''
    const actor2= (this.state.cast.length)? this.state.cast[1].full_name :''
    return (
      <div>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='movie_title'>
          <input name='title'placeholder='Title' type='text'required id='new_movie_title'
          defaultValue={movie.title}
          onChange={this.onChangeMovie}/>
        </div>
        <div>
          <header>Trailer URL:</header>
          <textarea name='trailerurl' type='text'required id='new_movie_trailer'
          defaultValue={movie.trailerurl} rows='1' onChange={this.onChangeMovie}/>
        </div>
        <div>
          <header>Poster URL:</header>
          <textarea name='posterurl'type='text'required id='new_movie_poster'
          defaultValue={movie.posterurl}rows='2'onChange={this.onChangeMovie}/>
        </div>
        <div className='text'>
          <header>Summary:</header>
          <textarea required name='summary'id='text' rows='4'aria-label='Provide the summary...'
          defaultValue={movie.summary}onChange={this.onChangeMovie}/>
        </div>

        <div>
            <header>Genres/List</header>
            <div className='genres_list'>
              <div>
                <input type='checkbox' name='TV Series' value='TV Series' onChange={this.onChangeCheckBox}
                checked={movie.genres.includes('TV Series')}/>
                <label htmlFor='TV Series'>{' '}TV Series</label>
              </div>
              <div>
                <input type='checkbox' name='Film'value='Film' onChange={this.onChangeCheckBox}
                checked={movie.genres.includes('Film')}/>
                <label htmlFor='Film'>{' '}Film</label>
              </div>
              <div>
                <input type='checkbox' name='Trending'value='Trending' onChange={this.onChangeCheckBox}/>
                <label htmlFor='Trending'>{' '}Trending</label>
              </div>
              <div>
                <input type='checkbox' name='Comedy'value='Comedy'onChange={this.onChangeCheckBox}
                checked={movie.genres.includes('Comedy')}/>
                <label htmlFor='Comedy'>{' '}Comedy</label>
              </div>
              <div>
                  <input type='checkbox' name='Action'value='Action'onChange={this.onChangeCheckBox}
                  checked={movie.genres.includes('Action')}/>
                  <label htmlFor='Action'>{' '}Action</label>
              </div>
              <div>
                  <input type='checkbox' name='Romance'value='Romance'onChange={this.onChangeCheckBox}
                  checked={movie.genres.includes('Romance')}/>
                  <label htmlFor='Romance'>{' '}Romance</label>
              </div>
              <div>
                  <input type='checkbox' name='History'value='History' onChange={this.onChangeCheckBox}
                  checked={movie.genres.includes('History')}/>
                  <label htmlFor='History'>{' '}History</label>
              </div>
            </div>
        </div>
        <div className='cast'>
          <header>Cast:</header>
          <div>
            <input type='text' id='director' placeholder='Director Name' defaultValue={director}/>
            <input type='text' id='actor1' placeholder='Actor 1'defaultValue={actor1}/>
            <input type='text' id='actor2' placeholder='Actor 2'defaultValue={actor2}/>
          </div>
          
        </div>
        <div className='otherInfo'>
          <div className='country'>
            <header>Country</header>
            <select id="country" name="country" className="htmlForm-control" value={movie.country}
            onChange={this.onChangeMovie}>
            <optgroup label="Most Popular">
                <option value="US">United States</option>
                <option value="CN">China</option>
                <option value="JP">Japan</option>
                <option value="VN">Viet Nam</option>
                <option value="KR">South Korea</option>
            </optgroup>
            {countries}
            </select>
          </div>
          <div className='year'>
            <header>Year</header>
            <select id='movie_year' name='year'className="htmlForm-control" value={movie.year}
             onChange={this.onChangeMovie}>
               {years} 
            </select>
          </div>
        </div>
        <div className='publish_status'>
            <header>Published</header>
            <select id='publish_status' name='publish_status'>
                <option value='true'>True</option>
                <option value='false'>False</option>
            </select>
        </div>
        <div className='form_control'>
          <input type='button' value='Cancel'
              onClick={this.props.handleCancel}/>
          <input type="submit" value='SAVE' id='new_movie'/>
        </div>
      </div>
    )
  }

  displayForm=e=>{
    this.setState({displayForm:true})
  }
  displayPreview=e=>{
    this.setState({displayForm:false})
  }


  handleSubmit = ev => {
    ev.preventDefault()
    //const { full_name, nick_name, movie_poster, movie_trailer } = ev.target
  /*
    console.log('registration htmlForm submitted')
    console.log({ full_name, nick_name, movie_poster, movie_trailer })
  
    this.setState({error:null})
    AuthApiService.postUser({
      movie_poster: movie_poster.value,
      movie_trailer: movie_trailer.value,
      full_name: full_name.value,
      nick_name: nick_name.value,
    })
    .then(user=>{
      full_name.value = ''
      nick_name.value = ''
      movie_poster.value = ''
      movie_trailer.value = ''
      this.props.onRegistrationSuccess()
    })
    .catch(res=>{
      this.setState({error: res.error})
    })
   */ 
  }

  render() {
    const d= new Date(this.state.movie.last_modified).toDateString()
    const form = this.renderMovieForm()
    const preview= <MovieDetails movie={this.state.movie} cast={this.state.cast} director={this.state.director}/>
    return (
      <form className='Form MovieForm'//onSubmit={this.handleSubmit} 
      >
        <div className='formNav'>
          <button type='button' onClick={this.displayForm}>Form</button>
          <button type='button' onClick={this.displayPreview}>Preview</button>
          {this.state.movie.last_modified && <span>Last modified: {d}</span>}
        </div>
        {this.state.displayForm?form : preview}
      </form>
    )
  }
}
