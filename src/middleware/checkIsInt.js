

export const isInt = (req,res,next) => {
  const id = parseInt(req.params.id)  
  if (isNaN(id)) return res.status(400).json('el id debe ser de tipo entero')

  next()
}
