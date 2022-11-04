const { getItems, getItemById } = require('../controllers/itemController')

const Item = {
	type: 'object',
	properties: {
		id: { type: 'string' },
		name: { type: 'string' },
	},
}

// ! For ts
// const opts: RouteShorthandOptions = {
const getItemsOpts = {
	// request needs to have a querystring with a `id` parameter
	querystring: {
		id: { type: 'string' },
	},
	schema: {
		response: {
			200: {
				type: 'array',
				items: Item,
			},
		},
	},
	// this function is executed for every request before the handler is executed
	preHandler: async (request, reply) => {
		// E.g. check authentication
	},
	handler: getItems,
}

const getItemByIdOpts = {
	schema: {
		response: {
			200: Item,
		},
	},
	handler: getItemById,
}

const addItemOpts = {
	schema: {
		body: {
			type: 'object',
			required: ['name'],
			properties: {
				name: { type: 'string' },
			},
		},
		response: {
			200: {
				type: 'array',
				items: Item,
			},
		},
	},
	handler: getItems,
}

function itemRoutes(fastify, options, done) {
	fastify.get('/items', getItemsOpts)

	fastify.get('/items/:id', getItemByIdOpts)

	fastify.post('/item', addItemOpts)

	done()
}

module.exports = itemRoutes
