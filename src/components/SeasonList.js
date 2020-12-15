import React from 'react';
import Episode from './Episode';

const SeasonList = ({episodes}) => {

  // only calling this function when we encounter the first episode to save performance
  const calculateEpisodes = (seasonNum) => {
    if (episodes.length) {
      return episodes.filter((ele, i) => ele.season === seasonNum).length
    }
  }


  return (
    <div>
      {episodes.map((ep, i) => (
        <Episode ep={ep} numOfEpisodesInSeason={ep.number === 1 && calculateEpisodes(ep.season)}/>
      ))}
    </div>
  )
}

export default SeasonList