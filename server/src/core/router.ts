import authController from "$server/controllers/auth.controller.js";
import wordController from "$server/controllers/word.controller.js";
import authMiddleware from "$server/middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.get("/log-in", authController.logIn_GET);
router.post("/log-in", authController.logIn_POST);
router.post("/log-out", authController.logOut);

router.get("/", wordController.home);
router.get("/words/:language", wordController.viewWords);
router.get("/words/:language/random-word", wordController.randomWord);
router.get("/word", wordController.idMiddleware, wordController.viewWord);
router.get("/word/add", wordController.addWord_GET);
router.post("/word/add", wordController.addWord_POST);
router.get("/word/update", wordController.idMiddleware, wordController.updateWord_GET);
router.patch("/word/update", wordController.idMiddleware, wordController.updateWord_PATCH);
router.delete("/word/delete", wordController.idMiddleware, wordController.deleteWord);

export default router;