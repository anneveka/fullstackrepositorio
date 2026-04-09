const express = require("express");
const app = express();

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "123-456-789",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.use(express.json());

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = persons.find((person) => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.get("/info", (request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(
        "Phonebook has info for " + persons.length + " people\n" + new Date(),
    );
});

const generateId = () => {
    const maxId =
        persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
    return String(maxId + 1);
};

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "name missing",
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number missing",
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons = persons.concat(person);

    response.json(person);
});

app.delete("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    notes = notes.filter((note) => note.id !== id);

    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
