const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://mongodb:27017/tabUrls', { useNewUrlParser: true, useUnifiedTopology: true });

const urlSchema = new mongoose.Schema({ url: String });
const Url = mongoose.model('Url', urlSchema);

// Endpoint to save URLs
app.post('/save-urls', async (req, res) => {
    const urls = req.body.urls.map(url => ({ url }));
    await Url.insertMany(urls);
    res.sendStatus(200);
});

// Endpoint to get saved URLs
app.get('/saved-urls', async (req, res) => {
    const urls = await Url.find({});
    res.json(urls);
});

app.listen(3000, () => console.log('Server running on port 3000'));