const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10
const { ApolloError } = require('apollo-server')
const User = require('../../models/User')

const newJWTToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME, }
    )
}

module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password }}) {
            // check if user exists with same email
            const userExists = await User.findOne({ email })
            if (userExists) {
                throw new ApolloError(`User already exists with email: ${email}`, 'USER_ALREADY_EXISTS')
            }

            // Encrypt password
            const encryptedPasssword = await bcrypt.hash(password, saltRounds)

            // Populate the mongoose model
            const newUser = new User ({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPasssword
            })

            // Create JWT token and attach to the user model
            const payload = { userId: newUser._id, email }
            // const token = jwt.sign(
            //     payload,
            //     process.env.JWT_SECRET,
            //     { expiresIn: process.env.JWT_LIFETIME, }
            // )
            newUser.token = newJWTToken(payload)

            // Save User in MongoDB
            const res = await newUser.save()

            return {
                id: res.id,
                ...res._doc
            }
        },
        async loginUser(_, { loginInput: { email, password }}) {
            // check if user exists with same email
            const user = await User.findOne({ email })
            if (!user) {
                throw new ApolloError(`${email} doesn't exist. Please register as new user`, 'USER_DOESNT_EXIST')
            }
            // check if password is correct
            if (await bcrypt.compare(password, user.password)) {
                // create a new token
                const payload = { userId: user._id, email }
                user.token = newJWTToken(payload)
                return {
                    id: user._id,
                    ...user._doc
                }
            }
            throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD')
        },
    },
    Query: {
        user: async (parent, { ID }, context) => await User.findById(ID),
        users: async () => {
            return await User.find()
        }
    }
}