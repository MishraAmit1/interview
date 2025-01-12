const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Create new time slot
router.post("/create-slot", (req, res) => {
  const { date, start_time, end_time } = req.body;
  const query =
    "INSERT INTO time_slots (date, start_time, end_time) VALUES (?, ?, ?)";
  db.query(query, [date, start_time, end_time], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    res.status(201).json({ message: "Slot created successfully" });
  });
});

// Get available time slots for a specific date
router.get("/available-slots", (req, res) => {
  const { date } = req.query;
  const query = "SELECT * FROM time_slots WHERE date = ? AND is_booked = false";
  db.query(query, [date], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    res.json(result);
  });
});

// Update time slot (book it)
router.put("/book-slot/:id", (req, res) => {
  const { id } = req.params;
  const query = "UPDATE time_slots SET is_booked = true WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    res.status(200).send("Slot booked successfully");
  });
});

// Delete time slot
router.delete("/delete-slot/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM time_slots WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    res.status(200).send("Slot deleted successfully");
  });
});

module.exports = router;
