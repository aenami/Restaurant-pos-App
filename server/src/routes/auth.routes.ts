import express from 'express'
// Importamos metodos de nuestro controlador
import { loginUser } from '../controllers/auth.controller.js';
const router = express.Router()

// Ruta de login
router.post('/login', loginUser)

export default router

