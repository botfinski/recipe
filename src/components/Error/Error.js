import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

const error = (props) => (
	<div className='Error'>
		<p>{props.error}</p>
	</div>
);

error.propTypes = {
  error: PropTypes.string.isRequired,
}

export default error;