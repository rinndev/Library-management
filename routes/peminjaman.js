const express = require("express");
const router = express.Router();
const db = require("../db");

// Tampilkan semua peminjaman
router.get("/", (req, res) => {
  const sql = `
    SELECT peminjaman.*, buku.judul
    FROM peminjaman
    JOIN buku ON peminjaman.buku_id = buku.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Tambah peminjaman
router.post("/", (req, res) => {
  const { nama, buku_id, status } = req.body;

  db.query(
    "INSERT INTO peminjaman (nama,buku_id,status) VALUES (?,?,?)",
    [nama, buku_id, status],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Data berhasil ditambahkan" });
    }
  );
});

// Edit
router.put("/:id", (req, res) => {
  const { nama, buku_id, status } = req.body;

  db.query(
    "UPDATE peminjaman SET nama=?, buku_id=?, status=? WHERE id=?",
    [nama, buku_id, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Data berhasil diubah" });
    }
  );
});

// Hapus
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM peminjaman WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Data berhasil dihapus" });
    }
  );
});

module