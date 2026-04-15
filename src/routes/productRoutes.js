const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
const auth = require('../middleware/auth')

// GET ALL PRODUCTS
router.get('/', auth, productController.getProducts)

// GET PRODUCT BY ID
router.get('/:id', auth, productController.getProductById)

// CREATE PRODUCT
router.post('/', auth, productController.createProduct)

module.exports = router