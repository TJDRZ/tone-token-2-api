const { client } = require("../config/db");

exports.getControls = async (req, res) => {
  try {
    const parentID = req.params.id;
    const user = req.params.user;
    const controls = await client.query(
      `SELECT * FROM controls WHERE pedal = '${parentID}' AND player = '${user}';`
    );
    res.status(200).json(controls.rows);
  } catch (err) {
    res.status(404).json({ message: "Control not found", error: err.message });
  }
};

exports.createControl = async (req, res) => {
  try {
    const parentID = req.body.parent._id;
    const { _id, name, value, index, feType } = req.body.item;
    const { user } = req.body;
    await client.query(
      `INSERT INTO controls (_id, name, value, index, pedal, type, player) VALUES ('${_id}', '${name}', '${value}', '${index}', '${parentID}', '${feType}', '${user._id}');`
    );
    res.status(201).json({ message: "Control added successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to add control", error: err.message });
  }
};

exports.nameChange = async (req, res) => {
  try {
    const { _id, name } = req.body.item;
    const { user } = req.body;
    await client.query(
      `UPDATE controls SET name = '${name}' WHERE _id = '${_id}' AND player = '${user._id}';`
    );
    res.status(200).json({
      message: "Control's name changed successfully",
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to change control's name", error: err.message });
  }
};

exports.updateValue = async (req, res) => {
  try {
    const { _id, value } = req.body.item;
    const { user } = req.body;
    await client.query(
      `UPDATE controls SET value = '${value}' WHERE _id = '${_id}' AND player = '${user._id}';`
    );
    res.status(200).json({
      message: "Control's value changed successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to change control's value",
      error: err.message,
    });
  }
};

exports.updateIndex = async (req, res) => {
  try {
    const { _id, index } = req.body.item;
    const { user } = req.body;
    await client.query(
      `UPDATE controls SET index = '${index}' WHERE _id = '${_id}' AND player = '${user._id}';`
    );
    res.status(200).json({
      message: "Control's index updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to update control's index",
      error: err.message,
    });
  }
};

exports.deleteControl = async (req, res) => {
  try {
    const { _id } = req.body.item;
    const { user } = req.body;
    await client.query(
      `DELETE FROM controls WHERE _id = '${_id}' AND player = '${user._id}';`
    );
    res.status(200).json({ message: "Control deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: "Control not found", error: err.message });
  }
};
