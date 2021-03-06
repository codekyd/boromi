import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { ButtonLink } from '../Buttons/Buttons';
import { logout } from '../../actions/auth';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

const  AppNav = ({ window, children, logout, user }) => {
	let history = useHistory();
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const handleLogOut = () => {
		logout();
		history.push('/login')
	}
	// choose links based on the current user authenticated
	const userLinks = [
		{ path:'/dashboard', content: 'Dashboard' },
		{ path:'/loans', content:'My Loans' },
		{ path:'/loan-requests', content:'My Loan Requests' },
	];
	const adminLinks = [
		{ path:'/admin', content: 'DashBoard' },
		{ path:'/admin/loans', content:'All Loans' },
		{ path:'/admin/loan-requests', content:'All Loan Requests' }
	]
	let dashBoardLinks = user.isAdmin ? adminLinks : userLinks
	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			{ dashBoardLinks.map((link) => (
							<List key={link.content}>
							<ListItem button>
								<ListItemText >
									<ButtonLink
										linkTo={link.path}
										content={link.content}
										/>
								</ListItemText>
							</ListItem>
						</List>
			)) }
			<Divider />
			<List>
				<ListItem button>
					<ListItemText onClick={handleLogOut}>
						Log Out
					</ListItemText>
				</ListItem>
			</List>

		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						Hi, {user.name}
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label='mailbox folders'>
				<Hidden smUp implementation='css'>
					<Drawer
						container={container}
						variant='temporary'
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant='permanent'
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Container maxWidth='lg'>
				{ children }
				</Container>
			</main>
		</div>
	);
}

const mapStateToProps = state => ({
	user: state.auth.user
})
export default connect(mapStateToProps, { logout })(AppNav);
