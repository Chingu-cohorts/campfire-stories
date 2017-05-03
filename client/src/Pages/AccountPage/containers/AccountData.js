import React from 'react';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import { ListGroup } from 'react-bootstrap';

import { AccountItem } from '../components'
import AuthBox from 'components/AuthBox';

const AccountData = () => {
  const { email, firstName, lastName, role } = cookie.load('user');

  return (
    <AuthBox >
      <ListGroup>
        <AccountItem icon="user-circle-o" label={`Name: ${firstName} ${lastName}`} />
        <AccountItem icon="location-arrow" label={`Email: ${email}`} />
        <AccountItem icon="unlock-alt" label={`Role: ${role}`} />
        <Link to="/change_password">
          <AccountItem icon="key" label="Change Password" bsStyle="success" />
        </Link>
      </ListGroup>
    </AuthBox>
  )
};

export default AccountData;
