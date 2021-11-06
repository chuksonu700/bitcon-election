const router = require('express').Router();
const { query } = require('express');
const mysql = require('mysql')
const keys = require('../config/keys');
const { networkinterface } = require('os');


const connection = mysql.createConnection(keys.dbOptions)
    //Setting up sql connection
connection.connect(function(err) {
    /* in case of error */
    if (err) {
        console.log("err.code?", err.code);
        console.log("error.fatal?", error.fatal)
    }
});

router.get('/enter-score', (req, res) => {
    connection.query('SELECT  lga_name, lga_id from lga', function(err, rows) {
        /* in case of error */
        if (err) {
            console.log(err)
            return;
        } else {
            res.render('store', { rows });
        }
    })
});

router.get('/get-party', (req, res) => {
    connection.query(`SELECT partyid FROM party`, function(err, rows) {
        /* in case of error */
        if (err) {
            console.log(err)
            return;
        } else {
            res.send(rows)
        }

    })
});
router.post('/save-result', (req, res) => {
    var datee = Date()
    var PU = req.body.polls
    var party = req.body.party
    var ip = req.ip
    var user = req.body.username
    var score = req.body.score

    var querySQL = 'INSERT INTO announced_pu_results(polling_unit_uniqueid,party_abbreviation,party_score,entered_by_user,date_entered,user_ip_address) VALUES (\"' + PU + '\", \"' + party + '\", \"' + score + '\", \"' + user + '\", \"' + datee + '\", \"' + ip + '\") ;'

    connection.query(querySQL, function(err, rows) {
        // /* in case of error */
        if (err) {
            console.log(err)
            return;
        } else {
            res.redirect("/done");
        }
    })

});

router.get('/done', (req, res) => {
    res.render('done');
});


module.exports = router;