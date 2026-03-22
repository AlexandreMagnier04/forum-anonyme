const express = require('express');
const app = express();

app.use(express.json());

// Route principale : Récupère et affiche les messages
app.get('/', async (req, res) => {
    try {
        // Le Thread appelle l'API pour LIRE les messages
        const response = await fetch('http://api:3000/messages', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const datas = await response.json();

        // Affichage des messages
        res.status(200).json({
            service: "Thread (Lecture)",
            total: datas.length,
            messages: datas
        });
    } catch (error) {
        console.error("Erreur de liaison avec l'API:", error);
        res.status(500).send("Erreur : Impossible de récupérer les messages.");
    }
});

app.listen(80, () => {
    console.log(`Le service Thread écoute sur le port 80`);
});