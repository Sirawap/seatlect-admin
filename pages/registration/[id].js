import React, { useState, useEffect } from 'react';

import { getEmployeeRepo } from 'src/employeeRepo';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '@material-ui/core/Modal';

import RegistrationCard from './RegistrationCard';
import CreateViewModal from './createViewModal'


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		height: `500px`,
		width: `100%`
	},
	control: {
		padding: theme.spacing(2)
	},
	createButton: {
		display: `flex`,
		justifyContent: `flex-end`
	}
}));

const _initialData =  [
  {
    "_id": "9 3 8 4 6 9",
    "businessName": "Brightio",
    "type": "Bar",
    "tags": [
      "string"
    ],
    "description": "High-end bar",
    "location": {
      "latitude": 100,
      "longitude": -123
    },
    "address": "123 State Avenue Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },{
    "_id": "0 3 2 7 1 7",
    "businessName": "Tate Cafe",
    "type": "Cafe",
    "tags": [
      "string"
    ],
    "description": "Airport Cafe, coconut juice is the best, recomended recipe, bluh bluh bluh ..........................................................................................................................",
    "location": {
      "latitude": 123,
      "longitude": -189
    },
    "address": "123/1 Airport Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },
  {
    "_id": "7 1 7 7 8 3",
    "businessName": "Brightio",
    "type": "Bar",
    "tags": [
      "string"
    ],
    "description": "High-end bar",
    "location": {
      "latitude": 100,
      "longitude": -123
    },
    "address": "123 State Avenue Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },
  {
    "_id": "0 3 1 7 0 6",
    "businessName": "Brightio",
    "type": "Bar",
    "tags": [
      "string"
    ],
    "description": "High-end bar",
    "location": {
      "latitude": 100,
      "longitude": -123
    },
    "address": "123 State Avenue Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },
  {
    "_id": "0 7 9 1 3 5",
    "businessName": "Brightio",
    "type": "Bar",
    "tags": [
      "string"
    ],
    "description": "High-end bar",
    "location": {
      "latitude": 100,
      "longitude": -123
    },
    "address": "123 State Avenue Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },
  {
    "_id": "7 8 2 1 1 3",
    "businessName": "Brightio",
    "type": "Bar",
    "tags": [
      "string"
    ],
    "description": "High-end bar",
    "location": {
      "latitude": 100,
      "longitude": -123
    },
    "address": "123 State Avenue Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },
  {
    "_id": "7 8 7 7 2 1",
    "businessName": "Brightio",
    "type": "Bar",
    "tags": [
      "string"
    ],
    "description": "High-end bar",
    "location": {
      "latitude": 100,
      "longitude": -123
    },
    "address": "123 State Avenue Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },
  {
    "_id": "3 7 6 7 6 8",
    "businessName": "Brightio",
    "type": "Bar",
    "tags": [
      "string"
    ],
    "description": "High-end bar",
    "location": {
      "latitude": 100,
      "longitude": -123
    },
    "address": "123 State Avenue Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },
  {
    "_id": "4 5 7 2 8 4",
    "businessName": "Brightio",
    "type": "Bar",
    "tags": [
      "string"
    ],
    "description": "High-end bar",
    "location": {
      "latitude": 100,
      "longitude": -123
    },
    "address": "123 State Avenue Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },
  {
    "_id": "8 3 2 9 4 7",
    "businessName": "Brightio",
    "type": "Bar",
    "tags": [
      "string"
    ],
    "description": "High-end bar",
    "location": {
      "latitude": 100,
      "longitude": -123
    },
    "address": "123 State Avenue Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },
  {
    "_id": "8 3 8 5 8 6",
    "businessName": "Brightio",
    "type": "Bar",
    "tags": [
      "string"
    ],
    "description": "High-end bar",
    "location": {
      "latitude": 100,
      "longitude": -123
    },
    "address": "123 State Avenue Bangkok 13520",
    "displayImage": "string",
    "images": [
      "string"
    ]
  },
]

export default function Registration({ regiester }) {
	// Initial setup
	const classes = useStyles();

	// Id state is the id of the business
	const [id, setId] = useState('');
	const [data, setData] = useState(_initialData);

	const [openView, setOpenView] = React.useState(false);

	// employee username + password
	const [selectedBusiness, setBusinessInfo] = React.useState('');

	// Handle open close modal
  const handleOpenView = (info) => {
		setOpenView(true);
		setBusinessInfo(info);
	};
	const handleCloseView = () => {
		setOpenView(false);
	};

	// Set if request form should be visible
	const [requestForm, setRequestForm] = useState(false);

	// load initial id from local storage
	useEffect(function () {
		setId(localStorage.getItem('_id'));
	}, []);

	const body = (
		<div className={classes.paper}>
			<h2 id="simple-modal-title">Create new employee</h2>
			<p id="simple-modal-description">test</p>
		</div>
	);

	return (
		<Layout id={id}>
			<h2>New Registration</h2>
      {/* --- Body section : Registration card --- */}
			{data.map((register, i) => {
				return (
					<Grid item xs={12} key={register._id}>
						<RegistrationCard
							key={register._id}
							id={register._id}
							openView={() => handleOpenView(register)}
						></RegistrationCard>
					</Grid>
				);
			})}
      <Modal
					open={openView}
					onClose={handleCloseView}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<CreateViewModal
						className={classes.modal}
            business={selectedBusiness}
						onClickClose={() => {
							handleCloseView();
						}}
					/>
				</Modal>
		</Layout>
	);
}

// export async function getServerSideProps(ctx) {
// 	// Get params
// 	let env = process.env.NEXT_PUBLIC_ENV;
// 	let id = ctx.params.id;
// 	let employees = [];

// 	// Get initial data
// 	let empRepo = getEmployeeRepo({ env, id, url: process.env.NEXT_PUBLIC_BE });
// 	try {
// 		employees = await empRepo.getEmployee();
// 	} catch (e) {
// 		// TODO handle error
// 	}

// 	return {
// 		props: {
// 			employees: employees
// 		}
// 	};
// }