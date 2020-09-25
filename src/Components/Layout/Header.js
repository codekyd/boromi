import * as React from "react";
import {
	AppBar,
	Container,
	Hidden,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	Toolbar, Typography
  } from "@material-ui/core";
  import HideOnScroll from "./HideOnScroll";
  import SideDrawer from "./SideDrawer";
import { Link } from "react-router-dom";
  const useStyles = makeStyles({
	navbarDisplayFlex: {
	  display: `flex`,
	  justifyContent: `space-between`
	},
	navListDisplayFlex: {
	  display: `flex`,
	  justifyContent: `space-between`
	},
	linkText: {
	  textDecoration: `none`,
	  textTransform: `uppercase`,
	  color: `white`
	}
  });
  const navLinks = [
	{ title: `signup`, path: `/signup` },
	{ title: `login`, path: `/login` },
  ];
  const Header = () => {
	const classes = useStyles();
	return (
	  <>
		<HideOnScroll>
		  <AppBar position="fixed">
			<Toolbar component="nav">
			  <Container maxWidth="md" className={classes.navbarDisplayFlex}>
				  <Link to="/" edge="start" aria-label="home" style={{ color: `white` }}>
					<Typography variant="h4">
						Boromi
					</Typography>
				  </Link>
				{/* hides navbar on small screens */}
				<Hidden smDown>
				  <List
					component="nav"
					aria-labelledby="main navigation"
					className={classes.navListDisplayFlex}
				  >
					{navLinks.map(({ title, path }) => (
					  <Link to={path} key={title} className={classes.linkText}>
						<ListItem button>
						  <ListItemText primary={title} />
						</ListItem>
					  </Link>
					))}
				  </List>
				</Hidden>
				{/* hides side bar on large screens */}
				<Hidden mdUp>
				  <SideDrawer navLinks={navLinks} />
				</Hidden>
			  </Container>
			</Toolbar>
		  </AppBar>
		</HideOnScroll>
	  </>
	);
  };

  export default Header;