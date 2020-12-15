import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './ReplaceShow.styles.css';

import axios from 'axios';

const ReplaceShow = ({handleSeasonChange, handleEpisodesChange, totalSeasons, totalEpisodes, replaceEpisode, currentEpisode, currentSeason, error, handleTypeError, clearErrors}) => {

  const [replacement, setReplacement] = useState('')

  const handleReplacementChange = (e) => {
    clearErrors()
    setReplacement(e.target.value)
  }


  const rendererEpisodes = () => {
    return (
      <>
        {totalEpisodes.map((ep, i) => (
          <option key={i} value={ep}>Episode {ep}</option>
        ))}
      </>
    )
  }

  const renderSeasons = () => {
    return (
      <>
        {totalSeasons.map((season, i) => (
          <option key={i} value={season}>Season {season}</option>
        ))}
      </>
    )
  }

  const submitReplacement = (e) => {
    e.preventDefault()
    let replacementShow = replacement.split(' ').join('-')

    axios.get(`http://api.tvmaze.com/singlesearch/shows?q=${replacementShow}&embed=episodes`)
      .then(res => {
        let episodes = res.data._embedded.episodes
        let replacementEpisode = episodes.find((ep) => (
          ep.number === currentEpisode && ep.season === currentSeason
        ))

        if (!replacementEpisode) {
          return handleTypeError('replaceSearchError', 'There is no matching season/episode for this show')
        }

        replaceEpisode(replacementEpisode)
      })
        .catch(err => {
          handleTypeError('replaceSearchError', `There is no show matching for ${replacement}`)
          setReplacement('')
        })

  }

  return (
    <div>
      <Form inline onSubmit={submitReplacement}>
        <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
          Replace
        </Form.Label>
        <Form.Control
          as="select"
          className="my-1 mr-sm-2"
          id="inlineFormCustomSelectPref"
          custom
          onChange={handleSeasonChange}
        >
          {renderSeasons()}
        </Form.Control>
        <Form.Control
          as="select"
          className="my-1 mr-md-2"
          id="inlineFormCustomSelectPref"
          custom
          onChange={handleEpisodesChange}
        >
          {rendererEpisodes()}
        </Form.Control>
        <span>with</span>
        <input
          type='text'
          className='replace-input'
          onChange={handleReplacementChange}
        />
        <Button type="submit" className="my-1">
          Replace
        </Button>
      </Form>
      {error.length > 0 && (
        <Alert variant='danger'>{error}</Alert>
      )}
    </div>
  )
}


export default ReplaceShow;