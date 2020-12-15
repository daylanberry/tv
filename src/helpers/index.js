// creates random number to generate show randomly by id
export const randomNumber = () => {
  return Math.floor(Math.random() * 10000)
}


// This function returns the array of all the seasons numerically to account for skipped seasons
export const createSeasonArray = (episodes) => {
  let seasonArray = Array.from(new Set(episodes.map(ep => ep.season)))
  return seasonArray
}


