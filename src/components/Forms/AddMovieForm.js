import React, { Component } from 'react'
import './Form.css'
//import { button, input, Required } from '../Utils/Utils'
//import AuthApiService from '../../services/auth-api-service'
import {CountryList,MovieYear} from '../Admin_Utils/utils'

export default class AddMoviehtmlForm extends Component {
  static defaultProps = {
    onSuccess: () => {}
  }

  state = { error: null }

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
    const { error } = this.state
    const countries= CountryList()
    const years= MovieYear()
    return (
      <form className='Form RegistrationForm'
        //onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='movie_title'>
          <input name='movie_title'placeholder='Title' type='text'required id='new_movie_title'/>
        </div>

        <div>
          <input name='movie_poster'placeholder='Poster Url'type='text'required id='new_movie_poster'/>
        </div>

        <div>
          <input name='movie_trailer' placeholder='Trailer Url'type='text'required id='new_movie_trailer'/>
        </div>

        <div className='text'>
          <textarea required
            name='text'id='text'cols='50'rows='3'
            aria-label='Provide the summary...'
            placeholder='Provide the summary..'>
          </textarea>
        </div>

        <div className='movie_list'>
            <h3>Genres/List</h3>
            <input type='checkbox' name='list1'value='TV Series'/>
            <label htmlFor='list1'> TV Series</label><br/>
            <input type='checkbox' name='list2'value='Film'/>
            <label htmlFor='list2'> Film</label><br/>
            <input type='checkbox' name='list3'value='Trending'/>
            <label htmlFor='list3'> Trending</label><br/>
            <input type='checkbox' name='genres1'value='Comedy'/>
            <label htmlFor='genres1'> Comedy</label><br/>
            <input type='checkbox' name='genres2'value='Action'/>
            <label htmlFor='genres2'> Action</label><br/>
            <input type='checkbox' name='genres3'value='Romance'/>
            <label htmlFor='genres3'> Romance</label><br/>
            <input type='checkbox' name='genres4'value='History'/>
            <label htmlFor='genres4'> History</label><br/>
        </div>

        <div className='publish_status'>
            <h3>Published</h3>
            <select id='publish_status' name='publish_status'>
                <option value='true'>True</option>
                <option value='false'>False</option>
            </select>
        </div>

        <div className='country'>
            <h3>Country</h3>
            <select id="country" name="country" className="htmlForm-control">
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
            <h3>Year</h3>
             {years} 
        </div>
        <div className='form_control'>
          <input type="submit" value="Add"id='new_movie'/>
        </div>
        
      </form>
    )
  }
}
