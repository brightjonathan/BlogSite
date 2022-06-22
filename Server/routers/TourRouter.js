const express = require('express');
const router = express.Router();
const {verify} = require('../Middleware/verifyToken');
const {
    createTour, 
    getTour, 
    get_one_tour, 
    getToursByUser, 
    deleteTour, 
    UpdateTour,
    SearchTour,
    SearchTourTags,
    RelatedTours,
    LikesTours,
} = require('../Controllers/TourController');


router.post('/', verify, createTour);
router.get('/userTours/:id', verify, getToursByUser);
router.delete('/:id', verify, deleteTour);
router.patch('/:id', verify, UpdateTour);
router.patch('/like/:id', verify, LikesTours);


router.get('/', getTour);
router.get('/:id', get_one_tour);
router.get('/search', SearchTour);
router.get('/tag/:tag', SearchTourTags);
router.post("/relatedTours", RelatedTours);

module.exports= router;