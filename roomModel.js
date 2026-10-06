// Model: menyimpan data kamar di memori dan fungsi pengolahannya
// Model TIDAK memakai req dan res sama sekali

// data kamar disimpan dalam array (in-memory), 3 data awal
let rooms = [
  { id: 1, nomorKamar: "101", tipe: "standar", hargaPerMalam: 350000, kapasitas: 2, tersedia: true },
  { id: 2, nomorKamar: "305", tipe: "deluxe", hargaPerMalam: 850000, kapasitas: 2, tersedia: true },
  { id: 3, nomorKamar: "401", tipe: "suite", hargaPerMalam: 1500000, kapasitas: 4, tersedia: false },
];

// id berikutnya dibuat otomatis oleh server
let nextId = 4;

// tipe kamar yang valid (sesuai enum topik 8)
const TIPE_VALID = ["standar", "deluxe", "suite"];

// ambil semua kamar, atau filter berdasarkan tipe bila ada
function getAll(tipe) {
  if (tipe) {
    return rooms.filter((r) => r.tipe === tipe);
  }
  return rooms;
}

// ambil satu kamar berdasarkan id
function getById(id) {
  return rooms.find((r) => r.id === id);
}

// tambah kamar baru, id dibuat otomatis
function create(data) {
  const baru = { id: nextId++, ...data };
  rooms.push(baru);
  return baru;
}

// ubah seluruh field kamar yang sudah ada
function update(id, data) {
  const room = getById(id);
  if (!room) return null;
  Object.assign(room, data);
  return room;
}

// hapus kamar berdasarkan id
function remove(id) {
  const index = rooms.findIndex((r) => r.id === id);
  if (index === -1) return false;
  rooms.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove, TIPE_VALID };
