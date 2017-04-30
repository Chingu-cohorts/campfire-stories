import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import * as actions from 'actions/story-actions'
import moment from 'moment';


class FullStoryPage extends Component {
  componentDidMount () {
    let id = this.props.location.pathname.slice(6)
    this.props.getStory(id)
  }

  render () {
    if (!this.props.currentStory) {
      return <div>loading :)...</div>
    }
    let { 
      image, 
      body, 
      title, 
      description, 
      created_at, 
      postedBy: { firstName, lastName } 
    } = this.props.currentStory

    let time = moment(created_at, "YYYY-MM-DD").format('LL');
    // const url= `${window.location.host}${this.props.location.pathname}`
    return (
      <div>
        <Grid className="full-story">

          <Row className="story-title-row">
            <h2 className="full-story-title">{title}</h2>
          </Row>
          
          <Row className="story-writer-row">
            <div>
              <span className="full-story-writer">{`Written by ${firstName} ${lastName}`}</span>
              <span className="full-story-writer">Published on {time}</span>
            </div>
            <div>
              <a
                href={`http://twitter.com/share?text=This is an awesome story!!!`}
                id="share-tw"
                className="social-buttons"
                target="_blank">
                  <i className="fa fa-twitter" />
              </a>
              <a
                href=''
                id="share-tw"
                className="social-buttons"
                target="_blank">
                  <i className="fa fa-facebook" />
              </a>
            </div>
          </Row>

          <Row>
            <Col md={8} mdOffset={2} className="full-story-content-container">
              <div className="no-padding-picture full-head">
                <div className="post-image">
                  <img alt="body" src={image} className="img-responsive" />
                  <span>{description}</span>
                </div>
              </div>
              <span className="horizontal-rule"></span>
              <p className="post-text">{body}</p>
            </Col>
          </Row>
          
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentStory: state.content.currentStory
  }
}

export default connect(mapStateToProps, actions)(FullStoryPage)
