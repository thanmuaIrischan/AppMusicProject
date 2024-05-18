const express = require('express');
const app = express();
const port = 8082;

app.get('/callback', (req, res) => {
    const code = req.query.code;
    if (code) {
        res.redirect(`musicapp://auth?code=${code}`);
    } else {
        res.send('Authorization code not found.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://192.168.1.12:${port}`);
});
