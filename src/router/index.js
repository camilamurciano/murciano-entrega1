const productsController = require('../controllers/products.controllers')
const cartsController = require('../controllers/carts.controllers')

const router = app => {
    app.use('/api/products', productsController)
    app.use('/api/carts', cartsController)
}

module.exports = router