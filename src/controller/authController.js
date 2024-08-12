
import {prisma} from "../db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req,res) => {
  try {
    const { username, password } = req.body
    
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if(user) return res.status(409).json('user already exists')

    // hashing password
    bcrypt.hash(password, 10)
      .then(async (hashedPassword) => {

        const newUser = await prisma.user.create({
          data: {
            username: username,
            password: hashedPassword
          }
        })
        // set token
        const token = jwt.sign({id: newUser.id}, process.env.SECRET)

        return res.status(200).json({token})

      })
      .catch(error => res.status(500).json({error: error.message}))

  } catch (error) {
    console.log(error.message)
    res.json({error: error.message})
  }
}

export const login = async (req,res) => {
  try {
    const { username, password } = req.body 

    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if (!user) return res.status(404).json('user not found')

    const hashedPassword = await bcrypt.compare(password, user.password)
    if(!hashedPassword) return res.status(401).json('incorrect password')

    const token = jwt.sign({id: user.id}, process.env.SECRET)

    res.json({token})

  } catch (error) {
    console.log(error.message)
    res.json({error: error.message})
  }
}
