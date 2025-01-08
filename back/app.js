import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import multer from 'multer';
import { router } from './app/router.js';

const app = express();

app.use(cors({
   origin: 'http://127.0.0.1:5501',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());

// Configurez express-session
app.use(session({
      secret: 'pokemon',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
}));

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`🚀 API démarrée à l'adresse : http://localhost:${port}`);
});