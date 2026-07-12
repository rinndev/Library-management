const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const bukuRoutes = require("./routes/buku");
const pinjamRoutes = require("./routes/peminjaman");

app.use("/api/buku", bukuRoutes);
app.use("/api/peminjaman", pinjamRoutes);

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});