import {Component} from 'react'
import './index.css'

const API_KEY = '89070fb279c1eae83375e346aad6ea9e'
const DETAILS_URL = 'https://api.themoviedb.org/3/movie'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

class MovieDetails extends Component {
  state = {details: null, credits: null, loading: true}

  componentDidMount() {
    const {match} = this.props
    const {id} = match.params
    this.fetchDetails(id)
    this.fetchCredits(id)
  }

  fetchDetails = id => {
    fetch(`${DETAILS_URL}/${id}?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => this.setState({details: data, loading: false}))
  }

  fetchCredits = id => {
    fetch(`${DETAILS_URL}/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => this.setState({credits: data}))
  }

  render() {
    const {details, credits, loading} = this.state
    if (loading) return <div className="loader">Loading...</div>

    return (
      <div className="movie-details-page">
        {details && (
          <section className="details">
            <img
              className="details__poster"
              src={
                details.poster_path
                  ? `${IMAGE_BASE}/w342${details.poster_path}`
                  : 'https://via.placeholder.com/342x513'
              }
              alt={details.title}
            />
            <div className="details__info">
              <h3>{details.title}</h3>
              <p>{details.vote_average?.toFixed(1)}</p>
              <p>{details.runtime} min</p>
              <p>{details.genres?.map(g => g.name).join(', ')}</p>
              <p>Released: {details.release_date}</p>
              <p>{details.overview}</p>
            </div>
          </section>
        )}

        <h2>Cast</h2>
        <div className="cast-grid">
          {credits &&
            credits.cast &&
            credits.cast.map(c => (
              <div key={c.cast_id} className="cast-card">
                <img
                  src={
                    c.profile_path
                      ? `${IMAGE_BASE}/w185${c.profile_path}`
                      : 'https://via.placeholder.com/185x278'
                  }
                  alt={c.name}
                />
                <div className="cast-card__info">
                  <div className="cast-card__name">{c.name}</div>
                  <div className="cast-card__character">{c.character}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default MovieDetails
