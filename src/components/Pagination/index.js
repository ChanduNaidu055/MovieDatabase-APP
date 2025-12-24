import {Component} from 'react'
import './index.css'

class Pagination extends Component {
  render() {
    const {page, totalPages, onPageChange} = this.props
    return (
      <div className="pagination">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </button>
        <p className="pagination__page-number">{page}</p>

        {/* <span className="page-numbers">
          Page {page} of {totalPages}
        </span> */}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
