import axios from 'axios';

class AdminRepo {
	constructor({ url, endpoint = '/admin' }) {
		// Must pass in url
		this.url = url;
		this.endpoint = endpoint;
	}

	async login(args) {
		const { username, password } = args;

		try {
			const res = await axios.post(this.url + this.endpoint + '/login', args);

			document.cookie = 'token=' + res.data._id;
			localStorage.setItem('_id', res.data._id);
		} catch (e) {
			// TODO add better error handling
			throw 'Authentication error';
		}
	}
}

class MockAdminRepo {
	async login(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		document.cookie = 'token=fakeToken';
		localStorage.setItem('_id', 'placeholder');
	}
}

// Construct UserRepo
function getAdminRepo({ env, url }) {
	if (env === 'development') {
		return new MockAdminRepo();
	}
	return new AdminRepo({ url });
}

export { AdminRepo, MockAdminRepo, getAdminRepo };
