const { client } = require("../config/db");

exports.getPedalboards = async (req, res) => {
  try {
    const user = req.params.user;
    const pedalboards = await client.query(
      `SELECT * FROM pedalboards WHERE player = '${user}';`
    );
    res.status(200).json(pedalboards.rows);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Pedalboard not found", error: err.message });
  }
};

exports.createPedalboard = async (req, res) => {
  try {
    const { _id, name, index } = req.body.item;
    const { user } = req.body;
    await client.query(
      `INSERT INTO pedalboards (_id, name, index, player) VALUES ('${_id}', '${name}', '${index}', '${user._id}');`
    );
    res.status(201).json({ message: "Pedalboard added successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to add pedalboard", error: err.message });
  }
};

exports.nameChange = async (req, res) => {
  try {
    const { _id, name } = req.body.item;
    const { user } = req.body;
    await client.query(
      `UPDATE pedalboards SET name = '${name}' WHERE _id = '${_id}' AND player = '${user._id}';`
    );
    res.status(200).json({
      message: "Pedalboard's name changed successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to change pedalboard's name",
      error: err.message,
    });
  }
};

exports.updateIndex = async (req, res) => {
  try {
    const { _id, index } = req.body.item;
    const { user } = req.body;
    await client.query(
      `UPDATE pedalboards SET index = '${index}' WHERE _id = '${_id}' AND player = '${user._id}';`
    );
    res.status(200).json({
      message: "Pedalboard's index updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to update pedalboard's index",
      error: err.message,
    });
  }
};

exports.deletePedalboard = async (req, res) => {
  try {
    const { _id } = req.body.item;
    const { user } = req.body;
    await client.query(
      `DELETE FROM pedalboards WHERE _id = '${_id}' AND player = '${user._id}';`
    );
    res.status(200).json({ message: "Pedalboard deleted successfully" });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Pedalboard not found", error: err.message });
  }
};
