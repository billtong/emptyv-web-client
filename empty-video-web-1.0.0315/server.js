const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

//Redirect https to http
//TODO: ENABLE HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect(`http://${req.hostname}${req.url}`);
  } else {
    next();
  }
});

app.use(express.static('public'));

app.get('*', (request, response) => {
  //console.log(path.resolve(__dirname, 'public', 'index.html'));
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Express server is up on port ${PORT}`);
});
