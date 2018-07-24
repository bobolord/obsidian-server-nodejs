const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

router.post('/login', (req, res) => {
  const email = req.body.email;
  const hash = 'password'
  bcrypt.compare(myPlaintextPassword, hash, function (err, response) {
    if (err) {
      console.log(err);
      return err;
    }
    if (response === true) {
      res.status(200).json({
        message: 'Authentication was successful'
      });
    } else {
      res.status(403).json({
        message: 'Invalid email or password'
      });
    }
  });
})

router.post('/registration', (req, res) => {
  const email = req.body.email;
  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {

  });

})


module.exports = router;
