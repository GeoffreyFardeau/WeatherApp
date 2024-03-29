require('dotenv').config();

const express = require('express');
const app = express();





app.use(express.static(__dirname + '/assets'));

app.set('port', process.env.PORT || 5000);
app.set('base_url', process.env.BASE_URL + ':' + app.get('port'));
app.listen(app.get('port'), () => {
        console.log(`Listening on ${app.get('base_url')
    }`);
});