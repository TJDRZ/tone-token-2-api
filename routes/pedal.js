const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    getPedals,
    createPedal,
    nameChange,
    updateIndex,
    deletePedal,
} = require("../controllers/pedalController");

router.get("/:id/:user", protect, getPedals);

router.post("/", protect, createPedal);

router.put("/nameChange", protect, nameChange);

router.put("/updateIndex", protect, updateIndex);

router.delete("/", protect, deletePedal);

module.exports = router;