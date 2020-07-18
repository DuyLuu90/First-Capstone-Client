import React,{Component} from 'react';
import { Route, Switch} from 'react-router-dom'
import './App.css';

//IMPORT COMPONENTS:
import Header from '../Header/Header'
import AllListPage from '../../routes/List/AllListPage'
import FilmListPage from '../../routes/List/FilmListPage'
import DramaListPage from '../../routes/List/DramaListPage'
import MoviePage from '../../routes/MoviePage/MoviePage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'

class App extends Component {
  state= {hasError: false}
  render() {
    return (
      <div className="App">
        <header className='App_header'>
          <Header/>
        </header>
        <main className='App_main'>
          {this.state.hasError && <p>There was an error! Sorry for the inconveniec!</p>}
          <Switch>
            <Route exact path={'/'} component={AllListPage}/>
            <Route path={'/films'} component={FilmListPage}/>
            <Route path={'/dramas'} component={DramaListPage}/>
            <Route path={'/login'} component={LoginPage}/>
            <Route path={'/register'} component={RegistrationPage}/>
            <Route path={'/movies/:movieId'} component={MoviePage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
