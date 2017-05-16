import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Col } from 'react-bootstrap';
import moment from 'moment';

const Brick = ({ data }) => {
  const { _id, image, title, body, created_at, postedBy: { firstName, lastName } } = data;
  const time = moment(created_at, "YYYY-MM-DD").format('LL');
  const abridgedBody = (body.length >= 400) ? body.slice(0,400) + '...' : body;

  return (
    <Col xs={12} sm={6} lg={4} className="grid-item">
      <Link to={`/full/${_id}`}>
        <div className="thumbnail">
          <img src={image} alt="Campfire Story" />
          <div className="caption">
            <div className="card-title">
              <h3>{title}</h3>
              <p className="card-info">
                Posted on {time} by {firstName +" "+ lastName}
              </p>
            </div>
            <p className="card-description">{abridgedBody}</p>
          </div>
        </div>
      </Link>
    </Col>
  );
};

Brick.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    postedBy: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Brick;
