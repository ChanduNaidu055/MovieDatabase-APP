import {Component} from 'react'
import MovieCard from '../MovieCard'
import './index.css'

class MovieGrid extends Component {
  render() {
    const {movies} = this.props
    if (!movies || movies.length === 0) {
      return <div className="empty">No movies found.</div>
    }
    return (
      <div className="movie-grid">
        {movies.map(m => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    )
  }
}

export default MovieGrid
