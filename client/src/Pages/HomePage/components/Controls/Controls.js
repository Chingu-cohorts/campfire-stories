import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const Controls = ({ page, count, getContent }) =>  {
  const fetchStories = (page) => () => getContent(page);

  let dis = true;
  let nextDis = false;
  if (page > 1) dis = false;
  if (page === Math.ceil(count/20) ) nextDis = true;

  return (
    <div className="home-controls">
      <Button
        disabled={dis}
        className="left-control"
        onClick={fetchStories(page-1)}>
        &#x02AA6;
      </Button>
      <Button
        disabled={nextDis}
        className="right-control"
        onClick={fetchStories(page+1)}>
        &#x02AA7;
      </Button>
    </div>
  );
};

Controls.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  getContent: PropTypes.func.isRequired
};

export default Controls;
