import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Hero, Masonry } from './components';
import * as actions from 'actions/story-actions'

 /** Component */
class HomePage extends Component {
/** Get Stuff when this page loads */
  componentWillMount () {
    // get the stories to display
    this.props.getContent()
    // get the count
    this.props.getCount()
    // get my submitted stories
    // this.props.getMyStories()
  }
/***/

  /** Render */
  render () {
    return (
      <section className="hero-top">
        <Hero />
        <Masonry current={this.props.current}/>
      </section>
    )
  }
}

/** Redux */
const mapStateToProps = (state) => {
  return {
    current: state.content.current,
    page: state.content.page,
    count: state.content.count
  }
}
export default connect(mapStateToProps, actions)(HomePage);
