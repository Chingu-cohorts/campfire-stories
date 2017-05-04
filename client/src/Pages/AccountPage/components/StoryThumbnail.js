import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const StoryThumbnail = ({ title, _id }) => (
  <Link to={`/edit/${_id}`} className="thumbnail">
    <div className="caption no-border-bottom">
      <h4 className="card-buttons">
        {title}
        <span className="glyphicon glyphicon-edit pull-right" />
      </h4>
    </div>
  </Link>
);

StoryThumbnail.propTypes = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};

export default StoryThumbnail;
