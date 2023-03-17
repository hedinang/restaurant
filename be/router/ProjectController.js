const express = require('express');
const projectService = require('../service/ProjectService')
const router = express.Router();
router.post('/get/:userId', async function (req, res) {
    let result = await projectService.get(req.params.userId);
    res.send(result)
})
router.get('/all', async function (req, res) {
    let result = await projectService.getAll()
    res.send(result)
})
router.post('/login', async function (req, res) {
    let result = await projectService.login(req.body)
    res.send(result)
})
router.post('/initial', async function (req, res) {
    let result = await projectService.initial(req.body)
    res.send(result)
})
router.post('/create', async function (req, res) {
    let result = await projectService.createUser(req.body)
    res.send(result)
})
router.put('/update', async function (req, res) {
    let result = await projectService.updateUser(req.body)
    res.send(result)
})
router.delete('/delete/:userId', async function (req, res) {
    let result = await projectService.deleteUser(req.params.userId)
    res.send(result)
})
router.put('/firebase/update', async function (req, res) {
    let result = await projectService.updateFirebaseToken(req.body)
    res.send(result)
})
module.exports = router