require('dotenv').config()
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

const paymentRoutes = require('./routes/paymentRoutes')

app.use('/payments', paymentRoutes)


app.post('/categories', async (req, res) => {
  try {
    const { name } = req.body

    const category = await prisma.category.create({
      data: { name }
    })

    res.json(category)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/', (req, res) => {
  res.send('Backend Nexa Order jalan 🚀')
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})