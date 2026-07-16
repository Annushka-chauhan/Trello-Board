const express = require("express");

const {
    createBoard,
    getBoards,
    getBoardById
} = require("../controllers/boardController");

const {
    authMiddleware
} = require("../middleware/authMiddleware");

const router = express.Router();

// Create Board
router.post(
    "/board",
    authMiddleware,
    createBoard
);

// Get All Boards of an Organization
router.get(
    "/boards",
    authMiddleware,
    getBoards
);

// Get Single Board
router.get(
    "/board/:boardId",
    authMiddleware,
    getBoardById
);


module.exports = router;