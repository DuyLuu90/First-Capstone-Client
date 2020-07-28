import React, { Component } from 'react'
import './Form.css'

import {ReviewApiServices} from '../../services/api-service'
import TokenService from '../../services/token-service'

export default class ReviewForm extends Component {
  
  static defaultProps= {
    onSuccess: ()=>{}
  }

  state= {
    error:null,
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const authToken= TokenService.getAuthToken()
    const userid= TokenService.parseJwt(authToken).userid
    const movieid= this.props.movieid
    const {rating,comment}= ev.target
    
    console.log(userid,movieid,rating.value,comment.value)
    
    ReviewApiServices.postReview(Number(movieid), Number(userid),comment.value,Number(rating.value))
      .then(review=>{
        rating.value=''
        comment.value=''
        this.props.onSuccess()
      })
      .catch(res=>{
        this.setState({error: res.error})
      })

    /*.catch(this.context.setError)*/
  }

  render() {
    return (
      <form className='form ReviewForm'
        onSubmit={this.handleSubmit}
      >
        <h2>Leave a review</h2>
        <div className='rating'>
          <label htmlFor='rating'>Rate this movie</label>
          <select required name='rating' id='rating'aria-label='Rate this thing!'>
            <option value='1'>1 Star</option>
            <option value='2'>2 Stars</option>
            <option value='3'>3 Stars</option>
            <option value='4'>4 Stars</option>
            <option value='5'>5 Stars</option>
          </select>
        </div>
        <div className='comment'>
          <label htmlFor='comment'>Comment</label>
          <textarea required
            name='comment'id='comment'cols='40'rows='5'
            aria-label='Write a comment...'
            placeholder='Write a comment..'>
          </textarea>
        </div>

        <div className='form_control'>
          <input type='submit' value='Post review'/>
        </div>
      </form>
    )
  }
}
