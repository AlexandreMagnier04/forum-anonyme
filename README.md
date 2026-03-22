# Forum Anonyme - Guide de Test & Isolation

Ce projet implémente une architecture micro-services isolée via Docker. Ce document regroupe les commandes nécessaires pour valider le fonctionnement et la sécurité (isolation réseau) du système.

## Test de Fonctionnement

Vérifier que le thread et le sender fonctionnent correctement :

```powershell
 docker exec -it forum-thread ping api
```

```powershell
 docker exec -it forum-sender ping api
```

Envoyer un message (via le Sender)
Depuis un terminal PowerShell, utilise cette commande pour simuler un utilisateur qui publie un message sur le port 8080 :

```powershell
curl.exe -X POST http://localhost:8080/messages `
    -H "Content-Type: application/json" `
    -d '{\"pseudonyme\": \"Anonyme\", \"contenu\": \"Test de sécurité Docker\"}'
```

Lire les messages (via le Thread)
Ouvre le navigateur sur http://localhost:80

## Test d'Isolation Réseau

### Accès à la base de données depuis l'extérieur

Depuis un terminal PowerShell, tente d'accéder à la base de données MongoDB depuis l'extérieur des conteneurs :

```powershell
    docker exec -it forum-sender ping db
```

```powershell
docker exec -it forum-thread ping db
```

### Accès à l'API depuis le Thread

Depuis un terminal PowerShell, tente d'accéder à l'API depuis le conteneur du Thread :

```powershell
curl.exe http://localhost:3000/messages
```

### Accéder à la BDD depuis l'extérieur

Depuis un terminal PowerShell, tente d'accéder à la base de données MongoDB depuis l'extérieur des conteneurs :

```powershell
docker exec -it forum-db ping db
```
