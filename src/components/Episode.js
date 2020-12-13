import React from 'react';
import moment from 'moment'
import Truncate from 'react-truncate-html';
import SeasonListHeader from './SeasonListHeader';
import naImage from '../assets/naImage.jpg'
import './Episode.styles.css'

const Episode = ({ep}) => {

  let description = ep.summary ? ep.summary.replace(/<[^>]+>/g, '') : '';
  let text = description.length < 200 ? description : description.slice(0, 190) + '...'

  let aired = moment(ep.airdate).format('MMM, D, Y')

  return (
    <>
      {
        ep.number === 1 && (
          <SeasonListHeader sNum={ep.season} epNum={ep.number} aired={aired}/>
        )
      }
      <div className='ep-container'>
        <div>
          <img
            src={ep.image ? ep.image.medium : naImage}
            className='ep-image'
          />
        </div>
        <div className='ep-desc'>
          <h6>{ep.name}</h6>
          <span className='season-info'>
            Season {ep.season} | Episode: {ep.number} | {aired}
          </span>

          <div>
            {text}
          </div>
        </div>
      </div>
    </>
  )
}

export default Episode