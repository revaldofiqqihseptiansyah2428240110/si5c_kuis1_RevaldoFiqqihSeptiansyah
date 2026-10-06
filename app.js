// Kuis 1 - Refactor Tugas 1 ke arsitektur backend terstruktur
// Topik 8: Hotel - Kamar (/rooms)
// Nama : Revaldo Fiqqih Septiansyah
// NPM  : 2428240110

require("dotenv").config(); // membaca pengaturan dari .env
const express = require("express");
const cors = require("cors");
const roomRoutes = require("./routes/roomRoutes");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // mengizinkan akses lintas origin
app.use(logger); // mencatat setiap request
app.use(express.json()); // membaca body berformat JSON

// route utama resource kamar
app.use("/rooms", roomRoutes);

// middleware penanganan error terpusat (harus di paling akhir)
app.use(notFound); // 404 untuk route yang tidak ada
app.use(errorHandler); // JSON rusak & error lain

// jalankan server di local; diekspor untuk keperluan serverless
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Server berjalan di http://localhost:${PORT}`)
  );
}

module.exports = app;
