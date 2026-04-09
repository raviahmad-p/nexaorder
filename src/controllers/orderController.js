const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createOrder = async (req, res) => {
  try {
    const { tableId, items } = req.body

    let total = 0

    for (let item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      })

      if (!product) {
        return res.status(404).json({ error: "Product tidak ditemukan" })
      }

      total += product.price * item.quantity
    }

    const order = await prisma.order.create({
      data: {
        tableId,
        total,
        status: "PENDING",
        items: {
          create: items
        }
      },
      include: {    
        items: true
      }
    })

    res.json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true
      }
    })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}