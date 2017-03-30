import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router';

const StoryThumbnail = ({ image, title, _id }) => (
  <Col md={4} className="grid-item-1">
    <div className="thumbnail">
      <img src={image} alt="Campfire Story" />
      <div className="caption no-border-bottom">
        <div className="card-title">
          <h4>
            {title}
            <Link to={`/edit/${_id}`} className="pull-right card-buttons">
              <span className="glyphicon glyphicon-edit" />
            </Link>
          </h4>
        </div>
      </div>
    </div>
  </Col>
);

export default StoryThumbnail;
