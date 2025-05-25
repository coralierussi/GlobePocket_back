const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simule une base de données
const users = [];

// Routes
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'Utilisateur déjà inscrit.' });
  }

  users.push({ email, password });
  res.status(201).json({ message: 'Inscription réussie.' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Email ou mot de passe invalide.' });
  }

  // Simule un token
  res.json({ message: 'Connexion réussie.', token: 'faketoken123' });
});

// Optionnel : message pour la racine (GET /)
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
