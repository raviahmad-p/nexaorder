const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, categoryId } = req.body

    if (!name || !price || !stock || !categoryId) {
      return res.status(400).json({
        error: "Semua field wajib diisi"
      })
    }

    const product = await prisma.product.create({
      data: { name, price, stock, categoryId }
    })

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET PRODUCT BY ID (buat error 404)
exports.getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    })

    if (!product) {
      return res.status(404).json({
        error: "Product tidak ditemukan"
      })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}