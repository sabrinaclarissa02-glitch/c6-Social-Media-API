const express = require('express');
const router = express.Router();
const dmController = require('./dm-controller');

router.get('/conversations/:userId', dmController.getConversations);
router.get('/conversations/archived/:userId', dmController.getArchivedConversations);
router.get('/messages/:conversationId', dmController.getMessages);
router.get('/search/:userId', dmController.searchMessages);

router.post('/send', dmController.sendMessage);
router.post('/read', dmController.markAsRead);
router.post('/archive', dmController.archiveConversation);
router.post('/unarchive', dmController.unarchiveConversation);

module.exports = router;