import Event from "../models/Event.js";
import { generatePassword } from "../utils/passwordGenerator.js";

export const createEvent = async (req, res) => {
  try {
    const { name, date, location, description } = req.body;

    const password = generatePassword();

    const event = await Event.create({
      name,
      date,
      location,
      description,
      password,
      user: req.user,
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
