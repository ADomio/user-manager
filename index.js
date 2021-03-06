const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const keys = require('./config/keys');

//@TODO
//require models
require('./models/User');
require('./models/Member');
require('./models/Group');
require('./services/passport');
require('./services/cache');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true
});

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(cors());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.cookieKey ]
	})
);

app.use(passport.initialize());
app.use(passport.session());

//@TODO
// import routes
require('./routes/authRoutes')(app);
require('./routes/memberRoutes')(app);
require('./routes/groupRoutes')(app);
require('./routes/dashboardRoutes')(app);
require('./routes/uploadRoute')(app);

if ([ 'production' ].includes(process.env.NODE_ENV)) {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
