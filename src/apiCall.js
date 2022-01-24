import axios from "axios"

const axiosInstance = axios.create({
	baseURL: "https://brock002.pythonanywhere.com/",
})

const invokeApi = (request, callback) => {
	// create config for request
	let config = {
		method: request.method,
		url: request.url,
	}
	if (request.headers !== undefined) {
		config.headers = request.headers
	} else {
		config.headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}
	}
	if (request.data !== undefined) {
		config.data = request.data
	}
	if (request.params !== undefined) {
		config.params = request.params
	}
	if (request.responseType !== undefined) {
		config.responseType = request.responseType
	}

	// call API
	axiosInstance
		.request(config)
		.then(res => {
			// callback should always take 2 arguments : response & status (boolean: success or failure)
			callback(res.data, true)
		})
		.catch(err => {
			if (err.response !== undefined) {
				callback(err.response.data, false)
			} else {
				callback(undefined, false)
			}
		})
}

export default invokeApi
