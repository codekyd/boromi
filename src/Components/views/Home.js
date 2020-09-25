import React from "react";
import { Typography, Box, Container, makeStyles } from "@material-ui/core"
import Layout from "../Layout/Layout";
import { SecondaryButton } from "../Buttons/Buttons";

const styles = makeStyles({
	root: {
		minHeight: "100vh",
		top: "10%",
		background: "#1a268f",
		height: "auto"
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
								Get Access To Instant Fast Loans With Low Interest Rate.
							</Typography>
							<Typography variant="h5" gutterBottom className={classes.introTextSmall}>
								No Colleteral, No Delays.
							</Typography>
							<SecondaryButton linkTo="/login" content="Get Started"/>
						</Box>
					</Box>
				</Container>
			</section>

			<section>
				<Container maxWidth="md">
				<Typography variant="h3">
					Why Choose Us ?
				</Typography>
				</Container>
			</section>
		</Layout>
	)
}


export  default  Home
