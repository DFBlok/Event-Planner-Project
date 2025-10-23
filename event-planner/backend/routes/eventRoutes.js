import express from "express";
import { createEvent, getEvents, } from "../controllers/eventController.js";
import {  sendInvitations } from "../controllers/eventController.js";
import { addGuest, getGuests } from "../controllers/guestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", protect, getEvents);
//router.get("/:id", getEventById)
//route guest, invitations
router.post("/:eventId/guests", addGuest);
router.get("/:eventId/guests", getGuests);
router.post("/:eventId/send-invites",  sendInvitations);

export default router;
