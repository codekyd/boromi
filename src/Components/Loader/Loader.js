import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Grid} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));
const  Loader = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>

			<Grid  container
			       direction="row"
			       justify="flex-end"
			       alignItems="center"
			       spacing={2}
			>
				<Grid item xs={2} className={classes.root}>
					<CircularProgress />

				</Grid>
			</Grid>

		</div>
	);
}

export default  Loader;