const express = require('express');
const Event = require('../models/event');
const authenticate = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    
  const { name, date } = req.body;
  const event = new Event({ name, date, owner: req.user._id });
  try {
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticate, authorize, async (req, res) => {
  const { name, date } = req.body;
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { name, date }, { new: true });
    if (!event) {
      return res.sendStatus(404); // Event not found
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticate, authorize, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.sendStatus(404); // Event not found
    }
    res.sendStatus(204); // No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
