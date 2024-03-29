const fs = require('fs')


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);



exports.checkBody = (req, res, next, val) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next()
}

exports.checkID = (req, res, next, val) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            message: 'Invalid ID',
            status: 'fail'
        })
    }
    next()
}

exports.getAllTours = (req, res) => {

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }})
}

exports.createTour = (req, res) => {
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
}

exports.getTour = (req, res) => {
    console.log(req.params)

    const id = req.params.id * 1;

    const tour = tours.find(el => el.id == id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

exports.updateTour = (req, res) => {
   
    
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

exports.deleteTour = (req, res) => {
    
    
    res.status(204).json({
        status: 'success',
        data: null
    })
}
