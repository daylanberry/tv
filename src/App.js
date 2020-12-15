import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import DisplayShow from './components/DisplayShow';
import SeasonList from './components/SeasonList';
import ReplaceShow from './components/ReplaceShow';
import Loader from './components/Loader';

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
  const [totalEpisodes, setTotalEpisodes] = useState([]);

  const [error, setError] = useState('')


  useEffect(() => {
    pickShowByNameOrRandomly(true)
  }, []);

  // Handles the current season in the dropdown
  const handleCurrentSeasonChange = (e) => {
    setError('')
    let currentSeason = parseInt(e.target.value)

    setCurrentSeason(currentSeason)
    handleTotalEpisodesWithSeasons(currentSeason, episodes)
  }

  // Handles the current episode in the dropdown
  const handleDropdownEpisodes = (e) => {
    setError('')
    setCurrentEpisode(parseInt(e.target.value))
  }

  // This will dynamically populate number of seasons along with episodes for chosen season
  const handleTotalEpisodesWithSeasons = (currentSeason, episodes) => {
    const totalEpisodes = episodes.filter(ep => ep.season === currentSeason).map(filteredEp => filteredEp.number)

    setTotalEpisodes(totalEpisodes)
  }


  const randomNumber = () => {
    return Math.floor(Math.random() * 10000)
  }

  // This function returns the array of all the seasons numerically to account for skipped seasons
  const createSeasonArray = (episodes) => {
    let seasonArray = Array.from(new Set(episodes.map(ep => ep.season)))

    return seasonArray
  }


  const pickShowByNameOrRandomly = (random, name='') => {
    setError('')

    let endpoint = !random && name.length ? `http://api.tvmaze.com/singlesearch/shows?q=${name}&embed=episodes` :
    `http://api.tvmaze.com/shows/${randomNumber()}?embed=episodes`

    return axios.get(endpoint)
      .then(res => {

        const { id, name, genres, premiered, summary, image } = res.data;

        setShow({...show, id, name, genres, premiered, summary, image, loaded: true})

        let episodes = res.data._embedded.episodes
        let seasonArray = createSeasonArray(episodes)

        setEpisodes(episodes)
        handleTotalEpisodesWithSeasons(1, episodes)
        setTotalSeasons(seasonArray)
      })
      .catch(err => console.log(err))
  }

  const handleSearchChange = (e) => {
    setError('')
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


  if (!show.name) return <Loader />

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
        error={error}
        setError={setError}

      />
      <SeasonList episodes={episodes}/>
    </div>
  );
}

export default App;

