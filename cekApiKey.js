// Middleware cekApiKey: melindungi route POST, PUT, DELETE
// Memeriksa header x-api-key dibandingkan dengan API_KEY pada .env
function cekApiKey(req, res, next) {
  const key = req.headers["x-api-key"];

  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({
      status: "error",
      message: "API key tidak valid atau tidak dikirim",
      data: null,
    });
  }

  next(); // API key valid, lanjut ke Controller
}

module.exports = cekApiKey;
