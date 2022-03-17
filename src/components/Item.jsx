import React, { useState } from 'react'
import {
	Avatar,
	CardHeader,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Collapse,
	styled,
	CardActions,
	CircularProgress,
	List,
	Tooltip,
	ListItemText,
	Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const Item = ({ result, addFavorite }) => {
	const [expanded, setExpanded] = useState(false);
	const [details, setDetails] = useState()

	const handleExpandClick = () => {
		setExpanded(!expanded);
		seeMoreInfo(result.resource_url)
	};

	const seeMoreInfo = (resource_url) => {
		fetch(resource_url)
			.then(respones => respones.json())
			.then(data => {
				setDetails(data)
			})
	}

	return (
		<Card sx={{ width: 345 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label='artist' src={result.thumb} />
				}
				action={
					<Tooltip title="See in Discogs...">
						<IconButton aria-label='settings' onClick={() => { window.location.replace(`https://www.discogs.com/${result.uri}`) }}>
							<MoreVertIcon />
						</IconButton>
					</Tooltip>
				}
				title={result.title}
				subheader={`${result.country ? result.country + ', ' : ''}${result.year ? result.year : ''}`}
			/>
			<CardMedia
				component='img'
				height='auto'
				image={result.cover_image}
				alt={result.title}
			/>
			<CardContent>
				<CardActions disableSpacing>
					<Tooltip title="Add to favorites">
						<IconButton onClick={() => addFavorite(result)} aria-label='add to favorites'>
							<FavoriteIcon />
						</IconButton>
					</Tooltip>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label='show more'
					>
						<Tooltip title="More info">
							<ExpandMoreIcon />
						</Tooltip>
					</ExpandMore>
				</CardActions>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>
						{details ?
							<>
								{details.title ? <><Typography variant='subtitle1' sx={{ mb: 0.5, mt: 0.5 }}>Title:</Typography><Typography variant='body2'> {details.title}</Typography></> : null}
								{details.name ? <><Typography variant='subtitle1' sx={{ mb: 0.5, mt: 0.5 }}>Artist:</Typography><Typography variant='body2'> {details.name}</Typography></> : null}
								{details.notes ? <><Typography variant='subtitle1' sx={{ mb: 0.5, mt: 0.5 }}>Notes:</Typography><Typography variant='body2'> {details.notes}</Typography></> : null}
								{details.tracklist ?
									<><Typography variant='subtitle1'>Tracklist:</Typography>
										<List dense={true}>
											{details.tracklist.map(track =>
												<ListItemText key={`${track.position}-${Math.random()}`} sx={{ m: 0.5 }}
													primary={track.title}
												/>
											)}
										</List>
									</>
									: null
								}
								{details.members ?
									<><Typography variant='subtitle1'>Members:</Typography>
										<List dense>
											{details.members.filter(member => member.active === true).map(member =>
												<ListItemText key={member.id} sx={{ m: 0.5 }}
													primary={member.name}
												/>
											)}
										</List>
									</> : null
								}
								{details.profile ? <><Typography variant='subtitle1' sx={{ mb: 0.5, mt: 0.5 }}>Profile:</Typography><Typography variant='body2'> {details.profile}</Typography></> : null}
								{details.genres ? <><Typography variant='subtitle1' sx={{ mb: 0.5, mt: 0.5 }}>Genres:</Typography><Typography variant='body2'> {details.genres.join(', ')}</Typography></> : null}
								{result.label ? <><Typography variant='subtitle1' sx={{ mb: 0.5, mt: 0.5 }}>Label:</Typography><Typography variant='body2'> {[...new Set(result.label)].join(', ')}</Typography></> : null}
							</>
							:
							<CircularProgress sx={{ mt: '40vh' }} />
						}
					</CardContent>
				</Collapse>
			</CardContent>
		</Card>
	)
}

export default Item