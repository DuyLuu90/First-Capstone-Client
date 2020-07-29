import React,{Component} from 'react';
import { Route, Switch} from 'react-router-dom'
import './App.css';

import TokenService from '../../services/token-service'
import {GeneralApiServices} from '../../services/api-service'

//IMPORT COMPONENTS:
import Header from '../Header/Header'
import LoginForm from '../Forms/LoginForm'
import ListItem from '../ListItem/ListItem'
//INPORT ROUTES:
import HomePage from '../../routes/HomePage/HomePage'
import AdminPage from '../../routes/AdminPage/AdminPage'
import MoviePage from '../../routes/MoviePage/MoviePage'
import UserPage from '../../routes/Profiles/UserPage'
import ArtistPage from '../../routes/Profiles/ArtistPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'

class App extends Component {
  state= {
    hasError: false,
    hasAuthToken: TokenService.hasAuthToken(),
    userid:'',
    first_name:''
  }

  componentDidMount(){
    const authToken= TokenService.getAuthToken()
    if (authToken) this.handleLoginSuccess()
  }

  handleLoginSuccess=()=>{
    const authToken= TokenService.getAuthToken()
    const userid= TokenService.parseJwt(authToken).userid
    GeneralApiServices.getItemById('users',userid)
        .then(user=>this.setState({
            hasAuthToken: TokenService.hasAuthToken(),
            userid: userid,
            first_name: user.first_name
        }))
  }

  handleLogoutSuccess=()=>{
    TokenService.clearAuthToken()
    this.setState({
      hasAuthToken: TokenService.hasAuthToken(),
      userid: '',
      last_name: ''})
  }

  render() {
    return (
      <div className="App">
        <header className='App_header'>
          <Header token={this.state} onLogoutSuccess={this.handleLogoutSuccess}/>
        </header>
        <main className='App_main'>
          {this.state.hasError && <p>There was an error! Sorry for the inconvenience!</p>}
          <Switch>
            <Route exact path={'/'} component={HomePage}/>
            <Route path={'/movies/genres/:genres'} component={ListItem}/>
            <Route path={'/movies/country/:country'} component={ListItem}/>
            <Route path={'/admin'} component={AdminPage}/>
            <Route path={'/register'} component={RegistrationPage}/>
            <Route path={'/login'} component={(props)=>
                <LoginForm {...props} onLoginSuccess={this.handleLoginSuccess}/>}
            />
            <Route path={'/movies/:id'} component={(props)=>
                <MoviePage {...props} hasAuthToken={this.state.hasAuthToken}/>}
            />
            <Route path={'/users/:id'} component={(props)=>
                <UserPage {...props} currentUserid={this.state.userid}/>}
            />
            <Route path={'/artists/:id'} component={ArtistPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

/*
<Route path={'/movies/genres/:genres'} component={(props)=>{
              console.log(props)
              const genres= props.match.params.genres.replace('-',' ')
              return <ListItem genres={genres} title={'Movies | '+ genres} displayAll={true}/>
            }}/>
  <Route path={'/movies/country/:country'} component={(props)=>{
              const country= props.match.params.country.replace('-',' ')
              return <ListItem sort='country'country={country} title={'Movies | '+ country} displayAll={true}/>
            }}/>
 */