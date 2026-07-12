const express = require("express");
const router = express.Router();
const db = require("../db");

// Ambil semua data buku
router.get("/", (req, res) => {
  db.query("SELECT * FROM buku", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Tambah buku
router.post("/", (req, res) => {
  const { judul, penulis, stok } = req.body;

  db.query(
    "INSERT INTO buku (judul, penulis, stok) VALUES (?, ?, ?)",
    [judul, penulis, stok],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Buku berhasil ditambahkan" });
    }
  );
});

// Edit buku
router.put("/:id", (req, res) => {
  const { judul, penulis, stok } = req.body;

  db.query(
    "UPDATE buku SET judul=?, penulis=?, stok=? WHERE id=?",
    [judul, penulis, stok, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Buku berhasil diubah" });
    }
  );
});

// Hapus buku
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM buku WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Buku berhasil dihapus" });
    }
  );
});

module.exports = router;