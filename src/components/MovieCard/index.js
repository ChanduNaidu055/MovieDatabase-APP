import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342'

class MovieCard extends Component {
  render() {
    const {movie} = this.props
    const imgSrc = movie.poster_path
      ? `${IMAGE_BASE}${movie.poster_path}`
      : 'https://via.placeholder.com/342x513?text=No+Image'

    return (
      <div className="movie-card">
        <img src={imgSrc} alt={movie.title} />
        <div className="movie-card__info">
          <h1>{movie.title}</h1>
          <p> {movie.vote_average?.toFixed(1)}</p>
          <Link to={`/movie/${movie.id}`}>
            <button type="button" className="btn">
              View Details
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default MovieCard
