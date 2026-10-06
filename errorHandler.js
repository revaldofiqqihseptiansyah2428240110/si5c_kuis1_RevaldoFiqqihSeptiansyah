// Middleware penanganan error terpusat

// 404 untuk route yang tidak terdaftar
function notFound(req, res, next) {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null,
  });
}

// menangkap semua error, termasuk JSON rusak dari express.json()
function errorHandler(err, req, res, next) {
  // body JSON yang rusak (koma berlebih, tanda kutip tidak lengkap, dll.)
  if (err.type === "entity.parse.failed" || err instanceof SyntaxError) {
    return res.status(400).json({
      status: "error",
      message: "Format JSON tidak valid",
      data: null,
    });
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
    data: null,
  });
}

module.exports = { notFound, errorHandler };
