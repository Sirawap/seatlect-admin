import React, { useState } from 'react';
import { Stage, Layer} from 'react-konva';

import { getReservationRepo } from 'src/reservationRepo';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';



// pre-define number
const canvasWidth = 800;
const canvasHeight = 800;

const drawerWidth = 240;

// pre-define type
const WALL1 = 'BLUE_WALL';
const WALL2 = 'BROWN_WALL';
const OBJ1 = 'OBJECT_CIRCLE';
const OBJ2 = 'OBJECT_SQUARE';
const TABLE1 = 'SHORT_TABLE';
const TABLE2 = 'TABLE';
const TABLE3 = 'LONG_TABLE';


const useStyles = makeStyles((theme) => ({
	root: {
		position: `absolute`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -55%)`,
    marginTop: `2rem`,
		width: `800px`,
		height: `600px`,
		backgroundColor: `white`,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
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
	displayImage: {
		height: 200
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	label: {
		color: `rgba(0, 0, 0, 0.87)`,
		fontWeight: `900`,
		fontSize: `1rem`,
		marginRight: `1rem`,
    marginBottom: `1rem`
	},
	Button: {
		width: `6.5rem`
	},
	cancelButton: {
		width: `6.5rem`,
		marginRight: `1.25rem`
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		margin: '0 0px 20px -10px'
	},
	textField2: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	row: {
		display: `flex`,
		margin: `15px 0px -20px 0px`
	},
	marginRightBot: {
		margin: `0px 0px 15px 0px`
	},
	marginBot: {
		margin: `60px 0px 0px 0px`
	},
	showError: {
		color: `red`,
		margin: `30px 10px -50px 0`
	},
  closeButton:{
		backgroundColor: `#F57070`,
		color: theme.palette.error.contrastText,
		"&:hover":{
				backgroundColor: theme.palette.error.dark
		},
		"&:disabled":{
				backgroundColor: theme.palette.error.light
		}
	},
  marginButtonRow:{
		marginTop: `-0.7rem`,
		marginBottom: `0.5rem`,
	}
}));

export default function CreateViewModal({ business, onClickClose }) {
	const classes = useStyles();

  let initialTable = [];
	let initialWalls = [];
	let initialObjects = [];
	let initialID = 0;
  
  

  // SET_STATE
	const [id, setId] = useState('');
	const [images, setImages] = useState(initialTable);
	const [objects, setObject] = useState(initialObjects);
  const [walls, setWall] = useState(initialWalls);
	const [selectedId, selectShape] = useState(null);
	const [selectedShape, setShape] = useState(null);

  // LOCAL REFERENCE
	const indexOfImage = React.useRef();
	const stageRef = React.useRef();
  const tableId = React.useRef(initialID);

	// setup repo
	const repo = getReservationRepo({
		env: process.env.NEXT_PUBLIC_ENV,
		url: process.env.NEXT_PUBLIC_BE,
		id: id
	});


	// setup handlers

	

	return (
    <Card className={classes.root}>
      <Box className={classes.marginButtonRow} display="flex" justifyContent="flex-end">
				<div className={classes.spacing}></div>
				<Button
					variant="contained"
					className={classes.closeButton}
					size="small"
					disableElevation
					onClick={()=>{onClickClose();}}
				>
          X
				</Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel className={classes.label}>Business Name</InputLabel>
					{/* --- business name time --- */}
					<TextField
						variant="outlined"
						fullWidth
            disabled
            value={business.businessName}
						className={classes.textField}
					/>
        </Grid>
        <Grid item xs={12}>
          <InputLabel className={classes.label}>Type</InputLabel>
					{/* --- business name time --- */}
					<TextField
						variant="outlined"
						fullWidth
            disabled
            value={business.type}
						className={classes.textField}
					/>
        </Grid>
        <Grid item xs={12}>
          <InputLabel className={classes.label}>Description</InputLabel>
					{/* --- business name time --- */}
					<TextField
						variant="outlined"
						fullWidth
            disabled
            value={business.description}
						className={classes.textField}
					/>
        </Grid>
        <Grid item xs={12}>
          <InputLabel className={classes.label}>Address</InputLabel>
					{/* --- business name time --- */}
					<TextField
						variant="outlined"
						fullWidth
            disabled
            value={business.address}
						className={classes.textField}
					/>
        </Grid>
        <Grid item xs={6}>
          <InputLabel className={classes.label}>Latitude</InputLabel>
					{/* --- business name time --- */}
					<TextField
						variant="outlined"
						fullWidth
            disabled
            value={business.location.latitude}
						className={classes.textField}
					/>
        </Grid>
        <Grid item xs={6}>
          <InputLabel className={classes.label}>Longitude</InputLabel>
					{/* --- business name time --- */}
					<TextField
						variant="outlined"
						fullWidth
            disabled
            value={business.location.longitude}
						className={classes.textField}
					/>
        </Grid>
      </Grid>
    </Card>
	);
}
