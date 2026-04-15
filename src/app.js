require('dotenv').config()
const express = require('express')

const app = express()

// middleware
app.use(express.json())

// import routes
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

// gunakan routes
app.use('/categories', categoryRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/payments', paymentRoutes)

// route default (opsional, biar tau server hidup)
app.get('/', (req, res) => {
  res.send('API NexaOrder berjalan 🚀')
})

// jalankan server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint tidak ditemukan"
  })
})