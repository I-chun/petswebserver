const express           = require('express');
const router            = express.Router();
const petController     = require('../controllers/petController');
const userController    = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const { catchErrors }   = require('../handlers/errorHandlers');
const { catchRegisterErrors }   = require('../handlers/errorHandlers');


// ===========================
//      PETS ROUTES
// ===========================
//  INDEX ROUTE
router.get('/', catchErrors(petController.homePage));
router.get('/pets', catchErrors(petController.homePage));
//  NEW ROUTE
router.get('/pets/new', userController.isLoggedIn, petController.newPet);
//  CREATE ROUTE
router.post('/pets', userController.isLoggedIn, catchErrors(petController.createPet));
//  SHOW ROUTE
router.get('/pets/:id', catchErrors(petController.showPet));
//  EDIT ROUTE
router.get('/pets/:id/edit', userController.isOwner, catchErrors(petController.editPet));
//  UPDATE ROUTE
router.put('/pets/:id', userController.isOwner, catchErrors(petController.updatePet));
//  DELETE ROUTE
router.delete('/pets/:id', userController.isOwner, catchErrors(petController.deletePet));

// ===========================
//      COMMENTS ROUTES
// ===========================
// NEW COMMENT ROUTE
router.get("/pets/:id/comments/new", userController.isLoggedIn, commentController.newComment);
// CREATE COMMENT ROUTE
router.post('/pets/:id/comments', userController.isLoggedIn, catchErrors(commentController.createComment));
// EDIT COMMENT ROUTE
router.get('/pets/:id/comments/:comment_id/edit', userController.isCommentOwner, catchErrors(commentController.editComment));
// UPDATE COMMENT ROUTE
router.put('/pets/:id/comments/:comment_id', userController.isCommentOwner, catchErrors(commentController.updateComment));
// DELETE COMMENT ROUTE
router.delete('/pets/:id/comments/:comment_id', userController.isCommentOwner, catchErrors(commentController.deleteComment));

// ===========================
//      USER ROUTES
// ===========================
// REGISTER GET ROUTE
router.get("/register", userController.registerForm);
// REGISTER POST ROUTE
router.post("/register", userController.register, userController.login);

// LOGIN GET ROUTE
router.get("/login", userController.loginForm);
// LOGIN POST ROUTE
router.post("/login", userController.login);
// LOGOUT ROUTE
router.get("/logout", userController.logout);


module.exports = router;