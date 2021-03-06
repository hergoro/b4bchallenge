import React, { Fragment, useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  Pagination,
  CircularProgress,
  Button
} from '@mui/material';
import useOpen from './hooks/useOpen'
import Results from './components/Results'
import Favorites from './components/Favorites'
import { useLocalStorage } from './hooks/useLocalStorage';
export class FavoriteItem {
  avatar
  id
  item
  genres

  constructor(avatar, id, item, genres) {
    this.avatar = avatar
    this.id = id
    this.item = item
    this.genres = genres
  }
}

const App = () => {
  const [dataForSearch, setDataForSearch] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState();
  const [pages, setPages] = useState();
  const [loading, setLoading] = useState();
  const [favAdded, setFavAdded] = useState(false);
  const [favorites, setFavorites] = useLocalStorage('favoritesList', [])

  const keyAndSecret = 'key=jgQRIYTqTaLYrXEqsccr&secret=OMjRyDDttdlzxYLAKCcCzhuJrMZizoHk'

  const favoritesOpen = useOpen()

  const searchingArtist = (actualPage = 1) => {
    setLoading(true)
    fetch(`https://api.discogs.com/database/search?q=${dataForSearch}&${keyAndSecret}&page=${actualPage}&per_page=50`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(data => {
        setResults(data.results.filter(result => result.type === 'release' || result.type === 'artist'))
        setPage(data.pagination.page)
        setPages(data.pagination.pages)
        setLoading(false)
      })
  }

  const handlePage = (event, value) => {
    searchingArtist(value)
  }

  const addFavorite = (item) => {
    let favObjet = new FavoriteItem(item.cover_image, item.id, item.title, item.genre)
    setFavorites([...favorites, favObjet])
    setFavAdded(true);
  }

  const deleteFavorite = (value) => {
    setFavorites(favorites.filter(fav => fav !== value))
  }

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete='off'
      data-testid="principalBox"
    >
      <Grid container direction='row' justifyContent='center' spacing={2}>
        <Grid container direction='column' justifyContent='center' alignContent='center'>
          <Grid item>
            <img src={require("./imgs/logodgfb4b.png")} alt='logo' />
          </Grid>
          <Grid item alignSelf='center' sx={{ m: 2, mb: 1 }}>
            <TextField
              id='search-field'
              label='Search artist, album or both'
              variant='outlined'
              onChange={(e) => setDataForSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  searchingArtist()
                  e.preventDefault();
                }
              }} />
          </Grid>
          <Grid item alignSelf='center'>
            <Button onClick={favoritesOpen.handleClick}>Favorites</Button>
          </Grid>
        </Grid>
        {loading !== undefined && loading === true ?
          <CircularProgress sx={{ mt: '40vh' }} />
          :
          results.length > 0 ?
            <Fragment>
              <Results results={results} addFavorite={addFavorite} />
              <Grid container justifyContent='center'>
                <Pagination variant='outlined' page={page} count={pages} sx={{ mt: 5 }} onChange={handlePage} />
              </Grid>
            </Fragment>
            :
            null
        }
        <Favorites favoritesOpen={favoritesOpen} favorites={favorites} deleteFavorite={deleteFavorite} setFavAdded={setFavAdded} favAdded={favAdded} />
      </Grid>
    </Box >
  )
}

export default App;
