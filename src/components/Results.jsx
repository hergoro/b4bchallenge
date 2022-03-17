import Item from './Item';
import React from 'react'
import { Grid } from '@mui/material';

const results = ({ results, addFavorite }) => {

	return (
		<Grid container direction='row' justifyContent='center' spacing={2}>
			{results.map((result) => (
				<Grid item key={result.id}>
					<Item result={result} addFavorite={addFavorite} />
				</Grid>
			))}
		</Grid>
	)
}
export default results