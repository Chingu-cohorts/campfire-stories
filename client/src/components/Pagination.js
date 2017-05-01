import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationElement = ({ items, page, cb }) => (
  <div key="Pagination" className="table">
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

export default PaginationElement;
