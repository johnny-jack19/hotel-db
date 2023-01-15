const knex = require("./knex");

//Only for making calendar days
function createDay(day) {
  return knex("rooms").insert(day);
}

//Billing
function makeCustomer(customer) {
  return knex("billing").insert(customer);
}

function deleteBilling(id) {
  return knex("billing").where("customerId", id).del();
}

//Booking
function makeBooking(booking) {
  return knex("booking").insert(booking);
}

function deleteBooking(id) {
  return knex("booking").where("id", id).del();
}

//Rooms
function deleteBookingFromRooms(room, booking) {
  return knex("rooms")
    .where(room, booking)
    .update({
      [room]: 0,
    });
}

function addBookingToRooms(room, booking, startDay, endDay) {
  return knex("rooms")
    .whereBetween("bookDay", [startDay, endDay])
    .update({
      [room]: booking,
    });
}

//Occupied
function updateOccupied(room, id) {
  return knex("occupied")
    .select("*")
    .update({ [room]: id });
}
//Gets
function getCustomer(field, value) {
  return knex("billing").where(field, value).select("*");
}

function getBooking(field, value) {
  return knex("booking").where(field, value).select("*");
}

function getCalendar() {
  return knex("rooms").select("*");
}

function getDay(day) {
  return knex("rooms").where("bookDay", day).select("*");
}

function getDayRange(startDay, endDay) {
  return knex("rooms").whereBetween("bookDay", [startDay, endDay]).select("*");
}

function getOccupied() {
  return knex("occupied").select("*");
}

function getBookingAndCustomer(id) {
  return knex("booking")
    .where("id", id)
    .join("billing", "booking.customerId", "=", "billing.customerId")
    .select("*");
}

function getLookUp(field, value) {
  return knex("booking")
    .where(field, value)
    .join("billing", "booking.customerId", "=", "billing.customerId")
    .select("*");
}

async function getGuestOnDay(day) {
  let myDay = await getDay(day);
  let ids = [
    myDay[0]["room1"],
    myDay[0]["room2"],
    myDay[0]["room3"],
    myDay[0]["room4"],
    myDay[0]["room5"],
    myDay[0]["room6"],
  ];
  return knex("booking").whereIn("id", ids).select("name");
}

module.exports = {
  createDay,
  makeCustomer,
  makeBooking,
  deleteBooking,
  deleteBilling,
  getCustomer,
  addBookingToRooms,
  deleteBookingFromRooms,
  getBooking,
  getCalendar,
  getDay,
  getDayRange,
  getOccupied,
  getBookingAndCustomer,
  updateOccupied,
  getLookUp,
  getGuestOnDay,
};
