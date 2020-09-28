/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */
import React from "react";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SpellcheckOutlinedIcon from '@material-ui/icons/SpellcheckOutlined';
import MoneyOutlinedIcon from '@material-ui/icons/MoneyOutlined';
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
/*
 *  --------------------------------------------------------------------------
 *                             Internal Dependencies
 *  --------------------------------------------------------------------------
 */

import Layout from "../Layout/Layout";
import { SecondaryButton } from "../Buttons/Buttons";




const styles = makeStyles({
	root: {
		minHeight: "100vh",
		top: "10%",
		background: "#1a268f",
		height: "auto"
	},
	spanSecondary: {
		color: "#ffd467"

	},
	introSection: {
		color: "#fff",
		display: "flex",
		marginTop: "20%",
		alignItems: "center",
		justifyContent: "center"
	},
	introTextSmall: {
		marginBottom: "40px"
	},
	heading: {
		fontWeight:600,
		textTransform: "uppercase"
	},
	card: {
		padding: "20px",
		boxShadow:"0 4px 20px -5px rgba(0, 0, 0, 0.1)",
		borderRadius: "4px"
	},
	cta: {
		background:"#1a268f",
		color: "#fff"
	}
})
const Home = () => {
	const classes = styles()
	return(
		<Layout>
			<section className={classes.root}>
				<Container maxWidth="md">
					<Box className={classes.introSection}>
						<Box>
							<Typography variant="h2" gutterBottom>
								Get Access To <span className={classes.spanSecondary}>Instant Fast Loans</span> With Low Interest Rate.
							</Typography>
							<Typography variant="h5" gutterBottom className={classes.introTextSmall}>
								No Collateral, No Delays.
							</Typography>
							<SecondaryButton linkTo="/login" content="Get Started"/>
						</Box>
					</Box>
				</Container>
			</section>

			<section>
				<Container maxWidth="md">
					<Box>
						<Typography variant="h4" gutterBottom className={classes.heading} color="primary">
							Why <span className={classes.spanSecondary}>Choose</span> Us ?
						</Typography>
						<Typography variant="body1">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem possimus distinctio ex. Natus totam voluptatibus animi aspernatur ducimus quas
						</Typography>
					</Box>

					<Grid container spacing={5} justify="center">
						<Grid item md={4}>
							<Card className={classes.card}>
								<CardContent >
									<Typography>
										<Icon color="primary" fontSize="large">
										<FavoriteBorderOutlinedIcon/>
										</Icon>
									</Typography>
									<Typography variant="h5" gutterBottom color="primary">
										Fast
									</Typography>
									<Typography variant="body2">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem possimus distinctio ex. Natus totam voluptatibus animi aspernatur ducimus quas
									</Typography>

								</CardContent>
							</Card>
						</Grid>
						<Grid item md={4}>
							<Card className={classes.card}>
								<CardContent >
									<Typography>
										<Icon color="primary" fontSize="large">
										<SpellcheckOutlinedIcon/>
										</Icon>
									</Typography>
									<Typography variant="h5" gutterBottom color="primary">
										No Collateral
									</Typography>
									<Typography variant="body2">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem possimus distinctio ex. Natus totam voluptatibus animi aspernatur ducimus quas
									</Typography>

								</CardContent>
							</Card>
						</Grid>
						<Grid item md={4}>
							<Card className={classes.card}>
								<CardContent >
									<Typography>
										<Icon color="primary" fontSize="large">
										<MoneyOutlinedIcon/>
										</Icon>
									</Typography>
									<Typography variant="h5" gutterBottom color="primary">
										Low Interest Rate
									</Typography>
									<Typography variant="body2">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem possimus distinctio ex. Natus totam voluptatibus animi aspernatur ducimus quas
									</Typography>

								</CardContent>
							</Card>
						</Grid>
					</Grid>

				</Container>
			</section>
			<section className={classes.cta}>
				<Container maxWidth="md">
					<Box>
					<Typography variant="h3" gutterBottom>
						Hassle free Small Business loan up to <span className={classes.spanSecondary}>N500,000</span>
					</Typography>
					<SecondaryButton linkTo="/singup" content="Create an Account"/>
					</Box>
				</Container>
			</section>
		</Layout>
	)
}


export  default  Home
