var Model = require('../models/beer').model;

exports.retrieve = function(req, res){

    var id  = req.params.id;

    if (id) {

        var query = {_id: id};

        Model.findOne(query, function (err, data) {
            if (err) {
                res.send('Error: ' + err);
            } 

            res.json(data);

        });

    } else {
        
        Model.find(function (err, data) {

            if (err) {
                res.send('Error: ' + err);
            } 

            res.json(data);

        });

    }

};

exports.create = function(req, res){

    var dados = req.body,
        model = new Model(dados);

    model.save(function(err) {

        if (err) {
            res.send('Error: ' + err);
        }

        res.send('Cerveja cadastrada com sucesso');
          
    });

};

exports.delete = function(req, res){

    var id = req.params.id;

    var criteria = {_id: id};

    Model.remove(criteria, function(err){

        if (err) {
            res.send('Erro ' + err);
        }

        res.send('Cerveja removida com sucesso');

    });

};

exports.update = function(req, res){

    var id = req.params.id;

    var criteria = {_id : id};

    var mod = req.body;

    Model.update(criteria, mod, function(err, data){

        if (err) {
            res.send('Error ' + err);
        }

        res.send('Cerveja atualizada');

    });
};