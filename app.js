const express = require('express')
const app = express()
app.use(express.json())

let beers = [{ 'id': '1', 'name': 'Stella Artois', 'origin': 'Belgium' }, { 'id': '2', 'name': 'Warsteiner', 'origin': 'Germany' }, { 'id': '3', 'name': 'Corona', 'origin': 'Mexico' }]
let idRegister = 3

app.get('/', (req, res) => {
    res.send({
        'message': 'Hey, here is a list of the endpoints',
        'GET "/beers"': 'Returns a list of beers.',
        'GET "/beers/{id}"': 'Returns a specific beer after its ID.',
        'POST "/beers"': 'Adds a beer to the list.',
        'PUT "/beers/{id}"': 'Edits the specified beer.',
        'DELETE "/beers/{id}"': 'Deletes the specified beer.'
    })
})

app.get('/beers', (req, res) => {
    res.send(beers)
})

app.get('/beers/:id', (req, res) => {
    const id = req.params.id
    res.send(beers.find(beer => beer.id == id))
})

app.post('/beers', (req, res) => {
    const found_index = beers.findIndex( beer => req.body.name == beer.name)    
    if (found_index > -1){
        res.statusCode = 400
        res.statusMessage = 'That beer is already in the list under id #' + beers[found_index].id
        res.send()
    }

    let newBeer = req.body
    idRegister += 1
    newBeer.id = idRegister
    beers.push(newBeer)
    res.statusCode = 201
    res.send(newBeer)
})

app.put('/beers/:id', (req, res) => {
    const id = req.params.id
    let beerToEdit = beers.find(beer => beer.id == id)
    if (beerToEdit === undefined) {
        res.status = 404
        res.send({})
    } else {
        beerToEdit.name = req.body.name
        beerToEdit.origin = req.body.origin
        beers = beers.map(beer => beer.id == id ? beerToEdit : beer)
        res.status(200)
        res.send(beerToEdit)
    }
})

app.delete('/beers/:id', (req, res) => {
    const id = req.params.id
    beers = beers.filter(beer => beer.id !== id)
    res.status(204)
    res.send({})

})

app.get('/error_test', (req, res) => {
    try {
        throw new Error('My custom error message')
    } catch (err) {
        next(err)
    }
    res.send()
})

app.listen(8080)
