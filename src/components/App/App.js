import React,{Component} from 'react';
import { Route, Switch} from 'react-router-dom'
import './App.css';

//IMPORT COMPONENTS:
import Header from '../Header/Header'
import ListItem from '../ListItem/ListItem'
import AdminPage from '../../routes/AdminPage/AdminPage'
import MoviePage from '../../routes/MoviePage/MoviePage'
import UserPage from '../../routes/UserPage/UserPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'

class App extends Component {
  state= {
    hasError: false,
    
  }

  
  
  render() {
    
    return (
      <div className="App">
        <header className='App_header'>
          <Header/>
        </header>
        <main className='App_main'>
          {this.state.hasError && <p>There was an error! Sorry for the inconveniec!</p>}
          <Switch>
            <Route exact path={'/'} component={()=>{
                return <> <ListItem genres='Film' title= 'Film List'/>
                          <ListItem genres='TV Series' title= 'TV Series'/></>
            }}/>
            <Route path={'/admin'} component={AdminPage}/>
            <Route path={'/login'} component={LoginPage}/>
            <Route path={'/register'} component={RegistrationPage}/>
            <Route path={'/movies/:movieId'} component={MoviePage}/>
            <Route path={'/users/:userId'} component={UserPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
