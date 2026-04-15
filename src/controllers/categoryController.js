const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body

    // ❌ VALIDASI
    if (!name) {
      return res.status(400).json({
        error: "Nama category wajib diisi"
      })
    }

    const category = await prisma.category.create({
      data: { name }
    })

    res.json(category)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
 //delete category by id
exports.deleteCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const category = await prisma.category.findUnique({
      where: { id }
    })

    // ❌ kalau tidak ada
    if (!category) {
      return res.status(404).json({
        error: "Category tidak ditemukan"
      })
    }

    await prisma.category.delete({
      where: { id }
    })

    res.json({
      message: "Category berhasil dihapus"
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}