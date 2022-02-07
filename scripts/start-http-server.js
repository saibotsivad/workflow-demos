import promises from 'node:timers/promises'
import { createServer } from 'node:http'
import mri from 'mri'
let { port, delay } = mri(process.argv.slice(2))

delay = parseInt(delay || 0, 10)
port = parseInt(port || 3000, 10)

if (delay) {
	const start = Date.now()
	console.log('Blocking delay to start the server.')
	await promises.setTimeout(delay)
	// If you've backgrounded the startup using a simple `&` you will find that
	// this error message is never seen.
	console.log(`Starting the server after a ${Date.now() - start}ms delay. (Expected: ~${delay})`)
}

const server = createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('Hello World')
})

server.listen(port, '127.0.0.1', () => {
	console.log(`Server running at http://127.0.0.1:${port}/`)
})

setInterval(() => {
	console.log('The server is printing some output.')
}, 1000)
