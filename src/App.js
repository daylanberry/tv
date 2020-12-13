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

  // used for drop down component
  const [dropdownValues, setDropdownValues] = useState({
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: null,
    totalEpisodes: null
  })

  // This state is used to display dropdown
  const [currentSeason, setCurrentSeason] = useState(1)
  const [currentEpisode, setCurrentEpisode] = useState(1)
  const [totalSeasons, setTotalSeasons] = useState(null);
  const [totalEpisodes, setTotalEpisodes] = useState(null);

  useEffect(() => {
    pickShowByNameOrRandomly(true)
  }, []);

  // Handles the current season in the dropdown
  const handleCurrentSeasonChange = (e) => {
    let currentSeason = parseInt(e.target.value)

    setCurrentSeason(currentSeason)
    handleTotalEpisodesWithSeasons(currentSeason, episodes)
  }

  // Handles the current episode in the dropdown
  const handleDropdownEpisodes = (e) => {
    setCurrentEpisode(parseInt(e.target.value))
  }

  // This will dynamically populate number of seasons along with episodes for chosen season
  const handleTotalEpisodesWithSeasons = (currentSeason, episodes) => {
    const totalEpisodes = episodes.filter(ep => ep.season === currentSeason).length
    setTotalEpisodes(totalEpisodes)
  }


  const randomNumber = () => {
    return Math.floor(Math.random() * 10000)
  }


  const pickShowByNameOrRandomly = (random, name='') => {

    let endpoint = !random && name.length ? `http://api.tvmaze.com/singlesearch/shows?q=${name}&embed=episodes` :
    `http://api.tvmaze.com/shows/${randomNumber()}?embed=episodes`

    return axios.get(endpoint)
      .then(res => {

        const { id, name, genres, premiered, summary, image } = res.data;

        setShow({...show, id, name, genres, premiered, summary, image, loaded: true})

        let episodes = res.data._embedded.episodes
        setEpisodes(episodes)
        handleTotalEpisodesWithSeasons(1, episodes)
        setTotalSeasons(episodes[episodes.length - 1].season)
      })
      .catch(err => console.log(err))
  }

  const handleSearchChange = (e) => {
    setSearchedName(e.target.value)
  }

  const submitSearchShow = (e) => {
    e.preventDefault()
    let name = searchedName.split(' ').join('-')
    pickShowByNameOrRandomly(false, name)
  }



  if (!show.name) return <Loader />

  return (
    <div className="container">
      <Header handleSearchChange={handleSearchChange} handleSubmit={submitSearchShow}/>
      {show.loaded && <DisplayShow show={show}/>}

      <ReplaceShow
        dropdownValues={dropdownValues}
        handleSeasonChange={handleCurrentSeasonChange}
        handleEpisodesChange={handleDropdownEpisodes}
      />

      <SeasonList episodes={episodes}/>
    </div>
  );
}

export default App;

