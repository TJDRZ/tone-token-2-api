const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    getControls,
    createControl,
    nameChange,
    updateValue,
    updateIndex,
    deleteControl,
} = require("../controllers/controlController");

router.get("/:id/:user", protect, getControls);

router.post("/", protect, createControl);

router.put("/nameChange", protect, nameChange);

router.put("/updateValue", protect, updateValue);

router.put("/updateIndex", protect, updateIndex);

router.delete("/", protect, deleteControl);

module.exports = router;