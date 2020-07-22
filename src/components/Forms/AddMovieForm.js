import React, { Component } from 'react'
import './Form.css'
//import { button, input, Required } from '../Utils/Utils'
//import AuthApiService from '../../services/auth-api-service'

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
                <option value="FR">France</option>
            </optgroup>
            <optgroup label="List of countries (A-Z)" id='countryGroup2'>
            </optgroup>
            </select>
        </div>

        <div className='year'>
            <h3>Year</h3>
            <select name="movie-year">
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
            </select>

        </div>
        <input type="submit" value="Add"id='new_movie'/>
      </form>
    )
  }
}
