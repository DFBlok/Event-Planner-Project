import Event from "../models/Event.js";

export const addGuest = async (req, res) => {
  try{
    const {eventId} = req.params;
    const {name, email} = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({message: "Event not found!"});

    event.guests.push({name, email});
    await event.save();
    //res.status(200).json(event.guests);
    res.status(201).json({message: "Guest added successfully", event});
  }
  catch(error){
    res.status(500).json({message: "Error adding guest", error});
  }
};

export const getGuests = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event.guests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching guests", error });
  }
};