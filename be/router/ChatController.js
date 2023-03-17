const express = require('express');
const chatService = require('../service/ChatService')
const router = express.Router();
router.post('/all', async function (req, res) {
    let result = await chatService.getAll(req.body)
    res.send(result)
})
router.post('/create', async function (req, res) {
    let result = await chatService.createChat(req.body)
    res.send(result)
})
router.post('/detail', async function (req, res) {
    let result = await chatService.getDetailMessage(req.body)
    res.send(result)
})
router.put('/message', async function (req, res) {
    let result = await chatService.sendMessage(req.body)
    res.send(result)
})
router.post('/firebase', async function (req, res) {
    let result = await chatService.getFirebase(req.body)
    res.send(result)
})
module.exports = router