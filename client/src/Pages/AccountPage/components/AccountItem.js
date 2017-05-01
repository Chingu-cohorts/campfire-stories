import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const AccountItem = ({icon, label, ...otherProps}) => (
  <ListGroupItem {...otherProps}>
    <h3>
      <i className={`fa fa-${icon} icon-left`} aria-hidden="true" />
      {label}
    </h3>
  </ListGroupItem>
);

export default AccountItem;
