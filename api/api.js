const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());


const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("forum");
const collectionMessages = db.collection("messages");

client.connect().then(() => {
    console.log("Connecté à MongoDB avec succès");
}).catch((err) => {
    console.error("Erreur de connexion MongoDB :", err);
});

// Route pour envoyer un message (utilisée par le service Sender)
app.post('/messages', async (req, res) => {
    const { pseudonyme, contenu } = req.body;

    if (!pseudonyme || !contenu) {
        return res.status(400).json({ error: "Pseudonyme et contenu requis" });
    }

    try {
        const newMessage = { pseudonyme, contenu, date: new Date() };
        const result = await collectionMessages.insertOne(newMessage);
        res.status(201).json({ _id: result.insertedId, ...newMessage });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'enregistrement" });
    }
});

// Route pour récupérer tous les messages (utilisée par le service Thread)
app.get('/messages', async (req, res) => {
    try {
        const messages = await collectionMessages.find().toArray();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération" });
    }
});

//Normalement on utilise une variable d'environnement pour le port, mais pour la simplicité on utilise 3000
app.listen(3000, () => {
    console.log("API server running on port 3000");
});