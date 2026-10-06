// Middleware logger: mencatat setiap permintaan yang masuk ke server
function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next(); // lanjut ke middleware/route berikutnya
}

module.exports = logger;
