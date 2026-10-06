// Controller: menangani request, validasi, dan response
const roomModel = require("../models/roomModel");

// validasi field wajib untuk POST dan PUT
function validasi(body) {
  const { nomorKamar, tipe, hargaPerMalam, kapasitas } = body;

  if (!nomorKamar || !tipe || hargaPerMalam === undefined || !kapasitas) {
    return "Field nomorKamar, tipe, hargaPerMalam, dan kapasitas wajib diisi";
  }
  if (!roomModel.TIPE_VALID.includes(tipe)) {
    return "Field tipe harus berupa standar, deluxe, atau suite";
  }
  return null;
}

// GET /rooms atau GET /rooms?tipe=deluxe
exports.getAllRooms = (req, res) => {
  const hasil = roomModel.getAll(req.query.tipe);
  res.status(200).json(hasil);
};

// GET /rooms/:id
exports.getRoomById = (req, res) => {
  const id = parseInt(req.params.id);
  const room = roomModel.getById(id);

  if (!room) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }
  res.status(200).json(room);
};

// POST /rooms (dilindungi cekApiKey)
exports.createRoom = (req, res) => {
  const error = validasi(req.body);
  if (error) {
    return res.status(400).json({ status: "error", message: error, data: null });
  }

  const { nomorKamar, tipe, hargaPerMalam, kapasitas, tersedia } = req.body;
  const baru = roomModel.create({
    nomorKamar,
    tipe,
    hargaPerMalam,
    kapasitas,
    tersedia: tersedia !== undefined ? tersedia : true,
  });

  res.status(201).json({
    status: "success",
    message: "Data berhasil ditambahkan",
    data: baru,
  });
};

// PUT /rooms/:id (dilindungi cekApiKey)
exports.updateRoom = (req, res) => {
  const id = parseInt(req.params.id);

  if (!roomModel.getById(id)) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const error = validasi(req.body);
  if (error) {
    return res.status(400).json({ status: "error", message: error, data: null });
  }

  const { nomorKamar, tipe, hargaPerMalam, kapasitas, tersedia } = req.body;
  const updated = roomModel.update(id, {
    nomorKamar,
    tipe,
    hargaPerMalam,
    kapasitas,
    tersedia: tersedia !== undefined ? tersedia : true,
  });

  res.status(200).json({
    status: "success",
    message: "Data berhasil diubah",
    data: updated,
  });
};

// DELETE /rooms/:id (dilindungi cekApiKey)
exports.deleteRoom = (req, res) => {
  const id = parseInt(req.params.id);

  if (!roomModel.remove(id)) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  res.status(204).send(); // 204 No Content: respons tanpa isi
};
