const express = require('express');
const { mongoose } = require('./database');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.json());
app.use(cors());

app.use('/users', require('./routes/user.routes'));
app.use('/publications', require('./routes/publication.routes'));

app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});