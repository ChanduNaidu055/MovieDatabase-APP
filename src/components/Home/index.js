import {Component} from 'react'
import MovieGrid from '../MovieGrid'
import Pagination from '../Pagination'
import './index.css'

const API_KEY = '89070fb279c1eae83375e346aad6ea9e'
const API_URL = 'https://api.themoviedb.org/3/movie/popular'

class Home extends Component {
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

  fetchMovies = async () => {
    const {page} = this.state
    this.setState({loading: true})

    try {
      const response = await fetch(
        `${API_URL}?api_key=${API_KEY}&language=en-US&page=${page}`,
        {
          method: 'GET',
        },
      )
      const data = await response.json()

      this.setState({
        movies: data.results || [],
        totalPages: Math.min(data.total_pages || 1, 500),
        loading: false,
      })
    } catch (error) {
      this.setState({loading: false})
    }
  }

  handlePageChange = nextPage => {
    this.setState({page: nextPage})
  }

  render() {
    const {movies, page, totalPages, loading} = this.state
    return (
      <div className="page">
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

export default Home
