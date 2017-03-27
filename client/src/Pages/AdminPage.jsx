import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import cookie from 'react-cookie'

import { getUsers, switchView, switchRoles, deleteUser } from '../actions/admin-actions'
import {  getContent } from '../actions/story-actions'
 /*
  * Component
  */
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount(){
    // show correct view
    this.props.switchScreen('users')
  }

  handleSelect(selectedTab) {
    this.props.switchScreen(selectedTab);
  }

  /*
   * Render
   */
  render (){
    if (!this.props.stories) {
      return (
        <div>loading...</div>
      )
    }
    // content
    let { stories, users, view } = this.props
    // actions
    let { switchScreen, switchRoles, deleteUser  } = this.props
    // Change the child element format based on if it loads Stories or Users
    let childElements;
    if (view === 'users') {
      const currentUser = cookie.load('user')
      childElements = users.filter(user => (user._id !== currentUser._id))
      childElements = childElements.map((user,i) => {
        let adminButtonText = (user.role === 'Admin') ? 'Demote to user' : 'Promote to admin';

        return (
          <div key={user._id} className="col-md-12 user-list">
            <h4>{`${user.firstName} ${user.lastName}`}
              <a href="#" onClick={() => deleteUser(user._id)} className="pull-right card-buttons">
                <span className="glyphicon glyphicon-trash"></span>
              </a>
              <a href="#" onClick={() => switchRoles(user._id)} className="pull-right card-buttons">
                {adminButtonText}
              </a>
            </h4>
          </div>
        )
      })
    } else if (view === 'stories'){
      childElements = stories.map((story, i) => {
        let time = moment(story.created_at, "YYYY-MM-DD").format('LL');
        return (
          <div key={i} className="col-md-4">
            <div className="thumbnail">
              <img src={story.image} alt="Campfire Story" />
              <div className="caption no-border-bottom">
                <div className="card-title">
                  <h4>{story.title}
                    <Link to={`/edit/${story._id}`} className="pull-right card-buttons">
                      <span className="glyphicon glyphicon-eye-open"></span>
                    </Link>
                  </h4>
                  <p className="card-info">
                    Posted on {time} by {story.postedBy.firstName +" "+ story.postedBy.lastName}
                  </p>
                </div>
              </div>
            </div>
          </div>
       )
      })
    }
    /*
     *
     */
    return (
      <section className="section bg-white top-offset">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bottom-space">
              <div className='tabs-x tabs-below'>


                <ul className="nav nav-tabs nav-justified" role="tablist">
                  <li className="active">
                    <a onClick={() => switchScreen('users') } href="#users" role="tab" data-toggle="tab">USERS</a>
                  </li>
                  <li>
                    <a onClick={() => switchScreen('stories') } href="#stories" data-toggle="tab">STORIES</a>
                  </li>
                </ul>

                {childElements}
                {view === 'users' &&
                  <Link to="/register"><i className="fa fa-user" aria-hidden="true" /></Link>
                }
              </div>
            </div>
          </div>
        </div>
    </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.content.adminUsers,
    stories: state.content.current,
    view: state.content.view
  }
}

const mapDispatchToProps = dispatch => ({
  switchScreen: view => {
    dispatch(view === 'users'
      ? getUsers()
      : getContent(1, 5)
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
