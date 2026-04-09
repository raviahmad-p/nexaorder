const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET semua produk
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    })

    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// CREATE produk
exports.createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body

    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        stock: 100 // default stock
      }
    })

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}