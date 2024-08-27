const Habbit = require("../models/Habbit");

const getHabbits = async (req, res) => {
  try {
    const habbits = await Habbit.find({ isDeleted: false });
    res.json(habbits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addHabbit = async (req, res) => {
  try {
    const habbit = new Habbit(req.body);
    await habbit.save();
    res.json({ message: "Habbit added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHabbit = async (req, res) => {
  try {
    const habbit = await Habbit.findById(req.params.id);
    habbit.name = req.body.name;
    habbit.category = req.body.category;
    habbit.target = req.body.target;
    await habbit.save();
    res.json({ message: "Habbit updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHabbit = async (req, res) => {
  try {
    const habbit = await Habbit.findById(req.params.id);
    habbit.isDeleted = true;
    await habbit.save();
    res.json({ message: "Habbit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleFinished = async (req, res) => {
  try {
    const habbit = await Habbit.findById(req.params.id);
    habbit.finishedToday = !habbit.finishedToday;
    habbit.finishedToday ? (habbit.completed += 1) : (habbit.completed -= 1);
    await habbit.save();
    res.json({ message: "Habbit completed incremented successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const makeAllHabbitsUnfinished = async (req, res) => {
  try {
    const habbits = await Habbit.find({ isDeleted: false });
    habbits.forEach(async habbit => {
      habbit.finishedToday = false;
      await habbit.save();
    });

    res.json({ message: "All habbits are now unfinished" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getHabbits,
  deleteHabbit,
  addHabbit,
  updateHabbit,
  handleFinished,
  makeAllHabbitsUnfinished,
};
