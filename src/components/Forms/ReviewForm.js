import React, { Component } from 'react'
import './Form.css'
/*
import ThingContext from '../../contexts/ThingContext'
import ThingApiService from '../../services/thing-api-service'
import { Button, Textarea } from '../Utils/Utils'*/


export default class ReviewForm extends Component {
  //static contextType = ThingContext

  handleSubmit = ev => {
    ev.preventDefault()
    /*
    const { thing } = this.context
    const { text, rating } = ev.target
    //missing userId
    ThingApiService.postReview(thing.id, text.value, Number(rating.value))
      .then(this.context.addReview)
      .then(() => {
        text.value = ''
      })
      .catch(this.context.setError)*/
  }

  render() {
    return (
      <form className='form ReviewForm'
        //onSubmit={this.handleSubmit}
      >
        <div className='text'>
          <textarea required
            name='text'id='text'cols='30'rows='3'
            aria-label='Type a review...'
            placeholder='Type a review..'>
          </textarea>
        </div>

        <div className='select'>
          <label htmlFor='rating'>Rate this thing!</label>
          <select required name='rating' id='rating'
            aria-label='Rate this thing!'
          >
            <option value='1'>1 Star</option>
            <option value='2'>2 Stars</option>
            <option value='3'>3 Stars</option>
            <option value='4'>4 Stars</option>
            <option value='5'>5 Stars</option>
          </select>
        </div>

        <input type='submit' value='Post review'/>

      </form>
    )
  }
}
