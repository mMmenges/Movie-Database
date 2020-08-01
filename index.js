const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js');
const path = require('path');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();

app.use(express.static('public'));
app.use('/client', express.static(path.join(__dirname, 'client', 'dist')));

app.get('client/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

const cors = require('cors');
// app.use(cors());

// this restricts the origins allowed in the list below
let allowedOrigins = [
    'http://localhost:8080/',
    'https://oldmyflix-api.herokuapp.com'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) { // If a specific origin isn't found on the list of allowed origins
            let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

const passport = require('passport');
require('./passport');

const { check, validationResult } = require('express-validator');



mongoose.connect(process.env.CONNECTION_URI, { useNewURLParser: true, useUnifiedTopology: true });
console.log('===== Connecting to DB ... =====', uri);

app.use(morgan('common'));
app.use(bodyParser.json());

let auth = require('./auth')(app);

// Webpage - Welcome
app.get('/', (req, res) => {
    res.send('Welcome to Michaels movie data base!');
});

// Documentation
app.get('documentation', (req, res) => {
    res.sendFile('public/documentation.html', {
        root: __dirname
    });
});


//gets the full list of movies
app.get("/movies", passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// gets the data for one specific movie, searched by name
app.get('/movies/Title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// gets movies by genre when searching by genre
app.get('/movies/genres/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name })
        .then((movies) => {
            res.status(201).json(movies.Genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// gets movies by director when searching by director name
app.get('/movies/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name })
        .then((movies) => {
            res.status(201).json(movies.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// is this the key?

app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, athentification was successful.
        // 'req.user' contains the authenticated user.

        res.redirect('/users/' + req.user.username);
    });


// new users can sign up by name, email and password, and can give more information
app.post('/users',
    // Validation logic here for request
    // you can either use a chain of methods like .not().isEmpty()
    // which means "opposide of isEmpty in plain english "is not empty"
    // or use .isLength({min: 5}) which means
    // minimum value of 5 characters are only allowed
    [
        check('Username', 'Username with minimum 5 characters is required.').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required.').not().isEmpty(),
        check('Email', 'Email does not appear to be valid.').isEmail()
    ], (req, res) => {
        // check the validation object for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = Users.hashPassword(req.body.Password);
        Users.findOne({ Username: req.body.Username }, { Email: req.body.Email }) // Search to see if a user with the requested username already exists
            .then((user) => {
                if (user) { // If the user is found, send a response that it already exists
                    return res.status(400).send(req.body.Username + 'or' + req.body.Email + 'already exists');
                } else {
                    Users
                        .create({
                            Username: req.body.Username,
                            Password: hashedPassword,
                            Email: req.body.Email,
                            Birthday: req.body.Birthday
                        })
                        .then((user) => { res.status(201).json(user) })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send('Error: ' + error);
                        })
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            });
    });


// redirection to users homepage
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// users can update their information, by username

app.put('/users/:Username', [
    check('Username', 'Username with minimum 5 characters is required.').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password ist required.').not().isEmpty(),
    check('Email', 'Email does not appear to be valid.').isEmail()
], passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    Users.findOneAndUpdate({ Username: req.params.Username }, {
            $set: {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        }, { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// users can delete their profile
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found.');
            } else {
                res.status(200).send(req.params.Username + ' was deleted');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// users can add movies to their favorites list by name
app.post('/users/:Username/FavoriteMovies/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $push: { FavoriteMovies: req.params._id } }, { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

// users can remove movies from their favorites list
app.delete('/users/:Username/FavoriteMovies/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findByIdAndUpdate({ Username: req.params.Username }, { $pull: { FavoriteMovies: req.params._id } }, { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});




app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.use(express.static('public'));

// this is the app listening to the server
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});

//general error code for app
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
});