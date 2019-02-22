const express = require('express')
const app = express()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true })
mongoose.connection.on("error", function(e) { console.error(e); })

// definimos el schema
var schema = mongoose.Schema({
  name: String,
  date: Date
});

// definimos el modelo
var Visitor = mongoose.model("Visitor", schema)

app.get('/', (req, res) => {
  let name = req.query.name
  if (!name)  name = 'Anónimo' 
	Visitor.create({ name: name, date: Date.now() }, function(err) {
    if (err) return console.error(err)
    res.send('<h1>El visitante fue almacenado con éxito</h1>')

  });
});

app.listen(3000, () => console.log('Listening on port 3000!'));