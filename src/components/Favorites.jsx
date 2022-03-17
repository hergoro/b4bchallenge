import React, { Fragment } from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	SwipeableDrawer,
	Grid,
	Avatar,
	IconButton,
	Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
	backgroundColor: grey[300],
}));

const Puller = styled(Box)(({ theme }) => ({
	backgroundColor: grey[200],
	borderRadius: 3,
	position: 'absolute',
	top: 8,
	left: 'calc(50% - 15px)',
}));

function Favorites({ favoritesOpen, favorites, favAdded, setFavAdded, deleteFavorite }) {

	return (
		<Fragment>
			<Global
				styles={{
					'.MuiDrawer-root > .MuiPaper-root': {
						height: `calc(50% - ${drawerBleeding}px)`,
						overflow: 'visible',
					},
				}}
			/>
			<SwipeableDrawer
				anchor='bottom'
				open={favoritesOpen.open}
				onClose={favoritesOpen.handleClick}
				onOpen={favoritesOpen.handleClick}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={false}
				ModalProps={{
					keepMounted: true,
				}}
			>
				<StyledBox
					sx={{
						position: 'absolute',
						top: -drawerBleeding,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						visibility: 'visible',
						right: 0,
						left: 0,
					}}
				>
					<Puller />
					<Grid container direction='row' alignItems='center'>
						<Grid item>
							<Typography sx={{ p: 2, color: 'text.secondary' }}>
								Favorites
							</Typography>
						</Grid>
						<Grid item sx={{ mr: 10, ml: 'auto' }}>
							{favoritesOpen.open ?
								<IconButton onClick={favoritesOpen.handleClick}><CloseIcon /></IconButton>
								: null
							}
						</Grid>
					</Grid>
				</StyledBox>
				<StyledBox
					sx={{
						px: 2,
						pb: 2,
						height: '100%',
						overflow: 'auto',
						backgroundColor: 'white'
					}}
				>
					{favorites ?
						<TableContainer component={Paper} sx={{ mt: 2 }}>
							<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
								<TableHead>
									<TableRow>
										<TableCell>Avatar</TableCell>
										<TableCell>Id</TableCell>
										<TableCell>Artist / Album</TableCell>
										<TableCell>Genre</TableCell>
										<TableCell>Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{favorites.map((fav) => (
										<TableRow
											key={fav.id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component='th' scope='row'><Avatar sx={{ bgcolor: 'grey' }} aria-label='artist' src={fav.avatar} /></TableCell>
											<TableCell>{fav.id}</TableCell>
											<TableCell>{fav.item}</TableCell>
											<TableCell>{fav.genres ? fav.genres.join(', ') : ''}</TableCell>
											<TableCell><IconButton aria-label='delete' onClick={() => deleteFavorite(fav)}><DeleteForeverIcon /></IconButton></TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						: <h3>No favorites</h3>
					}
				</StyledBox>
			</SwipeableDrawer>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={favAdded}
				autoHideDuration={2000}
				onClose={() => setFavAdded(false)}
				message='Favorite added'
				severity='success'
			/>
		</Fragment>
	);
}

export default Favorites;