import config from '../config'
import TokenService from './token-service'

export const MovieApiServices = {
    getAllMovies() {
        return fetch(`${config.API_ENDPOINT}/movies`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    getMoviesByGenres(genres){
        return fetch(`${config.API_ENDPOINT}/movies/genres/${genres}`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    getMovieById(id){
        return fetch(`${config.API_ENDPOINT}/movies/${id}`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    getMovieReviews(id){
        return fetch(`${config.API_ENDPOINT}/movies/${id}/reviews`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
        /*
        return [
            {id:1,text:'This movie is amazing',movie_id:1,rating:5,
            user: {first_name:'Adam',last_name:'Smith'}},
            {id:2,text:'Not as expected.',movie_id:1,rating:2,
            user: {first_name:'Mike',last_name:'Hall'}}
        ]*/
    },
    
}

export const UserApiServices= {
    getAllUsers(){
        return fetch(`${config.API_ENDPOINT}/users`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    getUserById(id){
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`,{
            method: `POST`,
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=>(!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        : res.json())
    }
}

export const ReviewApiServices={
    postReview(movieid,userid,comment,rating){
        return fetch(`${config.API_ENDPOINT}/reviews`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
              movieid,userid,rating,comment,
            }),
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },  
}
 

//export default MovieApiServices

