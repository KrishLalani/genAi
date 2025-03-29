// routes/queryRoutes.js
const express = require('express');
const { queryHandler, explainHandler, validateHandler, getToken } = require('../controllers/queryController');
// const { getToken } = require('../controllers/queryController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/query', authenticateToken, queryHandler);
router.post('/explain', authenticateToken, explainHandler);
router.post('/validate', authenticateToken, validateHandler);
router.get('/Token', getToken);
module.exports = router;
