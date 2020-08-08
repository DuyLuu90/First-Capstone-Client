import React,{Component} from 'react';
import { Route, Switch} from 'react-router-dom'
import './App.css';

import TokenService from '../../services/token-service'
import {GeneralApiServices} from '../../services/api-service'

//IMPORT CONTEXT
import AppContext from '../../contexts/AppContext'

//IMPORT COMPONENTS:
import Header from '../Header/Header'
import LoginForm from '../Forms/LoginForm'
import RegistrationForm from '../Forms/RegistrationForm'
import ListItem from '../ListItem/ListItem'
//INPORT ROUTES:
import DemoPage from '../../routes/DemoPage/DemoPage'
import HomePage from '../../routes/HomePage/HomePage'
import AdminPage from '../../routes/AdminPage/AdminPage'
import MoviePage from '../../routes/MoviePage/MoviePage'
import UserPage from '../../routes/Profiles/UserPage'
import ArtistPage from '../../routes/Profiles/ArtistPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'

class App extends Component {
  state= {
    hasError: false,
    hasAuthToken: TokenService.hasAuthToken(),
    userid:'',
    isAdmin: false,
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
            isAdmin: user.admin,
            first_name: user.first_name
        }))
  }
  handleLogoutSuccess=()=>{
    TokenService.clearAuthToken()
    this.setState({
      hasAuthToken: TokenService.hasAuthToken(),
      isAdmin: false,
      userid: '',
      last_name: ''})
  }
  renderAdminPage=(props)=>{
    const Admin= (this.state.isAdmin)? <AdminPage {...props}/>:<NotFoundPage/>
    return Admin
  }

  render() {
    const {state:{hasAuthToken,userid,isAdmin,first_name}, 
    handleLoginSuccess,handleLogoutSuccess}= this
    const values= {
      hasAuthToken: hasAuthToken,userid:userid,
      isAdmin: isAdmin,first_name: first_name,
      handleLoginSuccess: handleLoginSuccess,
      handleLogoutSuccess: handleLogoutSuccess
    }
    return (
      <AppContext.Provider value={values}>
          <div className="App">
            <header className='App_header'>
              <Header token={this.state} onLogoutSuccess={this.handleLogoutSuccess}/>
            </header>
          <main className='App_main'>
            {this.state.hasError && <p>There was an error! Sorry for the inconvenience!</p>}
            <Switch>
              <Route exact path={'/'} component={HomePage}/>
              <Route path={'/demo'} component={DemoPage}/>
              <Route path={'/movies/genres/:genres'} component={ListItem}/>
              <Route path={'/movies/country/:country'} component={ListItem}/>
              <Route path={'/admin'} component={(props)=>this.renderAdminPage(props)}/>
              <Route path={'/register'} component={(props)=>
                  <RegistrationForm {...props} handleCancel={()=>props.history.goBack()}/>}/>
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
      </AppContext.Provider>
    );
  }
}

export default App;