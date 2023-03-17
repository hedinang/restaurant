const mongodb = require('../model/index')
const firebase = require('../api/firebase')
const chatService = require('../service/ChatService')
var uuid = require('uuid');
async function getAll(data) {
    let apiResponse = {}
    let result = await mongodb.Chat.aggregate([
        {
            $match:
            {
                userList: {
                    $elemMatch: {
                        $eq: data.id
                    }
                }
            }
        },
        { $unwind: { path: "$content", preserveNullAndEmptyArrays: true } },
        {
            $lookup:
                { from: "users", localField: "content.userId", foreignField: "id", as: "user" }
        },
        { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                "id": 1,
                "name": 1,
                "content": 1,
                "user": 1,
                'createdAt': 1
            }
        },
        {
            $addFields: {
                "content.userName": "$user.name"
            }
        },
        {
            $group: {
                _id: '$id',
                id: { $first: '$id' },
                name: { $first: '$name' },
                createdAt: { $first: '$createdAt' },
                lastComment: {
                    $last: '$content'
                }
            }
        },
        { $sort: { createdAt: 1 } },

    ])

    apiResponse.data = result
    apiResponse.status = 'OK'
    return apiResponse
}
async function createChat(data) {
    let apiResponse = {}
    data.memberList.push(data.hostId)
    let result = await mongodb.Chat.create({
        id: uuid.v4(),
        userList: data.memberList,
        name: data.groupName,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    // apiResponse.data = result
    apiResponse.status = 'OK'
    return apiResponse
}

async function sendMessage(data) {
    let apiResponse = {}
    if (data.id) {
        let chats = await mongodb.Chat.find({ id: data.id }).lean()
        if (chats.length) {
            let chat = chats[0]
            chat.content.push({
                userId: data.userId,
                message: data.message,
                time: new Date().toISOString()
            })
            try {
                let result = await mongodb.Chat.findOneAndUpdate({ id: data.id }, chat, { new: true });
                apiResponse.data = result;
                apiResponse.status = 'OK'
            } catch (error) {
                apiResponse.message = 'Update data wrong'
                apiResponse.status = 'Bad Request'
            }
        }
    } else {
        apiResponse.message = 'Update data wrong'
        apiResponse.status = 'Bad Request'
    }
    return apiResponse
}
async function getDetailMessage(data) {
    let apiResponse = {}
    let chats = await mongodb.Chat.aggregate([
        { $match: { id: data.id } },
        { $unwind: { path: "$content", preserveNullAndEmptyArrays: true } },
        {
            $lookup:
                { from: "users", localField: "content.userId", foreignField: "id", as: "user" }
        },
        { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                "id": 1,
                "name": 1,
                "content": 1,
                "user": 1
            }
        },
        {
            $addFields: {
                "content.userName": "$user.name"
            }
        },
        {
            $group: {
                _id: '$id',
                id: { $first: '$id' },
                name: { $first: '$name' },
                content: {
                    $push: '$content'
                }
            }
        }
    ])
    if (chats.length) {
        apiResponse.data = chats[0]
        apiResponse.status = 'OK'
    } else {
        apiResponse.message = 'Update data wrong'
        apiResponse.status = 'Bad Request'
    }
    return apiResponse
}
async function getFirebase(data) {
    let apiResponse = {}
    let users = await mongodb.User.find({ id: data.id }).lean()
    if (users.length) {
        let user = users[0]
        if (user.firebaseToken) {
            const tokens = await firebase.getAccessToken(user.firebaseToken)
            apiResponse.data = tokens
            apiResponse.status = 'OK'
        } else {
            apiResponse.message = 'This account has not registered firebase token'
            apiResponse.status = 'Bad Request'
        }
    } else {
        apiResponse.message = 'Update data wrong'
        apiResponse.status = 'Bad Request'
    }
    return apiResponse
}
module.exports = {
    getAll, createChat, sendMessage, getDetailMessage, getFirebase
}