import React, { useState, useEffect } from 'react';

import { getRequestRepo } from 'src/requestRepo';
import { getBusinessRepo } from 'src/businessRepo';
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
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';

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
	},
  navColor: {
    color: `#C0C0C0`
  }
}));

const _initialData =  [
    {
      "_id": "1 3 2 5 4 6",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
    {
      "_id": "2 6 8 4 9 5",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
    {
      "_id": "8 3 9 5 5 8",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
    {
      "_id": "9 1 3 5 7 6",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
    {
      "_id": "7 8 6 1 3 5",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
    {
      "_id": "3 5 4 6 8 4",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
    {
      "_id": "2 2 6 4 9 1",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
    {
      "_id": "5 9 8 1 3 5",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
    {
      "_id": "4 8 9 1 6 3",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
    {
      "_id": "1 3 5 7 4 8",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
    {
      "_id": "1 1 2 6 8 4",
      "businessName": "Brightio",
      "type": "Bar",
      "tags": [
        "string"
      ],
      "description": "Description",
      "location": {
        "latitude": 0,
        "longitude": 0
      },
      "address": "123 State Avenue Bangkok 10530"
    },
  ]

const _theBusiness = {
    "_id": "0 3 2 7 1 7",
    "businessName": "Tate Cafe",
    "type": "Cafe",
    "tags": [
      "string"
    ],
    "description": "Airport Cafe, coconut juice is the best, recomended recipe, bluh bluh bluh ..........................................................................................................................",
    "location": {
      "latitude": 123,
      "longitude": -123
    },
    "address": "21/8 Airport King R. Bangkok 15460"
}

export default function Request({ requests }) {
	// Initial setup
	const classes = useStyles();

	// Id state is the id of the business
	const [id, setId] = useState('');
	// const [data, setData] = useState(_initialData);
  const [data, setData] = useState(requests);
  const [page,setPage] = useState(1);

	const [openView, setOpenView] = React.useState(false);

	// Business Infomation
	const [selectedBusiness, setBusinessInfo] = React.useState('');
  const [oldBusiness, setOldBusinessInfo] = React.useState(_theBusiness)

  	// Setup repo
	const reqRepo = getRequestRepo({
		url: 'http://35.185.180.140:9999/api/v1'
	}); 

  const busRepo = getBusinessRepo({
		url: 'http://35.185.180.140:9999/api/v1'
	});

  // fetchData
  function fetch() {

    // after fetch
    setData(_data)
  }

	// Handle open close modal
  async function handleOpenView(info){
    // id of the selected business
    let id = info._id
		setBusinessInfo(info);

    // fetch old business info
    let response = await busRepo.getCertainBusiness(id);
    // console.log(response)
    setOldBusinessInfo(response)
    
    setOpenView(true); 
	};

	const handleCloseView = () => {
		setOpenView(false);
	};

  // Handle Page
  const handleFirstPage = () => {
    setPage(1)
    fetch
  }
  const handlePreviousPage = () => {
    setPage(page-1)
    fetch()
  }
  const handleNextPage = () => {
    setPage(page+1)
    fetch()
  }
  const handleLastPage = () => {
    setPage(10)
    fetch()
  }

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
			<h2>Request changing of business information</h2>
      {/* --- Body section : Registration card --- */}
			{data.map((request, i) => {
				return (
					<Grid item xs={12} key={request._id}>
						<RegistrationCard
							key={request._id}
							id={request._id}
							openView={() => handleOpenView(request)}
              requests={data}
              setRequest={setData}
              index={i}
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
          old = {oldBusiness}
					onClickClose={() => {
						handleCloseView();
					}}
				/>
			</Modal>
      <Box display="flex" justifyContent="flex-end" >
        { (page-2) <= 0 ? "" : <Button className={classes.navColor} onClick={handleFirstPage}><FastRewindIcon /></Button>}
        { (page-1) <= 0 ? <div></div>:<Button className={classes.navColor} onClick={handlePreviousPage}>{page -1}</Button>}
        <Button><b>Page {page}</b></Button>
        { page > 9 ? "" : <Button className={classes.navColor} onClick={handleNextPage}>{page+1}</Button>}
        { page > 8 ? "" : <Button className={classes.navColor} onClick={handleLastPage}><FastForwardIcon /></Button>}
      </Box>
		</Layout>
	);
}


export async function getServerSideProps() {
	// Get params
	let _url = 'http://35.185.180.140:9999/api/v1'
	// let id = ctx.params.id;
  let _initialPage = 1;
	let requests = [];
  let response = {}
	// Get initial data
	let reqRepo = getRequestRepo({ url: _url});
  try {
		response = await reqRepo.getRequest(_initialPage);
    requests = response.request
    // console.log(`Response______________________________________________`)
    // console.log(response)
    // console.log(`Requst______________________________________________`)
    // console.log(requests)
    // console.log(`Main______________________________________________`)
	} catch (e) {
		// TODO handle error
	}

	return {
		props: {
			requests
		}
	};
}
