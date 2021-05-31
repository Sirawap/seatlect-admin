import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getAdminRepo } from 'src/adminRepo';
// import RegisterForm from 'src/components/RegisterForm';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
	root: {
		height: `100vh`
	},
	loginRoot: {
		padding: `10vh 12.5% 10vh 12.5%`
	},
	loginSubtitle: {
		color: `#BDBDBD`
	},
	loginButton: {
		marginTop: `1rem`,
		padding: `12px 22px`
	},
	createButton: {
		fontWeight: `700`
	}
});

export default function Login() {
	const classes = useStyles();
	const router = useRouter();

	const adminRepo = getAdminRepo({
		env: process.env.NEXT_PUBLIC_ENV,
		url: process.env.NEXT_PUBLIC_BE
	});

	// Input state
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// Presentation state
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [regForm, setRegForm] = useState(false);

	// Handlers
	async function handleLogin(e) {
		e.preventDefault();
		setLoading(true);

		try {
			await adminRepo.login({ username, password });
			router.push('/request/' + localStorage.getItem('_id'));
		} catch (e) {
			setError(true);
      console.log(e)
		}

		setLoading(false);
	}

	function closeError(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		setError(false);
	}

	return (
		<Grid container component="main" spacing={0} className={classes.root}>
			<Grid item component="div" sm={6}></Grid>
			<Grid item component="section" sm={6} className={classes.loginRoot}>
				<Box marginBottom={`2rem`}>
					<Typography component="h1" variant="h3">
						Seatlect Admin
					</Typography>
					<Typography component="h3" variant="h6" classes={{ root: classes.loginSubtitle }}>
						Please login to continue
					</Typography>
				</Box>
				<form autoComplete="off">
					<TextField
						required
						variant="outlined"
						fullWidth
						margin="normal"
						disabled={loading}
						label="Username"
						placeholder="Jiaroach"
						InputLabelProps={{ shrink: true }}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						required
						variant="outlined"
						fullWidth
						margin="normal"
						disabled={loading}
						label="Password"
						placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
						InputLabelProps={{ shrink: true }}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						variant="contained"
						color="primary"
						size="large"
						disabled={loading}
						disableElevation
						fullWidth
						classes={{ root: classes.loginButton }}
						onClick={handleLogin}
					>
						Sign in
					</Button>
				</form>
				<Snackbar open={error} autoHideDuration={3000} onClose={closeError}>
					<Alert onClose={closeError} severity="error">
						Authentication error
					</Alert>
				</Snackbar>
			</Grid>
		</Grid>
	);
}

export async function getServerSideProps(ctx) {
	// If already logged in - redirect to homepage
	if (ctx.req.cookies.token != undefined) {
		return { redirect: { destination: '/request', permanent: false } };
	}

	return { props: {} };
}

// Helper function
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
