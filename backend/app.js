const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const newsRoute = require('./routes/newsRoute')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', newsRoute)
app.get('/', (req, res) => {
    res.send('hello this is news page')
})

mongoose.connect(process.env.MONGO_URI,)
    .then(() => {
        console.log('Database Connected')
    })
    .catch((error) => {
        console.log('Error..........', error)
    })


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


