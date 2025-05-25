const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

// Exemple d'API distante qu'on appelle
const REMOTE_API_URL = 'https://api.exemple.com/authenticate';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const apiResponse = await fetch(REMOTE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!apiResponse.ok) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const result = await apiResponse.json();

    // Facultatif : générer un token local
    const token = jwt.sign({ email }, 'SECRET_KEY', { expiresIn: '1h' });

    res.json({ token, user: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

// Simule une base de données en mémoire (à remplacer par une vraie plus tard)
const users = [];

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'Utilisateur déjà inscrit.' });
  }

  users.push({ email, password });
  res.status(201).json({ message: 'Inscription réussie.' });
});