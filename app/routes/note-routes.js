let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'Hope you didn\'t expect anything less'});
            } else {
                res.send(item);
            }
        });
    });
    app.post('/notes', (req, res) => {
        // creates note here.
        const note = { title: req.body.title, body: req.body.body };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred.... for some reason.'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { title: req.body.title, body: req.body.body };
        db.collection('notes').update(details, note, (err, results) => {
            if (err) {
                res.send({'error': 'An error has occurred.... for some reason.'});
            } else {
                res.send(note);
            } 
        });
    });
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { title: req.body.title, body: req.body.body };
        db.collection('notes').remove(details, note, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred.... for some reason.'});
            } else {
                res.send('Deleted the ' + JSON.stringify(note.title) + ' note!');
            } 
        });
    });
};