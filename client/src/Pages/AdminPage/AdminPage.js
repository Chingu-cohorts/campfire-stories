import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import cookie from 'react-cookie'

import { getUsers, switchView, switchRoles, deleteUser } from 'actions/admin-actions'
import {  getContent } from 'actions/story-actions';
import { User, Story } from './components';
import PaginationElement from 'components/PaginationElement';

class AdminPage extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })).isRequired,
    stories: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })).isRequired,
    view: PropTypes.string.isRequired,
    storyPages: PropTypes.number.isRequired,
    storyPage: PropTypes.number.isRequired,
    userPages: PropTypes.number.isRequired,
    userPage: PropTypes.number.isRequired,
    updateScreen: PropTypes.func.isRequired,
    switchRoles: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidMount(){
    // show correct view
    this.handleSelect('users');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.users.length === nextProps.users.length) return void 0;
    if (this.props.userPage !== nextProps.userPage) return void 0;
    this.handlePagination(nextProps.userPage);
  }

  handleSelect(selectedTab) {    
    this.props.updateScreen(selectedTab);
  }

  handlePagination(page) {
    this.props.updateScreen(this.props.view, page)
  }

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
              <Tab eventKey="users" title="Users">
                <div className="add-user">
                  <Link to="/register">
                    <i className="fa fa-user-plus icon-left" aria-hidden="true" />
                    <span>Add a new user</span>
                  </Link>
                </div>
              </Tab>
              <Tab eventKey="stories" title="Stories">
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
    view: state.admin.view,
    users: state.admin.users.data,
    userPages: state.admin.users.pages,
    userPage: state.admin.users.page,
    stories: state.content.current.stories,
    storyPages: state.content.current.pages,
    storyPage: state.content.current.page
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
)(AdminPage);
