const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const SMSController = require('../controllers/SMS')

//Seeding database from data.json
router.get('/seedDataBase', checkAuth, SMSController.SMSRecords_bulk_insert)

//Get all records
router.get('/', checkAuth, SMSController.SMSRecords_get_all);

//Save record 
router.post('/', checkAuth, SMSController.SMSRecord_post);

//Get record by id
router.get('/:recordId', checkAuth, SMSController.SMSRecord_get_byId);

//Update record 
router.patch('/:recordId', checkAuth, SMSController.SMSRecord_update);

//Delete record 
router.delete('/:recordId', checkAuth, SMSController.SMSRecord_delete);


module.exports = router;