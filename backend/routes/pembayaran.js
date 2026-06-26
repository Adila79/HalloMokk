  const express = require("express");
const router = express.Router();
const db = require("../db");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ================== GET SEMUA PEMBAYARAN USER ==================
router.get("/", verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;

    const [result] = await db.query(`
      SELECT
        pembayaran.id,
        pembayaran.metode_pembayaran,
        pembayaran.jumlah_bayar,
        pembayaran.status_pembayaran,
        pembayaran.tanggal_pembayaran,
        booking.tanggal,
        booking.jam,
        lapangan.nama_lapangan
      FROM pembayaran
      JOIN booking ON pembayaran.booking_id = booking.id
      JOIN lapangan ON booking.lapangan_id = lapangan.id
      WHERE booking.user_id = ?
      ORDER BY pembayaran.tanggal_pembayaran DESC
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

// ================== POST PEMBAYARAN ==================
router.post("/", verifyToken, async (req, res) => {
  try {

    const {
      booking_id,
      metode_pembayaran,
      jumlah_bayar,
      bukti_pembayaran
    } = req.body;

    if (!booking_id || !metode_pembayaran || !jumlah_bayar) {
      return res.status(400).json({
        status: "error",
        message: "Semua data wajib diisi"
      });
    }

    const [booking] = await db.query(
      "SELECT * FROM booking WHERE id = ?",
      [booking_id]
    );

    if (booking.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Booking tidak ditemukan"
      });
    }

    await db.query(
      `INSERT INTO pembayaran
      (
        booking_id,
        metode_pembayaran,
        jumlah_bayar,
        bukti_pembayaran,
        status_pembayaran,
        tanggal_pembayaran
      )
      VALUES (?, ?, ?, ?, ?, NOW())`,
      [
        booking_id,
        metode_pembayaran,
        jumlah_bayar,
        bukti_pembayaran || null,
        "pending"
      ]
    );

    res.status(201).json({
      status: "success",
      message: "Pembayaran berhasil dibuat"
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
});

// ================== UPDATE STATUS ==================
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status_pembayaran } = req.body;

    // Ambil booking_id dari pembayaran
    const [pembayaran] = await db.query(
      "SELECT booking_id FROM pembayaran WHERE id = ?",
      [req.params.id]
    );

    if (pembayaran.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Data pembayaran tidak ditemukan"
      });
    }

    const booking_id = pembayaran[0].booking_id;

    // Tentukan status booking berdasarkan status pembayaran
    let booking_status = "pending";
    if (status_pembayaran === "lunas") {
      booking_status = "approved";
    } else if (status_pembayaran === "gagal") {
      booking_status = "cancelled";
    }

    // Mulai transaksi
    await db.query("START TRANSACTION");

    // Update status pembayaran
    await db.query(
      "UPDATE pembayaran SET status_pembayaran = ? WHERE id = ?",
      [status_pembayaran, req.params.id]
    );

    // Update status booking
    await db.query(
      "UPDATE booking SET status = ? WHERE id = ?",
      [booking_status, booking_id]
    );

    await db.query("COMMIT");

    res.status(200).json({
      status: "success",
      message: "Status pembayaran dan booking berhasil diupdate"
    });

  } catch (err) {
    await db.query("ROLLBACK");
    console.error(err);

    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
});

module.exports = router;