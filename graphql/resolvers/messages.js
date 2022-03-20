const Message = require('../../models/Message')

module.exports = {
    Mutation: {
        async createMessage(_, { messageInput: { text, username }}) {
            const newMessage = new Message({
                text: text,
                createdBy: username,
                createdAt: new Date().toISOString()
            })
            const res = await newMessage.save()
            console.log('response', res)
            return {
                id: res.id,
                ...res._doc
            }
        }
    },
    Query: {
        message: async (parent, { ID }, context) => await Message.findById(ID),
        messages: async () => {
            return await Message.find()
        }
    }
}