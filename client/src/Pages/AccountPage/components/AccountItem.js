import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

const AccountItem = ({icon, label, ...otherProps}) => (
  <ListGroupItem {...otherProps}>
    <h3>
      <i className={`fa fa-${icon} icon-left`} aria-hidden="true" />
      {label}
    </h3>
  </ListGroupItem>
);

AccountItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default AccountItem;
