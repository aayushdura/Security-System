import React from 'react'
import PropTypes from 'prop-types'

const Tab = ({ title, type, style, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      style={{ ...style, width: 'fit-content', cursor: 'pointer' }}
      className={type !== 'block' ? 'p-2 border-bottom-primary ' : 'p-2'}
    >
      {title}
    </div>
  )
}

export default Tab
Tab.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  handleClick: PropTypes.func,
}
