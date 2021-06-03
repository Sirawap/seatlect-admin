import axios from 'axios';

class RequestRepo {
	constructor({ url, endpoint = '/request'}) {
		// Must pass in url and id
		this.url = url;
		this.endpoint = `${endpoint}`;
		console.log(endpoint)
	}

	async createRequest(args) {
		const { businessName, type, tags, description, location, address } = args;
		// TODO: Check arguments

		try {
			const response = await axios.post(this.url + this.endpoint);
			return response.data;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}

	async getRequest(args) {
		try {
			const response = await axios.get(this.url + this.endpoint+`?page=`+args);
			// console.log(response)
			// console.log(this.url + this.endpoint+`?page=`+args)
			return response.data;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}

	async setApprove(businessId) {
		try {
			const response = await axios.post(this.url + this.endpoint+`/`+businessId+`/approve`);
			// console.log(response)
			// console.log(this.url + this.endpoint+`?page=`+args)
			return response;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}

  async setReject(businessId) {
		try { 
			const response = await axios.delete(this.url + this.endpoint+`/`+businessId);
			// console.log(this.url + this.endpoint+`/`+businessId)
      // console.log(response)
			return response;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}
}

class RequestMockRepo {
	async createRequest(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';
	}
}

function getRequestRepo({ url}) {
	return new RequestRepo({ url});
}

export { RequestRepo, RequestMockRepo, getRequestRepo };
