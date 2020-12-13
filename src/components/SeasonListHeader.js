import React from 'react';
import moment from 'moment';

const SeasonListHeader = ({sNum, epNum, aired}) => {

  return (
    <div style={{marginTop: '30px', padding: '10px'}}>
      <h4>Season {sNum}</h4>
      <div>
        {epNum} episodes | Aired {aired}
      </div>
      <hr/>
    </div>
  )
}

export default SeasonListHeader