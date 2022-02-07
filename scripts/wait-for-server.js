/*

This script simply attempts to make a GET request to localhost on the port specified, and
will keep trying until it gets a 200 response.

*/

import promises from 'node:timers/promises'
import { get } from 'httpie'
import mri from 'mri'
const argv = mri(process.argv.slice(2))

const pingServer = async () => {
	try {
		const response = await get(`http://localhost:${argv.port || 3000}`)
		if (response.statusCode !== 200) {
			console.log('Waiting for a 200...')
			await promises.setTimeout(500)
			return pingServer()
		}
	} catch (error) {
		if (error.code === 'ECONNREFUSED') {
			console.log('Waiting to connect...')
			await promises.setTimeout(500)
			return pingServer()
		}
		throw error
	}
}

pingServer()
	.then(() => {
		console.log('Server returned a 200')
		process.exit(0)
	})
	.catch(error => {
		console.error(error)
		process.exit(1)
	})
