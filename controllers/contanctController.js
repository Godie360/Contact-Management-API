const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc   Get all contacts
// @route  GET /api/contacts
// @access Private
const getAllContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user: req.user._id });
    res.status(200).json({ contacts });
});

// @desc   Get a single contact
// @route  GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid Contact ID format" });
        return;
    }

    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc   Create a new contact
// @route  POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
    console.log("The req body is:", req.body);
    console.log("The req.user is:", req.user);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user: req.user._id,
    });

    res.status(201).json({ contact });
});

// @desc   Update a contact
// @route  PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.status(200).json(updatedContact);
});

// @desc   Delete a contact
// @route  DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = {
    getContact,
    createContact,
    updateContact,
    deleteContact,
    getAllContact
};
