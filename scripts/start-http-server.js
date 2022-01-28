import { createServer } from 'node:http'
import mri from 'mri'
const argv = mri(process.argv.slice(2))

const hostname = '127.0.0.1'
const port = parseInt(argv.port || 3000, 10)

const server = createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('Hello World')
})

server.listen(port, hostname, () => {
	console.log(`Server running at http://localhost:${port}/`)
})

setInterval(() => {
	console.log('The server is printing some output.')
}, 1000)
