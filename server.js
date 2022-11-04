const items = require('./items')
const fastify = require('fastify')({ logger: true })
const PORT = 4000

fastify.get('/items', (req, res) => {
	res.send(items)
})

fastify.get('/items/:id', (req, res) => {
	const { id } = req.params
	const item = items.find(item => item.id === parseInt(id))
	res.send(item)
})

const start = async () => {
	try {
		await fastify.listen(PORT)
	} catch (error) {
		fastify.log.error(error)
		process.exit(1)
	}
}

start()
