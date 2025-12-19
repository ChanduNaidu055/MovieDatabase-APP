import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {query: ''}
  }

  handleChange = e => {
    this.setState({query: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const {query} = this.state
    const {history} = this.props
    if (query.trim() !== '') {
      history.push(`/search?query=${encodeURIComponent(query)}&page=1`)
      this.setState({query: ''})
    }
  }

  render() {
    const {location} = this.props
    const {query} = this.state

    return (
      <nav className="navbar">
        <div className="navbar__brand">
          <Link to="/">
            <h1>movieDB</h1>
          </Link>
        </div>
        <div className="navbar__links">
          <Link className={location.pathname === '/' ? 'active' : ''} to="/">
            Popular
          </Link>
          <Link
            className={location.pathname === '/top-rated' ? 'active' : ''}
            to="/top-rated"
          >
            Top Rated
          </Link>
          <Link
            className={location.pathname === '/upcoming' ? 'active' : ''}
            to="/upcoming"
          >
            Upcoming
          </Link>
        </div>
        <form className="navbar__search" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    )
  }
}

export default withRouter(Header)
