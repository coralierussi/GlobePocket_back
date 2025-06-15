import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple route pour vérifier
app.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({ data: { email, name } });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});





const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

// app.post('/api/register2', async (req, res) => {
//     const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const newUser = await prisma.user.create({
//     data: {
//       email: 'alice@example.com',
//       name: 'Alice',
//       posts: {
//         create: { title: 'Mon premier post' },
//       },
//     },
//   });

//   console.log(newUser);
// });

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

// app.post('/api/model', async (req, res) => {
//     const { PrismaClient } = require('@prisma/client');
//     const prisma = new PrismaClient();
    
//     try {
//         const { name } = req.body;
//         const newModel = await prisma.MyTestModel.create({
//             data: {
//                 name: req.body.name,
//             },
//         });
//         res.status(201).json(newModel);
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Erreur lors de la création du modèle.' });
//     }
// });

// app.get('/api/model', async (req, res) => {
//     const { PrismaClient } = require('@prisma/client');
//     const prisma = new PrismaClient();
    
//     try {
//         const { name } = req.body;
//         const info = await prisma.MyTestModel.find({
//             data: {
//                 name: req.body.name,
//             },
//         });
//         res.status(201).json(info);
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Erreur lors de la création du modèle.' });
//     }
// });

// // Démarrer le serveur
// app.listen(PORT, () => {
//   console.log(`Serveur lancé sur http://localhost:${PORT}`);
// });

// main()
//   .catch(e => console.error(e))
//   .finally(() => prisma.$disconnect());

