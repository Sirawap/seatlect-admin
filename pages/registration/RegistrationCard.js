import React, { useState } from 'react';

import { getEmployeeRepo } from 'src/employeeRepo';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
// import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: `-10px`,
		padding: `10px`
	},
	heroImage: {
		width: 62.6953125,
		height: 40.0593471810089
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.primary.main,
		padding: `1rem`
	},
	drawerContainer: {
		overflow: 'auto'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	whiteColor: {
		color: `white`
	},
	primaryColor: {
		color: theme.palette.primary.main
	},
	item: {
		'&.Mui-selected, &.Mui-selected:hover': {
			backgroundColor: 'white'
		}
	},
	logoutButton: {
		'&.MuiListItem-button': {
			backgroundColor: theme.palette.error.main
		}
	},
	fullWidth: {
		width: `100%`
	},
	displayEnd: {
		display: `flex`,
		justifyContent: `space-around`
	},
  rejectButton:{
		backgroundColor: `#F57070`,
		color: theme.palette.error.contrastText,
		"&:hover":{
				backgroundColor: theme.palette.error.dark
		},
		"&:disabled":{
				backgroundColor: theme.palette.error.light
		}
	},
  approveButton:{
		backgroundColor: `#8bc34a`,
		color: theme.palette.error.contrastText,
		"&:hover":{
				backgroundColor: `#618833`
		},
		"&:disabled":{
				backgroundColor: theme.palette.error.light
		}
	},
}));

export default function RegistrationCard({
	id,
	openView,
	BusinessInfo,
	}) {
	const classes = useStyles();

	// Setup repo
	const repo = getEmployeeRepo({
		env: process.env.NEXT_PUBLIC_ENV,
		url: process.env.NEXT_PUBLIC_BE,
		id: id
	});

	async function deleteItem(e) {
		e.preventDefault();

		// try {
		// 	await repo.deleteEmployee({ username });

		// 	let tmp = [...employees];
		// 	tmp.splice(index, 1);

		// 	setEmployee(tmp);
		// } catch (e) {
		// 	console.log(e);
		// }
	}

	return (
		<Card className={classes.root}>
			<Grid container className={classes.root} spacing={1}>
				{/* --- username section --- */}
				<Grid item xs={6}>
					<p>Business id : {id}</p>
				</Grid>


				<Grid item xs={6} className={classes.displayEnd}>
					{/* --- edit button section --- */}
					<Button size="small" disableElevation onClick={() => openView()}>
						<ImportContactsIcon color="primary" />
					</Button>
					{/* --------------------------------------- */}
					{/* --- delete button section --- */}
					<Button size="small" variant="contained" className={classes.approveButton} disableElevation onClick={deleteItem}>
						Approve
					</Button>
          {/* --- delete button section --- */}
					<Button size="small" variant="contained" className={classes.rejectButton} disableElevation onClick={deleteItem}>
						Reject
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
}
