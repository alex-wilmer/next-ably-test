import jwt from 'jsonwebtoken'

const SECRET = 'wubbalubbadubdub'

function verifyToken(req, res, next) {
  let token = req.body.token

  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Failed to authenticate token.',
        })
      } else {
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    })
  }
}

export default verifyToken
