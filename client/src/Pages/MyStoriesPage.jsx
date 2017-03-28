import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import * as actions from '../actions/story-actions';
import classnames from 'classnames';

 /*
  * Component
  */
class MyStoryPage extends Component {
  componentWillMount(){
    // get my submitted stories
    this.props.getMyStories()
  }
  render () {
    let { submitted } = this.props;
    let childElemenets = [];
    if (submitted.length === 0) {
      childElemenets.push(
        <Col md={4} mdOffset={4} key='orange' className="no-story">
          <Link type="button" className="btn btn-primary cs-btn-green" to="/story">
            <h2 key={'title'}>Why not write a story?</h2>
          </Link>
        </Col>
      )
    } else {
       childElemenets = submitted.map((x,i) => {
         let editButton = (
           <Link to={`/edit/${x._id}`} className="pull-right card-buttons">
             <span className="glyphicon glyphicon-edit"></span>
           </Link>
         )
        return (
            <Col md={4} key={i} className="grid-item-1">
                <div className="thumbnail">
                    <img src={x.image} alt="Campfire Story" />
                    <div className="caption no-border-bottom">
                        <div className="card-title">
                            <h4>{x.title}
                                { (x.status === 'Approved') ? null : editButton }
                            </h4>
                            <p className="status">
                                Status: <span className={classnames("",{ "published" : (x.status === 'Approved')} )} > { x.status } </span>
                            </p>
                        </div>
                    </div>
                </div>
            </Col>
        )
      })
    }
    return (
      <Grid className="section bg-white">
        <Row className="grid-1 bottom-space">
          { childElemenets }
        </Row>
      </Grid>
    );
  }
}

/*
 * Redux
 */
const mapStateToProps = (state) => {
  return {
    submitted: state.content.submitted
  }
}

export default connect(mapStateToProps, actions)(MyStoryPage)
