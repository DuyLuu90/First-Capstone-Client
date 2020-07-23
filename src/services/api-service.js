import config from '../config'

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
    getMovieReviews(){
        return [
            {id:1,text:'This movie is amazing',movie_id:1,rating:5,
            user: {first_name:'Adam',last_name:'Smith'}},
            {id:2,text:'Not as expected.',movie_id:1,rating:2,
            user: {first_name:'Mike',last_name:'Hall'}}
        ]
    },
    postReview(id,text,rating){

    },  
}

export const UserApiServices= {
    getAllUsers(){
        return [
            {first_name:'Mike',last_name:'Thompson',username:'mthompson',age: 18,country:'US',reports: 0},
            {first_name:'John',last_name:'Wong',username:'jwong',age: 18,country:'CN',reports: 0},
            {first_name:'Math',last_name:'Kim',username:'mkim',age: 18,country:'SK',reports: 0},
        ]
    },
}
 

//export default MovieApiServices

