// 18-NoSQL/01-Activities/23-Ins_Subdoc-Population/routes/index.js

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;