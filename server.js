const express = require('express');
const mongoose = require('mongoose'); // Added Mongoose
const app = express();

// Middleware to parse URL-encoded bodies (from form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., CSS, images)
app.use(express.static('public'));

// Serve the HTML form at the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

// Route to handle form submissions
app.post('/register', (req, res) => {
    const { firstName, lastName, email } = req.body;
    // Process the form data (e.g., validation, database interaction)
    console.log(`Received registration data: ${firstName}, ${lastName}, ${email}`);
    // Assuming you have defined a Mongoose model named User
    const User = mongoose.model('User', {
        firstName: String,
        lastName: String,
        email: String
    });
    const user = new User({ firstName, lastName, email });
    user.save()
        .then(() => {
            console.log('User saved successfully!');
            res.send('Registration successful!');
        })
        .catch((error) => {
            console.error('Error saving user:', error);
            res.status(500).send('Internal Server Error');
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://suma:suma@register.jptdgfh.mongodb.net/registration', {
    // Removed useNewUrlParser and useUnifiedTopology options
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
