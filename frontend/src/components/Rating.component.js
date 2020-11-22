import React from 'react'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarHalfIcon from '@material-ui/icons/StarHalf'
import PropTypes from 'prop-types'

function Rating({ value, text }) {
  return (
    <div className='rating'>
        <span>
          {
            value >= 1
            ? <StarIcon style={{ color: "#ffbc00" }} className='small' />
            : value >= 0.5
            ? <StarHalfIcon style={{ color: "#ffbc00" }} className='small' />
            : <StarBorderIcon style={{ color: "#ffbc00" }} className='small' />
          }
        </span>

        <span>
          {
            value >= 2
            ? <StarIcon style={{ color: "#ffbc00" }} className='small' />
            : value >= 1.5
            ? <StarHalfIcon style={{ color: "#ffbc00" }} className='small' />
            : <StarBorderIcon style={{ color: "#ffbc00" }} className='small' />
          }
        </span>

        <span>
          {
            value >= 3
            ? <StarIcon style={{ color: "#ffbc00" }} className='small' />
            : value >= 2.5
            ? <StarHalfIcon style={{ color: "#ffbc00" }} className='small' />
            : <StarBorderIcon style={{ color: "#ffbc00" }} className='small' />
          }
        </span>

        <span>
          {
            value >= 4
            ? <StarIcon style={{ color: "#ffbc00" }} className='small' />
            : value >= 3.5
            ? <StarHalfIcon style={{ color: "#ffbc00" }} className='small' />
            : <StarBorderIcon style={{ color: "#ffbc00" }} className='small' />
          }
        </span>

        <span>
          {
            value >= 5
            ? <StarIcon style={{ color: "#ffbc00" }} className='small' />
            : value >= 4.5
            ? <StarHalfIcon style={{ color: "#ffbc00" }} className='small' />
            : <StarBorderIcon style={{ color: "#ffbc00" }} className='small' />
          }
        </span>
        <div>
          {text && text}
        </div>
    </div>
  )
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
}

export default Rating
