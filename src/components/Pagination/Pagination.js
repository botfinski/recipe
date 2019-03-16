import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

const pagination = (props) => (
	<div className='Pagination'>
    <button
      disabled={props.currentPage === 1 ? 'disabled' : ''}
      type='button'
      onClick={props.prevPageClicked}>Previous page</button>
    <button
      type='button'
      onClick={props.nextPageClicked}>Next page</button>
	</div>
);

pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  prevPageClicked: PropTypes.func.isRequired,
  nextPageClicked: PropTypes.func.isRequired
}

export default pagination;