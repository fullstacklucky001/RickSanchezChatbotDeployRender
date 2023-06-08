const express = require("express")
const { login } = require("../controllers/authController.js")
const { init, getTTS } = require("../controllers/fakeYouController.js")
const {
    insertUserMessage,
    insertRickMessage,
    getMessages,
    deleteMessage,
    getPrompts,
    activePrompt,
    updatePrompt
} = require("../controllers/chatGptController.js")

const router = express.Router();

router.post("/login", login);
router.post("/tts_init", init);
router.post("/get_tts", getTTS);
router.post("/insert_user_message", insertUserMessage);
router.post("/insert_rick_message", insertRickMessage);
router.post("/delete_message", deleteMessage);

router.get("/get_messages", getMessages);
router.post("/active_prompt", activePrompt);
router.post("/update_prompt", updatePrompt);


// prompts
router.get("/get_prompts", getPrompts);

module.exports = router;