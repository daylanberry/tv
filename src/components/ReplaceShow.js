import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ReplaceShow = ({dropdownValues, handleSeasonChange, handleEpisodesChange}) => {

  // const {totalSeason, totalSeasonEpisodes} = dropdownValues;

  const renderSeasons = () => {

  }

  const renderEpisode = () => {

  }

  return (
    <div>
      <Form inline>
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
          <option value={1}>Season 1</option>
          <option value={2}>Season 2</option>
          <option value={3}>Season 3</option>
          <option value={4}>Season 4</option>
        </Form.Control>
        <Form.Control
          as="select"
          className="my-1 mr-md-2"
          id="inlineFormCustomSelectPref"
          custom
          onChange={handleEpisodesChange}
        >
          <option value="0">Episode 1</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Control>
        <Button type="submit" className="my-1">
          Replace
        </Button>
      </Form>
    </div>
  )
}


export default ReplaceShow;