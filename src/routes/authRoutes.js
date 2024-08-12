import { Router } from "express";
import { register, login } from "../controller/authController.js";
import {authValidator} from "../middleware/validator.js";

const router = Router()

router
  .post('/register',authValidator, register)
  .post('/login',authValidator, login)

/**
  * @swagger
  * /api/auth/register:
  *   post:
  *     description: Register a new user
  *     tags: [Auth]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - username
  *               - password
  *             properties:
  *               username:
  *                 type: string
  *                 example: john_doe
  *               password:
  *                 type: string
  *                 format: password
  *                 example: securepassword123
  *     responses:
  *       200:
  *         description: User registered successfully
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 token:
  *                   type: string
  *                   description: JWT token for the newly registered user
  *       400:
  *         description: Bad Request - Validation errors
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 type: object
  *                 properties:
  *                   type:
  *                     type: string
  *                   msg:
  *                     type: string
  *                   path:
  *                     type: string
  *                   location:
  *                     type: string
  *       409:
  *         description: User already exists
  *       500:
  *         description: Internal server error
*/

  /**
  * @swagger
  * /api/auth/login:
  *   post:
  *     summary: Login a user
  *     tags: [Auth]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - username
  *               - password
  *             properties:
  *               username:
  *                 type: string
  *                 example: john_doe
  *               password:
  *                 type: string
  *                 format: password
  *                 example: securepassword123
  *     responses:
  *       200:
  *         description: User logged in successfully
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 token:
  *                   type: string
  *                   description: JWT token for the authenticated user
  *       400:
  *         description: Bad Request - Validation errors
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 type: object
  *                 properties:
  *                   type:
  *                     type: string
  *                   msg:
  *                     type: string
  *                   path:
  *                     type: string
  *                   location:
  *                     type: string
  *       401:
  *         description: Incorrect password
  *       404:
  *         description: User not found
  *       500:
  *         description: Internal server error
 */
export default router
