import React from 'react';
import moment from 'moment';

const SeasonListHeader = ({sNum, numOfEpisodes, aired}) => {

  return (
    <div style={{marginTop: '30px', padding: '10px'}}>
      <h4>Season {sNum}</h4>
      <div style={{fontWeight: '200'}}>
        {numOfEpisodes} episodes | Aired {aired}
      </div>
      <hr/>
    </div>
  )
}

export default SeasonListHeader