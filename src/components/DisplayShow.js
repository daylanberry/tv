import React from 'react';
import parse from 'html-react-parser';
import './DisplayShow.styles.css';
import naImage from '../assets/naImage.jpg'
import moment from 'moment'

const DisplayShow = ({show: {name, genres, premiered, summary, image}}) => {

  const genreRenderer = () => {
    return genres.map((g, i) => (
      <span key={i}>{g} | </span>
    ))
  }

  let parsedHtml = summary ? summary.replace(/<[^>]+>/g, '') : '';
  let text = parsedHtml.length < 500 ? parsedHtml : parsedHtml.slice(0, 500) + '...'


  return (
    <div className='show-container'>
      <div >
        <img
          src={image && image.medium ? image.medium: naImage}
          className='main-img'
        />
      </div>
      <div className='show-info'>
        <h3>{name}</h3>
        <div className='season-desc'>
          {genreRenderer()}
          <span>Premiered on {moment(premiered).format('MMM, D, Y')}</span>
        </div>
        <div>
          {text}
        </div>
      </div>
    </div>
  )
}

export default DisplayShow;