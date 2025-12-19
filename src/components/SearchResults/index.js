import {Component} from 'react'
import MovieGrid from '../MovieGrid'
import Pagination from '../Pagination'
import './index.css'

const API_KEY = '89070fb279c1eae83375e346aad6ea9e'
const API_URL = 'https://api.themoviedb.org/3/search/movie'

class SearchResults extends Component {
  state = {movies: [], page: 1, totalPages: 1, loading: false, query: ''}

  componentDidMount() {
    this.loadFromUrl()
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props
    if (prevProps.location.search !== location.search) {
      this.loadFromUrl()
    }
  }

  loadFromUrl = () => {
    const {location} = this.props
    const params = new URLSearchParams(location.search)
    const query = params.get('query') || ''
    const page = parseInt(params.get('page') || '1', 10)
    this.setState({query, page}, this.fetchMovies)
  }

  fetchMovies = () => {
    const {query, page} = this.state
    if (!query) return
    this.setState({loading: true})
    fetch(
      `${API_URL}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query,
      )}&page=${page}`,
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          movies: data.results,
          totalPages: Math.min(data.total_pages, 500),
          loading: false,
        })
      })
      .catch(() => this.setState({loading: false}))
  }

  handlePageChange = nextPage => {
    const {query} = this.state
    const {history} = this.props
    history.push(`/search?query=${encodeURIComponent(query)}&page=${nextPage}`)
  }

  render() {
    const {movies, page, totalPages, loading, query} = this.state
    return (
      <div className="page">
        <h2>Search Results: {`"${query}"`}</h2>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <MovieGrid movies={movies} />
        )}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />
      </div>
    )
  }
}

export default SearchResults
