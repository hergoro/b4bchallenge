import React, { useState } from 'react'
import { Avatar, CardHeader, Card, CardContent, CardMedia, IconButton, Collapse, styled, CardActions, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
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
					<Avatar sx={{ bgcolor: red[500] }} aria-label="artist" src={result.cover_image} />
				}
				action={
					<IconButton aria-label="settings" onClick={() => { window.location.replace(`https://www.discogs.com/${result.uri}`) }}>
						<MoreVertIcon />
					</IconButton>
				}
				title={result.title}
				subheader={`${result.country ? result.country + ', ' : ''}${result.year ? result.year : ''}`}
			/>
			<CardMedia
				component="img"
				height="194"
				image={result.thumb}
				alt={result.title}
			/>
			<CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon onClick={() => addFavorite(result)} style={{ cursor: 'pointer' }} />
					</IconButton>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						{details ?
							<>
								{details.title ? <><span>Title:</span><h4> {details.title}</h4></> : null}
								{details.name ? <><span>Artist:</span><h4> {details.name}</h4></> : null}
								{details.notes ? <><span>Notes:</span><h4> {details.notes}</h4></> : null}
								{details.tracklist ?
									<><span>Tracklist:</span>
										<List dense>
											{details.tracklist.map(track =>
												<ListItem>
													<ListItemText
														primary={track.title}
													/>
												</ListItem>
											)}
										</List>
									</>
									: null
								}
								{details.members ?
									<><span>Members:</span>
										<List dense>
											{details.members.filter(member => member.active === true).map(member =>
												<ListItem>
													<ListItemText
														primary={member.name}
													/>
												</ListItem>
											)}
										</List>
									</> : null
									}
								{details.profile ? <><span>Profile:</span><h4> {details.profile}</h4></> : null}
								{details.genres ? <><span>Genres:</span><h4> {details.genres.join(', ')}</h4></> : null}
								{result.label ? <><span>Label:</span><h4> {[...new Set(result.label)].join(', ')}</h4></> : null}
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