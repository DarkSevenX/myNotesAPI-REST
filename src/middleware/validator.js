
import { body, validationResult } from "express-validator";

export const result = (req,res,next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }
  next()
}

export const authValidator = [
  body('username')
    .not()
    .isNumeric()
    .withMessage('Username must be a string')
    .exists()
    .notEmpty()
    .withMessage('Username is required'),
  body('password')
    .exists()
    .notEmpty()
    .withMessage('Password is required'),
  (req,res,next) => {
    result(req,res,next)
  }
]

export const noteValidator = [
  body('content')
    .exists()
    .notEmpty()
    .withMessage('Content is required'),
  (req,res,next) => {
    result(req,res,next)
  }
]

export const patchNoteValidator = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('title not empty'),
  body('content')
    .optional()
    .notEmpty(),
  (req,res,next) => {
    result(req,res,next)
  }
]
