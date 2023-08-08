const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'junnsol9909*',
    database: 'bucketplace'
});

app.post('/signup', (req, res) => {
    console.log("Signup request received:", req.body);
    const { name, email, password } = req.body;

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, password], (err, results) => {
        if (err) {
            return res.status(400).send({ error: err.message });
        }
        res.send({ message: 'User registered successfully!' });
    });
});

app.post('/login', (req, res) => {
    console.log("Login request received:", req.body);
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(400).send({ error: err.message });
        }

        if (results.length > 0) {
            res.send({ success: true, message: 'User logged in successfully!' });
        } else {
            res.send({ success: false, message: 'Invalid email or password!' });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});