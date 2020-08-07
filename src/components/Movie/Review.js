import React, {Component}from 'react'
import {Link} from 'react-router-dom'

import AppContext from '../../contexts/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MovieStarRating from './MovieStarRating'
import ReviewForm from '../Forms/ReviewForm'
import {GeneralApiServices, MovieApiServices} from '../../services/api-service'
import './Movie.css'

export default class Review extends Component{
    static defaultProps={
        review: {}
    }
    id= this.props.review.id
    state= {
        comment:'',rating:'',upvote:'',downvote:'',
        loggedIn: true,
        upvoteClicked: false,
        downvoteClicked: false,
        reviewPopUp: false,
        displayForm: false
    }
    componentDidMount(){
        //const {id}= this.props.review
        if(this.id) {
            GeneralApiServices.getItemById('reviews',this.id).then(json=>{
                const {comment,rating,upvote,downvote} = json
                this.setState({comment,rating,upvote,downvote})
            })
        }
    }
    displayPopup=()=>{
        const boolean= (this.state.reviewPopUp)? false: true
        this.setState({reviewPopUp: boolean})
    }
    displayForm=()=>this.setState({displayForm:true,reviewPopUp:false})
    hideForm=()=>this.setState({displayForm:false})
    handleEdit=(e)=>{
        e.preventDefault()
        const {rating,comment}= e.target
        const data= {comment:comment.value,rating:Number(rating.value)}
        MovieApiServices.updateMovieReview(this.id,data).then(()=>{
            GeneralApiServices.getItemById('reviews',this.id).then(json=>{
                const {comment,rating,upvote,downvote} = json
                this.setState({
                    comment:comment,rating:rating, upvote:upvote,downvote:downvote,
                    displayForm:false
                })
            })
        })
    }
    handleDelete=()=>{
        MovieApiServices.deleteMovieReview(this.id).then(()=>{
            this.props.onDeleteSuccess()
        }).catch(err=>console.log(err))
    }
    handleUpVoteClicked= ()=>{
        const boolean= (this.state.upvoteClicked)? false: true
        const upvotevalue= (this.state.upvoteClicked)? -1 : +1
        const downvotevalue= (this.state.downvoteClicked)? -1: 0
        GeneralApiServices.getItemById('reviews',this.id).then(json=>{
            const data= {upvote: json.upvote+upvotevalue, downvote: json.downvote+downvotevalue }
            MovieApiServices.updateMovieReview(this.id,data).then(()=>{
                this.setState({
                    upvote: json.upvote+upvotevalue,
                    downvote: json.downvote+ downvotevalue,
                    upvoteClicked: boolean,
                    downvoteClicked: false,
                })
            })
        })
        
    }
    handleDownVoteClicked=()=>{
        const boolean= (this.state.downvoteClicked)? false:true
        const downvotevalue= (this.state.downvoteClicked)? -1: +1
        const upvotevalue= (this.state.upvoteClicked)? -1 : 0
        GeneralApiServices.getItemById('reviews',this.id).then(json=>{
            const data= {upvote: json.upvote+upvotevalue, downvote: json.downvote+downvotevalue }
            MovieApiServices.updateMovieReview(this.id,data).then(()=>{
                this.setState({
                    upvote: json.upvote+upvotevalue ,
                    downvote: json.downvote+ downvotevalue,
                    upvoteClicked: false,
                    downvoteClicked: boolean,
                })
            }).catch(err=>console.log(err))
        })
    }
    renderReviewContent(hasAuthToken){
        const {review}= this.props
        const {comment,rating}= this.state
        const ReviewReact= this.renderReviewReact()
        return (
            <div className='content'>
                <section>
                    <div className='review-text'>
                        <header>
                            <Link to={'/users/'+review["user:id"]} className='userLink'>
                            {review['user:first_name']}{' '}{review['user:last_name']}
                            </Link>     
                        </header>
                        <span>{comment}</span><br/>
                    </div>
                    {hasAuthToken && ReviewReact}
                </section>
                <MovieStarRating rating={rating}/>
            </div>
        )
    }
    renderReviewReact(){
        const {upvote,downvote}= this.state
        return (
            <div className='review-react'>
                <FontAwesomeIcon icon='thumbs-up' onClick={this.handleUpVoteClicked}
                className={this.state.upvoteClicked?'active':''}/>
                <span>{upvote}</span>
                <FontAwesomeIcon icon='thumbs-down' id='thumbs-down' onClick={this.handleDownVoteClicked}
                className={this.state.downvoteClicked?'active':''}/>
                <span>{downvote}</span>
                <span>Reply</span>
            </div>
        )
    }
    renderReviewAction(){
        const UserAction=   <ul>
                                <li onClick={this.displayForm}>Edit</li>
                                <li onClick={this.handleDelete}>Delete</li>
                            </ul>
        const VisitorAction= (<ul>
                                <li>Hide this review</li>
                                <li>Report to admins</li>
                            </ul>)
        const AdminAction= <ul><li>Delete</li></ul>
        return {UserAction,VisitorAction,AdminAction}
    }
    render(){
        const Userid= this.props.review["user:id"]
        const {UserAction,VisitorAction,AdminAction}= this.renderReviewAction()
        //const {review}=this.props
        /*
        const reviewActions= (this.state.loggedIn)
                        ? <ul>
                            <li onClick={this.displayForm}>Edit</li>
                            <li onClick={this.handleDelete}>Delete</li>
                        </ul>
                        : <ul><li>Hide this review</li>Report to admins<li>Delete</li></ul>*/
        return (
            <AppContext.Consumer>
                {value=>{
                    const action = value.isAdmin
                        ?AdminAction :value.userid===Userid? UserAction: VisitorAction
                    const reviewContent= (this.state.displayForm) 
                    ? <ReviewForm handleCancel={this.hideForm} handleEdit={this.handleEdit} review={this.props.review}/> 
                    : this.renderReviewContent(value.hasAuthToken)
                    return (
                    <div className='review'>
                        <div className='main'>
                            {reviewContent}
                        </div>
                        <div className='review-action'>
                            <div onClick={this.displayPopup}>{'...'}</div>
                            {this.state.reviewPopUp && action }
                        </div>
                    </div>)}
                }
            </AppContext.Consumer>            
        )
    }
}