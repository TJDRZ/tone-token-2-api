const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    getPedalboards,
    createPedalboard,
    nameChange,
    updateIndex,
    deletePedalboard,
} = require("../controllers/pedalboardController");

router.get("/:user", protect, getPedalboards);

router.post("/", protect, createPedalboard);

router.put("/nameChange", protect, nameChange);

router.put("/updateIndex", protect, updateIndex);

router.delete("/", protect, deletePedalboard);

module.exports = router;
