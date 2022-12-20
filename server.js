const itemRoutes = require('./routes/items')
const fastify = require('fastify')({ logger: true })
const fp = require('fastify-plugin')
const PORT = 4000

fastify.register(require('@fastify/swagger'), {
	swagger: {
		info: {
			title: 'Test swagger',
			description: 'Testing the Fastify swagger API',
			version: '0.1.0',
		},
		externalDocs: {
			url: 'https://swagger.io',
			description: 'Find more info here',
		},
		host: 'localhost',
		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json'],
		tags: [
			{ name: 'user', description: 'User related end-points' },
			{ name: 'code', description: 'Code related end-points' },
		],
		// definitions: {
		// 	User: {
		// 		type: 'object',
		// 		required: ['id', 'email'],
		// 		properties: {
		// 			id: { type: 'string', format: 'uuid' },
		// 			firstName: { type: 'string' },
		// 			lastName: { type: 'string' },
		// 			email: { type: 'string', format: 'email' },
		// 		},
		// 	},
		// },
		// securityDefinitions: {
		// 	apiKey: {
		// 		type: 'apiKey',
		// 		name: 'apiKey',
		// 		in: 'header',
		// 	},
		// },
	},
})

fastify.register(
	fp(function pluginA(fastify, options, done) {
		fastify.decorate('multiply', (a, b) => a * b)
		console.log(fastify.multiply)

		fastify.register(function pluginChild(fastify, options, done) {
			console.log(fastify.multiply)
			done()
		})
		done()
	})
)

//! Will throw a error
// fastify.register(function plugnB(fastify,options, done){
// 	console.log(fastify.multiply)
// 	done()
// })
fastify.register(itemRoutes)

// const start = async () => {
// 	try {
// 		await fastify.listen(PORT)
// 		console.log('Server started...')
// 	} catch (error) {
// 		fastify.log.error(error)
// 		process.exit(1)
// 	}
// }

// start()

fastify.listen({ port: PORT }, (err, address) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	fastify.log.info(`Server is now listening on ${address}`)
})

fastify.ready()
// fastify.swagger()
