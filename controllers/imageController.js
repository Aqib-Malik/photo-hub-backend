// Import the MySQL connection
const mySql = require('mysql');

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

exports.createImage = (req, res) => {
    // Extract necessary data from the request body
    const { image, title, description, rating, userId,category_id } = req.body;

    // Create the SQL query to insert the image record into the database
    const sql = 'INSERT INTO photos (image, title, description, rating, user_id, category_id) VALUES (?, ?, ?, ?, ?, ?)';
    con.query(sql, [image, title, description, rating, userId,category_id], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Image created successfully');
        res.status(201).json({ message: 'Image created successfully' });
    });
};


exports.getImages = (req, res) => {
    const sql = `
        SELECT photos.*, users.username, categories.category_name
        FROM photos
        JOIN users ON photos.user_id = users.id
        JOIN categories ON photos.category_id = categories.id
    `;
    con.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(results);
    });
};


exports.addRating = (req, res) => {
    // Extract necessary data from the request body
    const { imageId, rating } = req.body;

    // Fetch existing ratings for the image from the database
    const getRatingsSql = 'SELECT rating FROM photos WHERE id = ?';
    con.query(getRatingsSql, [imageId], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Calculate the new average rating
        const existingRatings = rows.map(row => row.rating);
        const totalRatings = existingRatings.length;
        const newAverageRating = (existingRatings.reduce((acc, cur) => acc + cur, 0) + rating) / (totalRatings + 1);

        // Update the image's rating in the database with the new average rating
        const updateRatingSql = 'UPDATE photos SET rating = ? WHERE id = ?';
        con.query(updateRatingSql, [newAverageRating, imageId], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            console.log('Rating added successfully');
            res.status(200).json({ message: 'Rating added successfully' });
        });
    });
};

// getCategories
exports.getCategories = (req, res) => {
    const query = 'SELECT * FROM categories';
  
    con.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving categories: ', err);
        res.status(500).json({ error: 'Failed to retrieve categories' });
        return;
      }
      res.json(results);
    });
  };
  
