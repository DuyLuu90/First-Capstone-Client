/*MovieDetails.js
    const artistLink= (item,i)=><Link to={'/artists/'+item["artist:id"]}key={i} aria-label='artist-page'>{item["full_name"]}{' '}</Link> 
*/


/*MoviePage.js
    componentDidMount(){      
        MovieApiServices.getMovieReviews(this.id).then(json=>{
            this.setState({reviews: json})
        })
        MovieApiServices.getMovieCast(this.id).then(json=>{
            this.setState({cast:json})
        })
        MovieApiServices.getMovieDirector(this.id).then(json=>{
            this.setState({director:json})
        })
    }
*/