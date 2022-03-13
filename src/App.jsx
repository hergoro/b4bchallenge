import React, { Fragment, useState } from 'react';
import { Box, TextField, Grid, Pagination, CircularProgress } from '@mui/material';
import Results from './components/Results'


const App = () => {
  const [dataForSearch, setDataForSearch] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState();
  const [pages, setPages] = useState();
  const [loading, setLoading] = useState();

  const keyAndSecret = 'key=jgQRIYTqTaLYrXEqsccr&secret=OMjRyDDttdlzxYLAKCcCzhuJrMZizoHk'

  const searchingArtist = ( actualPage = 1 ) => {
    setLoading(true)
    fetch(`https://api.discogs.com/database/search?q=${dataForSearch}&${keyAndSecret}&page=${actualPage}&per_page=50`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(data => {
        setResults(data.results.filter((result) => result.type === 'artist' || result.type === 'release'))
        setPage(data.pagination.page)
        setPages(data.pagination.pages)
        setLoading(false)
      })
  }

  const handlePage = (event, value) => {
    searchingArtist(value)
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container direction='row' justifyContent='center' spacing={2}>
        <Grid container direction='column' justifyContent='center' alignContent='center'>
          <Grid item>
            <img src={require("./imgs/logodgfb4b.png")} alt='logo' />
          </Grid>
          <Grid item alignSelf='center' sx={{m: 2}}>
            <TextField
              id="search-field"
              label="Search artist, album or both"
              variant="outlined"
              onChange={(e) => setDataForSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  searchingArtist()
                  e.preventDefault();
                }
              }} />
          </Grid>
        </Grid>
        {loading !== undefined && loading === true ?
          <CircularProgress sx={{ mt: '40vh' }} />
          :
          results.length > 0 ?
            <Fragment>
              <Results results={results} />
              <Grid container justifyContent='center'>
                <Pagination variant="outlined" page={page} count={pages} sx={{ mt: 5 }} onChange={handlePage} />
              </Grid>
            </Fragment>
            :
            null
        }
      </Grid>
    </Box >
  )
}

export default App;
