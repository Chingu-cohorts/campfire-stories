import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const PaginationElement = ({ items, page, cb }) => (
  <div className="table">
    <div className="table-cell">
      <Pagination
        prev
        next
        first
        last
        maxButtons={5}
        items={items}
        activePage={page}
        onSelect={cb}
        className="cell-child"
      />
    </div>
  </div>
);

PaginationElement.propTypes = {
  items: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  cb: PropTypes.func
};

export default PaginationElement;
