const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

//get all contacts
const getAllContacts = async (req, res) => {
    const result = await getDb().db('cse341').collection('contacts').find();

    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

//get one contact
const getOneContact = async (req, res) => {
    const contactId = req.params.id;
    const result = await getDb()
        .db('cse341')
        .collection('contacts')
        .find({ _id: new ObjectId(contactId) });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

//create new contact
const createContact = async (req, res) => {
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await getDb().db('cse341').collection('contacts').insertOne(newContact);
    if (result.acknowledged) {
        res.status(201).json(result._id);
    } else {
        res.status(500).json(result.error || 'Error creating new contact');
    }
};

// update one contact
const updateContact = async (req, res) => {
    const contactId = req.params.id;
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await getDb()
        .db('cse341')
        .collection('contacts')
        .replaceOne({ _id: new ObjectId(contactId) }, updatedContact);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Error updating contact');
    }
};

//delete one contact
const deleteContact = async (req, res) => {
    const contactId = req.params.id;
    const result = await getDb()
        .db('cse341')
        .collection('contacts')
        .deleteOne({ _id: new ObjectId(contactId) });
    if (result.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'Error deleting contact');
    }
};

module.exports = { getAllContacts, getOneContact, createContact, updateContact, deleteContact };
