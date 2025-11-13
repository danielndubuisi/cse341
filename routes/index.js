const express = require('express');
const router = express.Router();
const {
    getAllContacts,
    getOneContact,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contacts');

//index route
router.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

// // contact routes
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getOneContact);
router.post('/contacts', createContact);
router.put('/contacts/:id', updateContact);
router.delete('/contacts/:id', deleteContact);

module.exports = router;
