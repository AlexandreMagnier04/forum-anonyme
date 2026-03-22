const express = require('express');

const app = express();
app.use(express.json());

// Route POST : Le Sender reçoit les données du formulaire et les transmet à l'API
app.post('/messages', async (req, res) => {
    const { pseudonyme, contenu } = req.body;

    try {
        // Le Sender "consomme" l'API sur le réseau Docker interne 
        const response = await fetch('http://api:3000/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pseudonyme, contenu })
        });

        const data = await response.json();
        res.status(201).json({ status: "Success", data });
    } catch (error) {
        console.error("Erreur de liaison avec l'API:", error);
        res.status(500).json({ error: "Impossible de joindre l'API" });
    }
});


// Route pour tester l'envoi
app.get('/', (req, res) => {
    res.send("Service Sender opérationnel. Prêt à envoyer des messages !");
});

// Lancement du serveur
app.listen(8080, () => {
    console.log(`Le service Sender écoute sur le port 8080`);
});