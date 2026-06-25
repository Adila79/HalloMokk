const express = require("express");
const router = express.Router();
const db = require("../db");
const { verifyToken } = require("../middleware/authMiddleware");


// ================== GET SEMUA BOOKING ==================
router.get("/", verifyToken, async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        booking.id,
        booking.tanggal,
        booking.jam,
        booking.status AS booking_status,
        users.nama AS nama_user,
        lapangan.nama_lapangan,
        lapangan.harga,
        pembayaran.status_pembayaran,
        pembayaran.id AS pembayaran_id
      FROM booking
      JOIN users ON booking.user_id = users.id
      JOIN lapangan ON booking.lapangan_id = lapangan.id
      LEFT JOIN pembayaran ON booking.id = pembayaran.booking_id
      ORDER BY booking.tanggal DESC
    `);

    res.status(200).json({
      status: "success",
      total: result.length,
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
});


// ================== GET BOOKING USER (LOGIN) ==================
router.get("/me", verifyToken, async (req, res) => {
  const user_id = req.user.id;

  try {
    const [result] = await db.query(`
      SELECT 
        booking.id,
        booking.tanggal,
        booking.jam,
        booking.status AS booking_status,
        lapangan.nama_lapangan,
        lapangan.harga,
        pembayaran.status_pembayaran,
        pembayaran.id AS pembayaran_id
      FROM booking
      JOIN lapangan ON booking.lapangan_id = lapangan.id
      LEFT JOIN pembayaran ON booking.id = pembayaran.booking_id
      WHERE booking.user_id = ?
      ORDER BY booking.tanggal DESC
    `, [user_id]);

    res.status(200).json({
      status: "success",
      total: result.length,
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
});


// ================== POST BOOKING ==================
router.post("/", verifyToken, async (req, res) => {
  try {

    console.log("TOKEN USER =", req.user);
    console.log("BODY =", req.body);

    const user_id = req.user.id;
    const { lapangan_id, tanggal, jam } = req.body;

    console.log("USER ID =", user_id);
    console.log("LAPANGAN ID =", lapangan_id);

    // VALIDASI INPUT
    if (!lapangan_id || !tanggal || !jam) {
      return res.status(400).json({
        status: "error",
        message: "Semua data wajib diisi"
      });
    }

    const [lapangan] = await db.query(
      "SELECT id FROM lapangan WHERE id = ?",
      [lapangan_id]
    );

    if (lapangan.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Lapangan tidak ditemukan"
      });
    }

    const [cek] = await db.query(
      "SELECT id FROM booking WHERE lapangan_id = ? AND tanggal = ? AND jam = ?",
      [lapangan_id, tanggal, jam]
    );

    if (cek.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Jadwal sudah dibooking"
      });
    }

    const [result] = await db.query(
      "INSERT INTO booking (user_id, lapangan_id, tanggal, jam) VALUES (?, ?, ?, ?)",
      [user_id, lapangan_id, tanggal, jam]
    );

    res.status(201).json({
      status: "success",
      message: "Booking berhasil disimpan",
      bookingId: result.insertId
    });

  } catch (err) {
    console.error("ERROR BOOKING:", err);

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        status: "error",
        message: "Relasi data tidak valid (foreign key error)"
      });
    }

    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
});

// ================== GET DETAIL BOOKING ==================
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        booking.id,
        booking.tanggal,
        booking.jam,
        booking.status AS booking_status,
        lapangan.nama_lapangan,
        lapangan.harga,
        pembayaran.status_pembayaran,
        pembayaran.id AS pembayaran_id
      FROM booking
      JOIN lapangan ON booking.lapangan_id = lapangan.id
      LEFT JOIN pembayaran ON booking.id = pembayaran.booking_id
      WHERE booking.id = ?
    `, [req.params.id]);

    if (result.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Booking tidak ditemukan"
      });
    }

    res.status(200).json({
      status: "success",
      data: result[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
});

module.exports = router;