const items = require('../items')

const getItems = (req, res) => {
	res.send(items)
}

const getItemById = (req, res) => {
	const { id } = req.params
	const item = items.find(item => item.id === parseInt(id))
	res.send(item)
}

module.exports = {
	getItems,
	getItemById,
}
