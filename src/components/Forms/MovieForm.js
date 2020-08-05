import React, { Component } from 'react'
import './Form.css'
//import AuthApiService from '../../services/auth-api-service'
import AutoComplete from '../../components/AutoComplete/AutoComplete'
import {CountryList,MovieYear} from '../Admin_Utils/utils'
import MovieDetails from '../Movie/MovieDetails'
import {MovieApiServices,GeneralApiServices} from '../../services/api-service'

export default class MovieForm extends Component {
  static defaultProps = {
    onSuccess: () => {},
    match: {params:{}},
    history:{}
  }
  constructor(props) {
    super(props)
    this.id= Number(this.props.match.params.id)
    this.state = {
      error: '', displayForm: (this.props.match.params.id)? false: true,
      movie: {
        title:'',posterurl:'',trailerurl:'',
        summary:'',country:'',year:'',genres:''},
      cast: [],
      dir:[],
    }
  }
  
  componentDidMount(){
    const {id}= this
    if(id) {
        GeneralApiServices.getItemById('movies',id).then(json=>this.setState({movie: json}))
        MovieApiServices.getMovieCast(id).then(json=>this.setState({cast:json}))
        MovieApiServices.getMovieDirector(id).then(json=>this.setState({dir:json}))
    }
  }
  renderMovieForm(){
    const {error,movie,cast,dir} = this.state
    const countries= CountryList()
    const years= MovieYear()
    return (
      <div>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='movie_title'>
          <input name='title'placeholder='Title' type='text'required id='title'
          defaultValue={movie.title} className='main_input'
          onChange={this.onChangeMovie}/>
        </div>
        <div>
          <header>Trailer URL:</header>
          <textarea name='trailerurl' type='text'required id='trailerurl'
          defaultValue={movie.trailerurl} rows='1' onChange={this.onChangeMovie}/>
        </div>
        <div>
          <header>Poster URL:</header>
          <textarea name='posterurl'type='text'required id='posterurl'
          defaultValue={movie.posterurl}rows='2'onChange={this.onChangeMovie}/>
        </div>
        <div>
          <header>Summary:</header>
          <textarea required name='summary'id='summary' rows='4'aria-label='Provide the summary...'
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
              <div>
                  <input type='checkbox' name='Anime'value='Anime' onChange={this.onChangeCheckBox}
                  checked={movie.genres.includes('Anime')}/>
                  <label htmlFor='Anime'>{' '}Anime</label>
              </div>
            </div>
        </div>  
        <div>
            <header>Director:</header>
            <AutoComplete name='director' cast={dir[0]} updateCast={this.updateCast}/>
            <header>Actor 1:</header>
            <AutoComplete name='actor_one' cast={cast[0]} updateCast={this.updateCast}/>
            <header>Actor 2: </header>
            <AutoComplete name='actor_two' cast={cast[1]} updateCast={this.updateCast}/>
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
                <option value='false'>False</option>
                <option value='true'>True</option>
            </select>
        </div>
        <div className='form_control'>
          <input type='button' value='Cancel'
              onClick={()=>this.props.history.push('/admin')}/>
          <input type="submit" value='SAVE' id='new_movie'/>
        </div>
      </div>
    )
  }
  displayForm=e=>this.setState({displayForm:true})
  displayPreview=e=>this.setState({displayForm:false})

  updateCast=(name,val1,val2)=>{
    const {dir,cast} = this.state
    const data= {full_name:val1,"artist:id":val2}
    if(name==='director') dir[0]= data
    else if(name==='actor_one') cast[0]= data
    else cast[1]= data

    this.setState({cast:cast, dir:dir})
  /*
    if (name==='director') this.setState({dir:[{0:{full_name:val1,"artist:id":val2}}]})
    if (name==='actor_one') this.setState({cast:[{0:{full_name:val1,"artist:id":val2}}]})*/
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
  handleSubmit = ev => {
    ev.preventDefault()
    const {id}=this
    const {title,posterurl,trailerurl,summary,year,country,director,actor_one,actor_two} = ev.target
    const data={
      title: title.value,
      posterurl: posterurl.value,trailerurl: trailerurl.value,
      summary: summary.value,year: Number(year.value),
      country: country.value,genres: this.state.movie.genres
    }
    let cast= {
      director:  Number(director.value) || null,
      actor_one: Number(actor_one.value) || null,
      actor_two: Number(actor_two.value) || null
    }
    if (id) {
      GeneralApiServices.patchItemById('movies',id,data)
        .then(res=>{
          MovieApiServices.updateMovieCast(id,cast)
            .then(res=>{
              director.value=''
              actor_one.value=''
              actor_two.value=''
            }).catch(err=>console.log(err))
          title.value=''
          posterurl.value=''
          trailerurl.value=''
          summary.value=''
          this.props.onSuccess()
        }).catch(err=>console.log(err))
    }
    else {
      GeneralApiServices.postItem('movies',data)
        .then(res=>{
          const movieid= Number(res.id)
          cast.movieid= movieid
          MovieApiServices.postMovieCast(movieid,cast).then(cast=>{
              director.value=''
              actor_one.value=''
              actor_two.value=''
          }).catch(err=>console.log(err))
          title.value=''
          posterurl.value=''
          trailerurl.value=''
          summary.value=''
          this.props.onSuccess()
        })
        .catch(err=>console.log(err))
    }
    
    
  }

  render() {
    const boolean=this.state.displayForm
    const d= new Date(this.state.movie.last_modified).toDateString()
    const form = this.renderMovieForm()
    const preview= <MovieDetails movie={this.state.movie} cast={this.state.cast} director={this.state.dir}/>
    return (
      <form className='form MovieForm'onSubmit={this.handleSubmit}>
        <div className='formNav'>
          <button type='button' onClick={this.displayPreview} className={!boolean?'active':''}>Preview</button>
          <button type='button' onClick={this.displayForm} className={boolean?'active':''}>Form</button>
          {this.state.movie.last_modified && <span>Last modified: {d}</span>}
        </div>
        {boolean?form : preview}
      </form>
    )
  }
}