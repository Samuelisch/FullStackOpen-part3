const mongoose = require('mongoose')

const url = 
  `mongodb+srv://samuelisch:Sw36EnpeZ3TNQ3dB@cluster0.vkmva.mongodb.net/contact-list?retryWrites=true&w=majority`

console.log('connecting to url')

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Person', personSchema)