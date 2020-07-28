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
import AdminPage from '../../routes/AdminPage/AdminPage'
import MoviePage from '../../routes/MoviePage/MoviePage'
import UserPage from '../../routes/Profiles/UserPage'
import ArtistPage from '../../routes/Profiles/ArtistPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'

class App extends Component {
  state= {
    hasError: false,
    hasToken: TokenService.hasAuthToken(),
    userid:'',
    first_name:''
  }

  handleLoginSuccess=()=>{
    const authToken= TokenService.getAuthToken()
    const userid= TokenService.parseJwt(authToken).userid
    GeneralApiServices.getItemById('users',userid)
        .then(user=>this.setState({
            hasToken: TokenService.hasAuthToken(),
            userid: userid,
            first_name: user.first_name
        }))
  }

  handleLogoutSuccess=()=>{
    TokenService.clearAuthToken()
    this.setState({
      hasToken: TokenService.hasAuthToken(),
      userid: '',
      last_name: ''})
  }

  render() {
    return (
      <div className="App">
        <header className='App_header'>
          <Header hasAuthToken={this.state.hasToken} userid={this.state.userid} last_name={this.state.last_name}
          onLogoutSuccess={this.handleLogoutSuccess}/>
        </header>
        <main className='App_main'>
          {this.state.hasError && <p>There was an error! Sorry for the inconveniec!</p>}
          <Switch>
            <Route exact path={'/'} component={()=>{
                return <> <ListItem genres='Film' title= 'Film List'/>
                          <ListItem genres='TV Series' title= 'TV Series'/></>
            }}/>
            <Route path={'/admin'} component={AdminPage}/>
            <Route path={'/login'} component={(props)=><LoginForm {...props} onLoginSuccess={this.handleLoginSuccess}/>}/>
            <Route path={'/register'} component={RegistrationPage}/>
            <Route path={'/movies/genres/:genres'} component={(props)=>{
              const genres= props.match.params.genres.replace('-',' ')
              return <ListItem genres={genres} title={'Movies | '+ genres} displayAll={true}/>
            }}/>
            <Route path={'/movies/country/:country'} component={(props)=>{
              const country= props.match.params.country.replace('-',' ')
              return <ListItem sort='country'country={country} title={'Movies | '+ country} displayAll={true}/>
            }}/>
            <Route path={'/movies/:id'} component={MoviePage}/>
            <Route path={'/users/:id'} component={UserPage}/>
            <Route path={'/artists/:id'} component={ArtistPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
