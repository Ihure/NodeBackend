const express = require('express');
const router = express.Router();

import routes from './v1';

//register routes
router.use('/', routes);

module.exports = router;
