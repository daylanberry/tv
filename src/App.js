import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import DisplayShow from './components/DisplayShow';
import SeasonList from './components/SeasonList';
import ReplaceShow from './components/ReplaceShow';
import Loader from './components/Loader';

import { Alert } from 'react-bootstrap'

import * as helpers from './helpers';

function App() {

  const [searchedName, setSearchedName] = useState('');
  const [show, setShow] = useState({
    id: '',
    name: '',
    genres: [],
    premiered: '',
    summary: '',
    image: '',
    loaded: false
  });
  const [episodes, setEpisodes] = useState([]);

  // This state is used to display dropdown
  const [currentSeason, setCurrentSeason] = useState(1)
  const [currentEpisode, setCurrentEpisode] = useState(1)
  const [totalSeasons, setTotalSeasons] = useState([]);
  // will dynamically set the number of episodes according to current season
  const [totalEpisodes, setTotalEpisodes] = useState([]);

  const [errors, setErrors] = useState({
    replaceSearchError: '',
    pageError: ''
  });

  const { replaceSearchError, pageError } = errors;


  useEffect(() => {
    pickShowByNameOrRandomly(true)
  }, []);

  const handleTypeError = (name, err) => {
    setErrors({...errors, [name]: err})
  }

  const clearErrors = () => {
    setErrors({
      ...errors,
      replaceSearchError: '',
      pageError: ''
    })
  }

  // Handles the current season in the dropdown
  const handleCurrentSeasonChange = (e) => {
    clearErrors()
    let currentSeason = parseInt(e.target.value)

    setCurrentSeason(currentSeason)
    handleTotalEpisodesWithSeasons(currentSeason, episodes)
  }

  // Handles the current episode in the dropdown
  const handleDropdownEpisodes = (e) => {
    clearErrors()
    setCurrentEpisode(parseInt(e.target.value))
  }

  // This will dynamically populate number of seasons along with episodes for chosen season
  const handleTotalEpisodesWithSeasons = (currentSeason, episodes) => {
    const totalEpisodes = episodes.filter(ep => ep.season === currentSeason).map(filteredEp => filteredEp.number)

    setTotalEpisodes(totalEpisodes)
  }


  const pickShowByNameOrRandomly = (random, name='') => {
    clearErrors()

    let endpoint = !random && name.length ? `https://api.tvmaze.com/singlesearch/shows?q=${name}&embed=episodes` :
    `https://api.tvmaze.com/shows/${helpers.randomNumber()}?embed=episodes`

    return axios.get(endpoint)
      .then(res => {

        const { id, name, genres, premiered, summary, image } = res.data;

        setShow({...show, id, name, genres, premiered, summary, image, loaded: true})

        let episodes = res.data._embedded.episodes
        let seasonArray = helpers.createSeasonArray(episodes)

        setEpisodes(episodes)
        handleTotalEpisodesWithSeasons(1, episodes)
        setTotalSeasons(seasonArray)
      })
      .catch(err => {
        if (err.response && err.response.data.name === 'Not Found') {
          handleTypeError('pageError', 'Oops something went wrong, refresh and try again')
        }

      })
  }

  const handleSearchChange = (e) => {
    clearErrors()
    setSearchedName(e.target.value)
  }

  const submitSearchShow = (e) => {
    e.preventDefault()
    let name = searchedName.split(' ').join('-')
    pickShowByNameOrRandomly(false, name)
  }

  const replaceEpisode = (newShowObj) => {

    let updatedEpisodes = episodes.map((ep, i) => {
      if (ep.season === currentSeason && ep.number === currentEpisode) {
        return newShowObj
      }
      return ep
    })
    setEpisodes(updatedEpisodes)
  }


  if (!show.name) {
    if (!pageError.length) {
      return <Loader />
    } else {
      return (
        <Alert className='page-error' variant='danger'>
          {pageError}
        </Alert>
      )
    }
  }

  return (
    <div className="container">
      <Header handleSearchChange={handleSearchChange} handleSubmit={submitSearchShow}/>
      {show.loaded && <DisplayShow show={show}/>}

      <ReplaceShow
        handleSeasonChange={handleCurrentSeasonChange}
        handleEpisodesChange={handleDropdownEpisodes}
        totalSeasons={totalSeasons}
        totalEpisodes={totalEpisodes}
        replaceEpisode={replaceEpisode}
        currentEpisode={currentEpisode}
        currentSeason={currentSeason}
        error={replaceSearchError}
        handleTypeError={handleTypeError}
        clearErrors={clearErrors}
      />
      <SeasonList episodes={episodes}/>
    </div>
  );
}

export default App;

