import {Router} from "express";
import { getNotes, getNoteById, createNote, editNote, deleteNote } from "../controller/noteController.js";
import { verifyToken } from "../middleware/authJwt.js";
import { isInt } from "../middleware/checkIsInt.js";
import {noteValidator, patchNoteValidator} from "../middleware/validator.js";

const router = Router()

router.use(verifyToken)
router.use('/:id', isInt)

router
  .get('/', getNotes)
  .get('/:id',getNoteById)  
  .post('/', noteValidator,createNote)
  .patch('/:id', patchNoteValidator ,editNote)
  .delete('/:id',deleteNote)

/**
  * @swagger
  * /api/notes:
  *   get: 
  *     summary: Obtiene todas las notas del usuario
  *     tags: [Notes]
  *     security: 
  *       - bearerAuth: []
  *     parameters:
  *       - in: header
  *         name: token
  *         required: true
  *         schema: 
  *           type: string
  *         description: token de autorización (se te da al registrarte o loguearte)
  *     responses:
  *       200:
  *         description: una lista de notas del ususario (puede ser una lista vacia si no tiene notas) 
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items: 
  *                 type: object
  *                 properties:
  *                   id:
  *                     type: integer
  *                     example: 21
  *                   title: 
  *                     type: string
  *                   content: 
  *                     type: string
  *                   createddAt:
  *                     type: string
  *                     format: datetime
  *                     description: fecha y hora de creacion
  *                   userId:
  *                     type: integer
  *                     example: 1
  *                     description: id del usuario al que le pertenece la nota
  *       401:
  *         $ref: '#/components/responses/UnauthorizedError'
  *       403:
  *         $ref: '#/components/responses/noTokenProvided'
  *       500:
  *         description: internal server error
  *
  *    
  */

  /**
  * @swagger
  * /api/notes/{id}:
  *   get:
  *     description: muestra una nota del usuario por id
  *     tags: [Notes]
  *     security: 
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema: 
  *           type: integer
  *         description: id de la nota
  *       - in: header
  *         name: token
  *         required: true
  *         schema: 
  *           type: string
  *         description: token de autorización (se te da al registrarte o loguearte)
  *     responses:
  *       200:
  *         description: nota consultada correctamente
  *         content: 
  *           application/json:
  *             schema: 
  *               type: object
  *               properties:
  *                   id:
  *                     type: integer
  *                     example: 21
  *                   title: 
  *                     type: string
  *                   content: 
  *                     type: string
  *                   createddAt:
  *                     type: string
  *                     format: datetime
  *                     description: fecha y hora de creacion
  *                   userId:
  *                     type: integer
  *                     example: 1
  *                     description: id del usuario al que le pertenece la nota
  *       400:
  *         description: bad request, el id debe ser tipo entero
  *
  *       401:
  *         $ref: '#/components/responses/UnauthorizedError'
  *
  *       403:
  *         $ref: '#/components/responses/noTokenProvided'
  *
  *       404:
  *         description: note not found
  *
  *       500:
  *         description: Internal server error
  *    
  */


  /**
  * @swagger
  * /api/notes/:
  *   post:
  *     tags: [Notes]
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in : header
  *         name: token
  *         required: true
  *         schema:
  *           type: string
  *         description: tokend de autorización
  *
  *     requestBody:
  *       required: true
  *       content: 
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - content
  *             properties:
  *               title:
  *                 type: string 
  *                 example: test title
  *               content: 
  *                 type: string
  *                 example: lorem ipsum
  *     responses:
  *       200:
  *         description: nota creada correctamente
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 id: 
  *                   type: integer
  *                 title:
  *                   type: string
  *                 content: 
  *                   type: string
  *                 createddAt: 
  *                   type: datetime
  *                   example: 2024-08-09T04:49:18.914Z
  *                 userId: 
  *                   type: integer
  *       400:
  *         $ref: '#/components/responses/validationErrors'
  *       401:
  *         $ref: '#/components/responses/UnauthorizedError'
  *       403:
  *         $ref: '#/components/responses/noTokenProvided'
  *       500:
  *         description: internal server error
  *
  */

  /**
  * @swagger
  * /api/notes/{id}:
  *   patch:
  *     description: ruta para editar notas
  *     tags: [Notes]
  *     security: 
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *
  *       - in: header
  *         name: token
  *         required: true
  *         schema:
  *           type: string
  *         description: token de autorización
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               title: 
  *                 type: string
  *                 example: optional title
  *               content: 
  *                 type: string
  *                 example: optional content to edit
  *     
  *     responses:
  *       200:
  *         description: nota actualizada correctamente
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 id: 
  *                   type: integer
  *                 title:
  *                   type: string
  *                 content: 
  *                   type: string
  *                 createddAt: 
  *                   type: datetime
  *                   example: 2024-08-09T04:49:18.914Z
  *                 userId: 
  *                   type: integer
  *       400:
  *         $ref: '#/components/responses/validationErrors'
  *
  *       401:
  *         $ref: '#/components/responses/UnauthorizedError'
  *
  *       403:
  *         $ref: '#/components/responses/noTokenProvided'
  *
  *       404:
  *         description: note to update not found
  *               
  */

  /**
  * @swagger
  * /api/notes/{id}:
  *   delete:
  *     description: ruta para eliminar notas
  *     tags: [Notes]
  *     security: 
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *         description: 
  *       - in: header
  *         name: token
  *         required: true
  *         schema: 
  *           type: string
  *         description: token de autorización 
  *     responses:
  *       200:
  *         description: nota eliminada correctamente
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 id: 
  *                   type: integer
  *                 title:
  *                   type: string
  *                 content: 
  *                   type: string
  *                 createddAt: 
  *                   type: datetime
  *                   example: 2024-08-09T04:49:18.914Z
  *                 userId: 
  *                   type: integer
  *
  *       400:
  *         description: bad request, el id debe ser tipo entero
  *
  *       401:
  *         $ref: '#/components/responses/UnauthorizedError'
  *
  *       403:
  *         $ref: '#/components/responses/noTokenProvided'
  *
  *       404:
  *         description: not found
  *       500:
  *         description: internal server error
  */


/**
  * @swagger
  * components:
  *   responses:
  *     UnauthorizedError:
  *       description: token invalido
  *       content:
  *         application/json: 
  *           schema: 
  *             type: object
  *             properties: 
  *               name: 
  *                 type: string
  *                 example: jsonWebTokenError
  *               message:
  *                 type: string
  *                 example: invalid token
  *
  *     noTokenProvided:
  *       description: no se proporcionó un token en la solicitud
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               message:
  *                 type: string
  *                 example: no token provided
  *     validationErrors:
  *        description: Bad Request - Validation errors
  *        content:
  *         application/json:
  *           schema:
  *             type: array
  *             items:
  *               type: object
  *               properties:
  *                 type:
  *                   type: string
  *                 msg:
  *                   type: string
  *                 path:
  *                   type: string
  *                 location:
  *                   type: string
  *
  */


export default router 
