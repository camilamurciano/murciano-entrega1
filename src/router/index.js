const productsController = require('../controllers/products.controllers')
const cartsController = require('../controllers/carts.controllers')
const realTimeProductsController = require('../controllers/realTimeProducts.controllers')

const router = app => {
    app.use("/api/products", productsController)
    app.use("/api/carts", cartsController)
    app.use ("/realtimeproducts", realTimeProductsController)
}

module.exports = router