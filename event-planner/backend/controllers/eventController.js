import Event from "../models/Event.js";
//import { generatePassword } from "../utils/passwordGenerator.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

//create EVENT with a unique event password
export const createEvent = async (req, res) => {
  try {
    const { name, date, location, description } = req.body;
    const eventPassword = crypto.randomBytes(6).toString("hex");
    //const password = generatePassword();

    const event = await Event.create({
      name,
      date,
      location,
      description,
      password,
      user: req.user,
      eventPassword,
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add guest
export const addGuest = async (req, res) => {
  try{
    const {eventId} = req.params;
    const {name, email} = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({message: "Event not found!"});

    event.guests.push({name, email});
    await event.save();
    res.status(200).json(event.guests);
  }
  catch(err){
    res.status(500).json({message: "Error adding guest"});
  }
};

//Send Invitations
export const sendInvitations = async (req, res) =>{
  try{
    const {eventId} = req.params;
    const event = await Event.findById(eventId);
    if(!event) return res.status(404).json({message: "Event not Found!"});

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const guest of event.guests){
      const inviteLink = `http://localhost:5173/invite/${event._id}?access=${event.eventPassword}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: guest.email,
        subject: `Invitation to ${event.name}`,
        text: `Hi ${guest.name},\nYou’re invited to ${event.name}!\n\nUse this link to access your invitation:\n${inviteLink}\n\nEvent Password: ${event.eventPassword}`,
      };
      await transporter.sendMail(mailOptions);
      guest.invited = true;

    }
    await event.save();
    res.status(200).json({message: "Invitation sent!"});

  }catch (err){
    console.error(err);
    res.status(500).json({message: "Error sending Invitation"});
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
