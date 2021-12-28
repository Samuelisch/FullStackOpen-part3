const personsRouter = require('express').Router();
const Person = require('../models/person');

personsRouter.get('/', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((err) => next(err));
});

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

personsRouter.post('/', (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedContact) => savedContact.toJSON())
    .then((savedAndFormattedContact) => {
      response.json(savedAndFormattedContact);
    })
    .catch((err) => next(err));
});

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  const opts = {
    runValidators: true,
    context: 'query',
    new: true,
  };

  Person.findByIdAndUpdate(request.params.id, person, opts)
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
