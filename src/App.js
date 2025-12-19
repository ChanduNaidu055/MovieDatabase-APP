import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchResults from './components/SearchResults'
import MovieDetails from './components/MovieDetails'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path="/search" component={SearchResults} />
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}

export default App
