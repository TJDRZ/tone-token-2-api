const { client } = require("../config/db");

exports.getPedals = async (req, res) => {
  try {
    const parentID = req.params.id;
    const user = req.params.user;
    const pedals = await client.query(
      `SELECT * FROM pedals WHERE pedalboard = '${parentID}' AND player = '${user}';`
    );
    res.status(200).json(pedals.rows);
  } catch (err) {
    res.status(404).json({ message: "Pedal not found", error: err.message });
  }
};

exports.createPedal = async (req, res) => {
  try {
    const parentID = req.body.parent._id;
    const { _id, name, index } = req.body.item;
    const { user } = req.body;
    await client.query(
      `INSERT INTO pedals (_id, name, index, pedalboard, player) VALUES ('${_id}', '${name}', '${index}', '${parentID}', '${user._id}');`
    );
    res.status(201).json({ message: "Pedal added successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to add pedal", error: err.message });
  }
};

exports.nameChange = async (req, res) => {
  try {
    const { _id, name } = req.body.item;
    const { user } = req.body;
    await client.query(
      `UPDATE pedals SET name = '${name}' WHERE _id = '${_id}' AND player = '${user._id}';`
    );
    res.status(200).json({
      message: "Pedal's name changed successfully",
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to change pedal's name", error: err.message });
  }
};

exports.updateIndex = async (req, res) => {
  try {
    const { _id, index } = req.body.item;
    const { user } = req.body;
    await client.query(
      `UPDATE pedals SET index = '${index}' WHERE _id = '${_id}' AND player = '${user._id}';`
    );
    res.status(200).json({
      message: "Pedal's index updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to update pedal's index",
      error: err.message,
    });
  }
};

exports.deletePedal = async (req, res) => {
  try {
    const { _id } = req.body.item;
    const { user } = req.body;
    await client.query(
      `DELETE FROM pedals WHERE _id = '${_id}' AND player = '${user._id}';`
    );
    res.status(200).json({ message: "Pedal deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: "Pedal not found", error: err.message });
  }
};
