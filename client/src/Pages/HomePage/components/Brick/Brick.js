import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Col } from 'react-bootstrap';
import moment from 'moment';

const Brick = ({ data, updatePath }) => {
  const time = moment(data.created_at, "YYYY-MM-DD").format('LL');
  const body = (data.body.length >= 400) ? data.body.slice(0,400) + '...' : data.body;

  return (
    <Col md={6} className="grid-item">
      <Link to={`/full/${data._id}`} onClick={()=>{updatePath(data._id)}}>
        <div className="thumbnail">
          <img src={data.image} alt="Campfire Story" />
            <div className="caption">
              <div className="card-title">
                <h2>{data.title}</h2>
                <p className="card-info">
                Posted on {time} by {data.postedBy.firstName +" "+ data.postedBy.lastName}
                </p>
              </div>
            <p className="card-description">{body}</p>
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
    postedBy: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Brick;