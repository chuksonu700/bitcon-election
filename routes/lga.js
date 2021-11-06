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

router.get('/lga', (req, res) => {
    connection.query('SELECT  lga_name, lga_id from lga', function(err, rows) {
        /* in case of error */
        if (err) {
            console.log(err)
            return;
        } else {
            res.render('lga', { rows });
        }

    })
});


router.get('/lga-result/:id', async(req, res) => {

    const lgaId = req.params.id
    var score = [];

    connection.query(`SELECT uniqueid from polling_unit where lga_id=${lgaId}`, function(err, rows) {
        /* in case of error */
        if (err) {
            console.log(err)
            return;
        } else {
            getScore(rows)
        }
    })

    async function getScore(data) {
        var holdId = [];
        var querySql = "";
        for (let i = 0; i < data.length; i++) {
            holdId.push(data[i].uniqueid)
        }
        if (holdId.length < 2) {
            querySql = `SELECT party_score, party_abbreviation, result_id, polling_unit_uniqueid from announced_pu_results where polling_unit_uniqueid=${holdId[0]}`
        } else {
            querySql = `SELECT party_score, party_abbreviation, result_id, polling_unit_uniqueid from announced_pu_results where polling_unit_uniqueid=${holdId[0]}`
            for (let i = 1; i < holdId.length; i++) {
                querySql += ` OR polling_unit_uniqueid=${holdId[i]}`;
            }
        }
        connection.query(`${querySql}`, function(err, rows) {
            if (err) {
                console.log(err);
                return
            } else {
                sendScore(rows)
            }
        })
    }

    function sendScore(results) {
        var electionResult = []
        connection.query(`SELECT partyid FROM party`, function(err, rows) {
            /* in case of error */
            if (err) {
                console.log(err)
                return;
            } else {
                console.log(rows)
                for (let i = 0; i < rows.length; i++) {
                    var adad = new Object()
                    adad.party = rows[i].partyid
                    adad.score = 0
                    for (let j = 0; j < results.length; j++) {
                        if (results[j].party_abbreviation == rows[i].partyid) {
                            adad.score += results[j].party_score
                        }
                    }
                    electionResult.push(adad);
                }
            }
            res.send(electionResult)
        })
    }
});

module.exports = router;