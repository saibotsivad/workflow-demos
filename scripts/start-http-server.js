import promises from 'node:timers/promises'
import { createServer } from 'node:http'
import mri from 'mri'
let { port, delay } = mri(process.argv.slice(2))

delay = parseInt(delay || 0, 10)
port = parseInt(port || 3000, 10)

if (delay) {
	console.log('Blocking delay to start the server.')
	await promises.setTimeout(delay)
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
