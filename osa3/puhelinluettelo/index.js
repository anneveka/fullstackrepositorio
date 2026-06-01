if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const Person = require("./models/person");

const app = express();

let persons = [];

const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
};

app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id).then((person) => {
        response.json(person);
    });
});

const generateId = () => {
    const randomId = Math.floor(Math.random() * 1000000);
    return String(randomId);
};

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "content missing",
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then((savedPerson) => {
        response.json(savedPerson);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
