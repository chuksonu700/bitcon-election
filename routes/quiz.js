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

// our Quiz route

router.get('/quiz', (req, res) => {

    connection.query('SELECT  question, answersA, answersB, answersC, answersD, questionId from questions', function(err, rows) {
        /* in case of error */
        if (err) {
            console.log(err)
            return;
        } else {

            res.render('main/quiz', { rows });
        }

    })
});

router.post('/showresult', (req, res) => {
    var correctAnswerArray = [];
    var score = 0;

    var selectedAnswer = req.body;
    var selectedAnswerArray = [];
    console.log(selectedAnswer);
    for (x in selectedAnswer) {
        selectedAnswerArray.push(selectedAnswer[x])
    }
    console.log("selectedAnswerArray: ", selectedAnswerArray)
    connection.query('SELECT  questionId, correctAnswer from questions', function(err, rows) {
        /* in case of error */
        if (err) {
            console.log("error occored here o please fix");
            console.log(err)
            return;
        } else {
            // console.log(' Query executed succesfully: ', rows);
            rows.forEach((item) => {
                correctAnswerArray.push(`${item.questionId}${item.correctAnswer}`)
            });
            console.log('correctAnswerArray: ', correctAnswerArray)
        }
        selectedAnswerArray.forEach((items) => {
            var scoreTemp = correctAnswerArray.indexOf(items)
            if (scoreTemp > -1) {
                score++
            }
        });
        res.send(`You scored ${score} out of 14 ${Math.ceil(score / 14 * 100)}%`);
    });


});

module.exports = router;