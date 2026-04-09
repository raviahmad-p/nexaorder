const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createPayment = async (req, res) => {
  try {
    const { orderId, method, amount } = req.body

    // 1. simpan payment
    const payment = await prisma.payment.create({
      data: {
        orderId,
        method,
        amount
      }
    })

    // 2. update status order
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "PAID"
      }
    })

    res.json({
      message: "Payment berhasil",
      payment
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}