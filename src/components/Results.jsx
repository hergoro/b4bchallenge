import React from 'react'
import { Grid, Avatar, CardHeader, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const results = ({ results }) => {
	return (
		<Grid container direction='row' spacing={2}>
			{results.map((result) => (
				<Grid item key={result.id}>
					<Card sx={{ maxWidth: 345 }}>
						<CardHeader
							avatar={
								<Avatar sx={{ bgcolor: red[500] }} aria-label="artist" src={result.cover_image} />
							}
							action={
								<IconButton aria-label="settings" onClick={() => { window.location.replace(result.resource_url) }}>
									<MoreVertIcon />
								</IconButton>
							}
							title={result.title}
							subheader={`${result.country}, ${result.year}`}
						/>
						<CardMedia
							component="img"
							height="194"
							image={result.thumb}
							alt={result.title}
						/>
						<CardContent>
							Edited in:
							{result.format ?
								result.format.map((formatType) => {
									return (
										<Typography key={formatType} variant="body2" color="text.secondary">
											{formatType}
										</Typography>
									)
								})
								: null
							}
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	)
}

export default results