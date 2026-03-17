const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("forum");
const products = db.collection("messages");

client.connect().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

// Route pour envoyer un message (utilisée par le service Sender)
app.post('/messages', (req, res) => {
    const { pseudonyme, contenu } = req.body;

    if (!pseudonyme || !contenu) {
        return res.status(400).json({ error: "Pseudonyme et contenu requis" });
    }

    const newMessage = { id: messages.length + 1, pseudonyme, contenu, date: new Date() };
    messages.push(newMessage);

    res.status(201).json(newMessage);
});

// Route pour récupérer tous les messages (utilisée par le service Thread)
app.get('/messages', (req, res) => {
    res.json(messages);
});

//Normalement on utilise une variable d'environnement pour le port, mais pour la simplicité on utilise 3000
app.listen(3000, () => {
    console.log("API server running on port 3000");
});