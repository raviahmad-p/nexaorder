const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// 🔥 CREATE PAYMENT
exports.createPayment = async (req, res) => {
  try {
    const { orderId, method, amount } = req.body

    // ❌ VALIDASI (400)
    if (
      orderId === undefined ||
      method === undefined ||
      amount === undefined
    ) {
      return res.status(400).json({
        error: "Semua field wajib diisi"
      })
    }

    // ❌ CEK ORDER ADA ATAU TIDAK (404)
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      return res.status(404).json({
        error: "Order tidak ditemukan"
      })
    }

    // 🔥 CREATE PAYMENT
    const payment = await prisma.payment.create({
      data: {
        orderId,
        method,
        amount
      }
    })

    res.json(payment)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

// 🔥 GET ALL PAYMENTS
exports.getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        order: true
      }
    })

    res.json(payments)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}