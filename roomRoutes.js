// Route: memetakan alamat endpoint ke fungsi Controller
const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const cekApiKey = require("../middlewares/cekApiKey");

// GET tidak dilindungi API key
router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getRoomById);

// POST, PUT, DELETE dilindungi middleware cekApiKey
router.post("/", cekApiKey, roomController.createRoom);
router.put("/:id", cekApiKey, roomController.updateRoom);
router.delete("/:id", cekApiKey, roomController.deleteRoom);

module.exports = router;
