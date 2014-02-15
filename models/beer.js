var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:17958/beers');

var db = mongoose.connection;

db.on('error', function(err){
    console.log('Erro de conexao.', err);
});

db.once('open', function () {
  console.log('Conexão aberta.');
});

var BeerSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  category: { type: String, default: ''},
  created: { type: Date, default: Date.now }
});

exports.model = mongoose.model('Beer', BeerSchema);