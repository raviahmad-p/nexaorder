module.exports = (req, res, next) => {
  const token = req.headers['authorization']

  // ❌ 401
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized"
    })
  }

  // ❌ 403
  if (token !== "admin") {
    return res.status(403).json({
      error: "Forbidden"
    })
  }

  next()
}