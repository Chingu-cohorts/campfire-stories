import React from 'react';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';

import { MyStories, AccountData } from './containers';

const AccountPage = () => (
  <Grid className="account-page-container">
    <Row>
      <Col xs={12}>
        <Tabs
          defaultActiveKey="my-stories"
          id="tabs"
          justified
        >
          <Tab eventKey="my-stories" title="MY STORIES" unmountOnExit>
            <MyStories />
          </Tab>
          <Tab eventKey="account-data" title="ACCOUNT DATA">
            <AccountData />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  </Grid>
);

export default AccountPage;
