const express = require('express');
const fs = require('fs')

const app = express();

app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.lentgh,
        data: {
            tours
        }
    });
});

app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.lentgh -1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.strinify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })

   
});


const port = 3000 

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});