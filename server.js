const express = require('express');
const cors = require("cors");
const path = require('path');
// const axios = require('axios').default;


const app = express();
const { bots, playerRecord } = require('./data');
const { shuffleArray } = require('./utils');

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
    accessToken: '25611a7d3f11452ba0b15c5d7266978d',
    captureUncaught: true,
    captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "/public/index.html"));
// });

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "/public/index.css"));
// });

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "/public/index.js"));
// });


app.get('http://localhost:3000/api/robots', (req, res) => {
    try {
        rollbar.info("Success in getting bots");
        res.status(200).send(botsArr)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
});

app.get('http://localhost:3000/api/robots/five', (req, res) => {
    try {
        rollbar.info("5 bots displayed succcessfully");
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({ choices, compDuo })
    } catch (error) {
        rollbar.error("Did not display 5 bots");
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
});

app.post('http://localhost:3000/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let { compDuo, playerDuo } = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage

        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage

        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            rollbar.info("loser-ville");
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            rollbar.info("We have a winner!");
            res.status(200).send('You won!')
        }
    } catch (error) {
        rollbar.error("Could not determine winner");
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('http://localhost:3000/api/player', (req, res) => {
    try {
        rollerbar.info("Player stats successful");
        res.status(200).send(playerRecord)
    } catch (error) {
        rollbar.error("Did not succeed in getting player stats");
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});