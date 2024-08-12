
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
  try {
    const token = req.headers['token']

    if(!token) return res.status(403).json({ message: 'no token provided' })
    
    jwt.verify(token, process.env.SECRET, (err,decode) => {
      if(err) return res.status(401).json(err)

      req.user = decode
      next()
    })

  } catch (error) {
    res.json(error.message)
    console.log(error)
  }
}
