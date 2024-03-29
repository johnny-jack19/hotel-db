const express = require("express");
const cors = require("cors");
const db = require("./db/book");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Make calendar
app.post("/make", async (req, res) => {
  const results = await db.createDay(req.body);
  res.status(201).json({ id: results[0] });
});

//**********************Billing table*********************************
//Make customer
app.post("/billing", async (req, res) => {
  const results = await db.makeCustomer(req.body);
  res.status(201).json({ results });
});

app.delete("/billing/:id", async (req, res) => {
  await db.deleteBilling(req.params.id);
  res.status(200).json({ success: true });
});

//***********************Rooms table***********************************
//Set rooms to null (call after delete booking)
app.patch("/rooms/:room/:booking", async (req, res) => {
  await db.deleteBookingFromRooms(req.params.room, req.params.booking);
  res.status(201).json({ success: true });
});

//Set rooms to booking id (call after make booking)
app.patch("/rooms/:room/:booking/:startDay/:endDay", async (req, res) => {
  await db.addBookingToRooms(
    req.params.room,
    req.params.booking,
    req.params.startDay,
    req.params.endDay
  );
  res.status(201).json({ success: true });
});

//************************Booking table**********************************
//Make booking
app.post("/booking", async (req, res) => {
  const results = await db.makeBooking(req.body);
  res.status(201).json({ results });
});

//Delete booking
app.delete("/booking/:id", async (req, res) => {
  await db.deleteBooking(req.params.id);
  res.status(200).json({ success: true });
});

//Update booking (not used)
app.patch("/booking/:id", async (req, res) => {
  await db.processBooking(req.params.id);
  res.status(201).json({ success: true });
});

//************************Occupied Table**********************************
//Update
app.patch("/occupied/:room/:id", async (req, res) => {
  await db.updateOccupied(req.params.room, req.params.id);
  res.status(201).json({ success: true });
});

//******************************Gets**************************************
//Get customer
app.get("/billing/:field/:value", async (req, res) => {
  const results = await db.getCustomer(req.params.field, req.params.value);
  res.status(200).json({ results });
});

//Get booking
app.get("/booking/:field/:value", async (req, res) => {
  const results = await db.getBooking(req.params.field, req.params.value);
  res.status(200).json({ results });
});

//Get calendar
app.get("/rooms", async (req, res) => {
  const results = await db.getCalendar();
  res.status(200).json(results);
});

//Get single day
app.get("/rooms/:day", async (req, res) => {
  const results = await db.getDay(req.params.day);
  res.status(200).json({ results });
});

//Get guest on a certain day
app.get("/daysname/:day", async (req, res) => {
  const results = await db.getGuestOnDay(req.params.day);
  res.status(200).json({ results });
});

//Get day range
app.get("/rooms/:startDay/:endDay", async (req, res) => {
  const results = await db.getDayRange(req.params.startDay, req.params.endDay);
  res.status(200).json({ results });
});

//Get occupied table
app.get("/occupied", async (req, res) => {
  const results = await db.getOccupied();
  res.status(200).json(results);
});

//Get Booking and Customer info
app.get("/customer-info/:id", async (req, res) => {
  const results = await db.getBookingAndCustomer(req.params.id);
  res.status(200).json({ results });
});

//Get Booking and Customer info by field
app.get("/customer-info/:field/:value", async (req, res) => {
  const results = await db.getLookUp(req.params.field, req.params.value);
  res.status(200).json({ results });
});

app.listen(PORT, () => {
  console.log("Server is running on Port " + PORT);
});
