import {Component} from 'react'
import MovieGrid from '../MovieGrid'
import Pagination from '../Pagination'
import './index.css'

const API_KEY = '89070fb279c1eae83375e346aad6ea9e'
const API_URL = 'https://api.themoviedb.org/3/movie/top_rated'

class TopRated extends Component {
  state = {movies: [], page: 1, totalPages: 1, loading: false}

  componentDidMount() {
    this.fetchMovies()
  }

  componentDidUpdate(prevProps, prevState) {
    const {page} = this.state
    if (prevState.page !== page) {
      this.fetchMovies()
    }
  }

  fetchMovies = () => {
    const {page} = this.state
    this.setState({loading: true})
    fetch(`${API_URL}?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          movies: data.results,
          totalPages: Math.min(data.total_pages, 500),
          loading: false,
        })
      })
  }

  handlePageChange = nextPage => this.setState({page: nextPage})

  render() {
    const {movies, page, totalPages, loading} = this.state
    return (
      <div className="page">
        <h2>Top Rated Movies</h2>
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

export default TopRated
