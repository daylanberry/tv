import React from 'react';
import Episode from './Episode';

const SeasonList = ({episodes}) => {

  return (
    <div>
      {episodes.map((ep, i) => (
        <Episode ep={ep}/>
      ))}
    </div>
  )
}

export default SeasonList