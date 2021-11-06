const router = require('express').Router();
const mysql = require('mysql')
const keys = require('../config/keys');


const connection = mysql.createConnection(keys.dbOptions)
    //Setting up sql connection
connection.connect(function(err) {
    /* in case of error */
    if (err) {
        console.log("err.code?", err.code);
        console.log("error.fatal?", error.fatal)
    }
});

router.get('/polling-unit-result', (req, res) => {
    connection.query('SELECT  lga_name, lga_id from lga', function(err, rows) {
        /* in case of error */
        if (err) {
            console.log(err)
            return;
        } else {
            res.render('polls', { rows });
        }
    })
});

router.get('/ward-get/:id', (req, res) => {
    const params = req.params.id
    connection.query(`SELECT  ward_name, ward_id from ward where lga_id=${params}`, function(err, rows) {
        /* in case of error */
        if (err) {
            console.log(err)
            return;
        } else {
            res.send(rows)
        }

    })
});
router.post('/polls-get/', (req, res) => {
    const params = req.body.ward
    const params2 = req.body.lga
    connection.query(`SELECT polling_unit_name, uniqueid from polling_unit where ward_id=${params} and lga_id=${params2}`, function(err, rows) {
        /* in case of error */
        if (err) {
            console.log(err)
            return;
        } else {
            res.send(rows)
        }
    })
});
router.get('/showresult/:id', (req, res) => {
    const params = req.params.id
    connection.query(`SELECT party_score, party_abbreviation, polling_unit_uniqueid from announced_pu_results where polling_unit_uniqueid=${params}`, function(err, rows) {
        /* in case of error */
        if (err) {
            console.log(err)
            return;
        } else {
            res.send(rows)
        }
    })
});

module.exports = router;