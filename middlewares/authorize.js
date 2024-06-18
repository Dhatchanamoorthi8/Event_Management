const Event = require('../models/event');

const authorize = async (req, res, next) => {
    const user = req.user;
    const eventId = req.params.id;


    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.sendStatus(404); // Event not found
        }
        if (user.role === 'admin' || user._id.equals(event.owner)) {
            next();
        } else {
            res.sendStatus(403); // Forbidden
        }
    } catch (error) {
        res.sendStatus(500); // Internal Server Error
    }
};

module.exports = authorize;
