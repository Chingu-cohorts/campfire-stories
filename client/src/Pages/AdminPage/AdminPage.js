import React, { Component } from 'react';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import cookie from 'react-cookie'

import { getUsers, switchView, switchRoles, deleteUser } from 'actions/admin-actions'
import {  getContent } from 'actions/story-actions';
import { User, Story } from './components';
import PaginationElement from 'components/PaginationElement';

 /*
  * Component
  */
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidMount(){
    // show correct view
    this.props.updateScreen('users');
  }

  handleSelect(selectedTab) {
    this.props.updateScreen(selectedTab);
  }

  handlePagination(page) {
    this.props.updateScreen(this.props.view, page)
  }

  /*
   * Render
   */
  render (){
    if (!this.props.stories) {
      return (
        <div>loading...</div>
      );
    }

    // content
    const { stories, users, view, storyPages, storyPage, userPages, userPage } = this.props;

    // actions
    const { switchRoles, deleteUser } = this.props;

    // Change the child element format based on if it loads Stories or Users
    let childElements;
    if (view === 'users') {
      const currentUser = cookie.load('user');

      childElements = users
        .filter(user => (user._id !== currentUser._id))
        .map(user =>
          <User
            key={user._id}
            switchRoles={switchRoles}
            deleteUser={deleteUser}
            user={user}
          />
        );
    } else if (view === 'stories') {
      childElements = stories.map(story =>
        <Story key={story._id} story={story}/>
      );
    }

    childElements.push(
      <PaginationElement
        key="pagination"
        items={view === 'users' ? userPages : storyPages}
        page={view === 'users' ? userPage : storyPage}
        cb={this.handlePagination}
      />
    );

    return (
      <Grid className="admin-container">
        <Row>
          <Col md={12}>
            <Tabs
              defaultActiveKey="users"
              onSelect={this.handleSelect}
              id="tabs"
              justified
            >
              <Tab eventKey="users" title="USERS">
                <div className="add-user">
                  <Link to="/register" >
                    <i className="fa fa-user-plus icon-left" aria-hidden="true" />
                    <span>Add a new user</span>
                  </Link>
                </div>
              </Tab>
              <Tab eventKey="stories" title="STORIES">
                <div className="add-story">
                  <Link to="/story">
                    <span>Add a new story</span>
                    <i className="fa fa-newspaper-o icon-right" aria-hidden="true" />
                  </Link>
                </div>
              </Tab>
            </Tabs>
              {childElements}
          </Col>
        </Row>
    </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.content.adminUsers,
    stories: state.content.current,
    view: state.content.view,
    storyPages: state.content.storyPages,
    storyPage: state.content.storyPage,
    userPages: state.content.userPages,
    userPage: state.content.userPage
  }
}

const mapDispatchToProps = dispatch => ({
  updateScreen: (view, page) => {
    dispatch(view === 'users'
      ? getUsers(page)
      : getContent(page, 10)
    );
    dispatch(switchView(view));
  },
  switchRoles: id => dispatch(switchRoles(id)),
  deleteUser: id => dispatch(deleteUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
