const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'bucketplace'
});

app.post('/signup', async (req, res) => {
    console.log("Signup request received:", req.body);
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashedPassword], (err, results) => {
        if (err) {
            return res.status(400).send({ error: err.message });
        }
        res.send({ message: '회원가입 성공!' });
    });
});

app.post('/login', (req, res) => {
    console.log("Login request received:", req.body);
    const { email, password } = req.body;

    const updateQuery = 'UPDATE root SET users_email = ? WHERE users_email IS NULL AND users_email != ?';
    // email정보를 로그인함과 동시에 users_email로 전송
   db.query(updateQuery, [email, email], (error, results) => {
    if (error) {
      console.error('Error updating user email:', error);
      res.status(500).json({ message: 'Error updating user email' });
    } else {
      console.log('Email updated in root table');
      res.status(200).json({ message: 'Email updated in root table' });
    }
  });

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(400).send({ error: err.message });
        }

        if (results.length > 0) {
            const user = results[0];

            // 비밀번호 확인
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                res.send({ success: true, message: 'User logged in successfully!' });
            } else {
                res.send({ success: false, message: 'Invalid email or password!' });
            }
        } else {
            res.send({ success: false, message: '이메일이나 비밀번호가 틀렸습니다!' });
        }
    });
}); 


app.post('/root', (req, res) => {
    console.log("root request recevied:", req.body);
    const { lat, lon } = req.body;

    const query = "INSERT INTO root (lat, lon) VALUES (?, ?)";
    db.query(query, [lat, lon], (err, results) => {
        if(err) {
            return res.status(400).send({error: err.message});
        }
        res.send({ message: 'root registered successfully!'});
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});