const jwt = require("jsonwebtoken")
require("dotenv").config()

function restrict() {
	const authError = {
		message: "'restrict' Invalid credentials",
	}
	const verfError = {
		message: 'restrict verify error'
	}
	
	return async (req, res, next) => {
		try {
			const token = req.headers.bob
			if (!token) {
				return res.status(401).json(authError)
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(verfError)
				}

				req.token = decoded
				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict