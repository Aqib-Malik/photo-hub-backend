const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');;

const mySql = require('mysql');

const secretKey = crypto.randomBytes(32).toString('hex')
var con=mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'photo_hub'
})
con.connect(function(err,){
    if(err) err;
    console.log('database connected')
})

exports.signup = (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;

    // Generate a verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const sql = 'INSERT INTO users (username, email, password, verification_token) VALUES (?, ?, ?, ?)';
        con.query(sql, [username, email, hashedPassword, verificationToken], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            console.log('User signed up successfully');
            // Send email with verification link
            sendVerificationEmail(email, verificationToken);
            res.status(201).json({ message: 'User signed up successfully. Check your email for verification link.' });
        });
    });
};

// Function to send verification email
function sendVerificationEmail(email, verificationToken) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ford.runolfsdottir@ethereal.email',
            pass: 'rn8bsZeZ4QWhFhrbx5'
        }
    });

    const mailOptions = {
        from: '"photo hub 👻" <ford.runolfsdottir@ethereal.email>',
        to: email,
        subject: 'Account Verification',
        text: `Click the following link to verify your account: http://localhost:3001/verify-email/${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
            console.log('Email sent:', info);
        }
    });
}

exports.verifyEmail = (req, res) => {
    const verificationToken = req.params.token;
    const sql = 'SELECT * FROM users WHERE verification_token = ?';
    con.query(sql, [verificationToken], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Invalid or expired verification token' });
        }
        const updateSql = 'UPDATE users SET verified = true, verification_token = null WHERE id = ?';
        con.query(updateSql, [result[0].id], (err, updateResult) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            console.log('Email verified successfully');
            res.status(200).json({ message: 'Email verified successfully' });
        });
    });
};


exports.login = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    con.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isValid) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!isValid) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }); 

            res.status(200).json({ token ,'userId': user.id});
        });
    });
};

 // Update the is_photographer status in the database
exports.updateIsPhotographer = (req, res) => {
    const userId = req.params.userId; 
    console.log(userId) 
    const sql = 'UPDATE users SET is_photographer = ? WHERE id = ?';
    con.query(sql, [true, userId], (err, result) => {
        if (err) {
            console.error('Error updating is_photographer status:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('is_photographer status updated successfully');
        res.status(200).json({ message: 'is_photographer status updated successfully' });
    });
};

// getAllusers
exports.getAllUsers = (req, res) => {
    const sql = `
        SELECT users.*, 
               COUNT(photos.id) AS total_photos_uploaded
        FROM users
        LEFT JOIN photos ON users.id = photos.user_id
        GROUP BY users.id
    `;
    con.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const mappedResults = results.map(user => ({
            ...user,
            is_photographer: user.is_photographer === 1 ? true : false
        }));

        res.status(200).json(mappedResults);
    });
};
