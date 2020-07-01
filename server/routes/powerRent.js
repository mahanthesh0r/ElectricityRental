var express = require('express');
var router = express.Router();
let {PythonShell} = require('python-shell');

/* GET users listing. */
router.get('/', function(req, res, next) {
    PythonShell.run('./relay_script.py', null, function(err){
        if(err) throw err;
        console.log('finished')
      });
  res.send('Your Power Rental has started...');
});

module.exports = router;
