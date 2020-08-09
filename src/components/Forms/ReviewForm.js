import React, { Component } from 'react'
import './Form.css'

//import {ReviewApiServices} from '../../services/api-service'
import {GeneralApiServices} from '../../services/api-service'
import TokenService from '../../services/token-service'

export default class ReviewForm extends Component {
  constructor(props){
    super(props)
    this.state= {
      error:null,
    }
  }
  
  static defaultProps= {
    onSuccess: ()=>{},
    handleCancel:()=>{},
    handleEdit:()=>{},
    review: {}
  }

  handleSubmit=(ev)=> {
    ev.preventDefault()
    if (this.props.review.comment) this.props.handleEdit(ev)
    else {
      const authToken= TokenService.getAuthToken()
      const userid= TokenService.parseJwt(authToken).userid
      const movieid= this.props.movieid
      const {rating,comment}= ev.target
      const data= {
        movieid: Number(movieid), userid: Number(userid), comment: comment.value, rating: Number(rating.value)
      }
      GeneralApiServices.postItem('reviews',data)
        .then(rev=>{
          rating.value=''
          comment.value=''
          this.props.onSuccess()
        })
        .catch(res=>this.setState({error: res.error}))
        
      //console.log(userid,movieid,rating.value,comment.value)
      /*
      ReviewApiServices.postReview(Number(movieid), Number(userid),comment.value,Number(rating.value))
        .then(review=>{
          rating.value=''
          comment.value=''
          this.props.onSuccess()
        })
        .catch(res=>this.setState({error: res.error}))*/
    }
    
  }

  render() {
    const {review:{comment,rating},handleCancel}= this.props
    
    return (
      <form className='form ReviewForm'onSubmit={this.handleSubmit}>
        <div className='rating'>
          {!this.props.review && <header>Rate this movie</header>}
          <select required name='rating' id='rating'aria-label='Rate this thing!' defaultValue={rating}>
            <option value='1'>1 Star</option>
            <option value='2'>2 Stars</option>
            <option value='3'>3 Stars</option>
            <option value='4'>4 Stars</option>
            <option value='5'>5 Stars</option>
          </select>
        </div>
        <div className='comment'>
          {!this.props.review && <header>Comment: </header>}
          <textarea required defaultValue={comment}
            name='comment'id='comment'rows='5'
            aria-label='Write a comment...'
            placeholder='Write a comment..'>
          </textarea>
        </div>

        <div className='form_control'>
          <input type='button' value='Cancel'onClick={handleCancel}/>
          <input type='submit' value='SAVE'/>
        </div>
      </form>
    )
  }
}
