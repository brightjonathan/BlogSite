const asyncHandler = require('express-async-handler');
const Tour = require('../ModelScheme/tourShema');
const mongoose = require('mongoose');

//@desc      created a tour
//@route    POST /tour
//@access    public
const createTour = asyncHandler( async (req, res)=>{
    const tour = req.body;

    const newTour = new Tour({
        ...tour,
        creator : req.userId,
        createdAt: new Date().toISOString()
    });

    await newTour.save();
    res.status(200).json(newTour);
});


//@desc      getting all tours
//@route    GET /tour
//@access    public
const getTour = asyncHandler( async (req, res)=>{
    
    const getall_Tours = await Tour.find();
    res.status(200).json(getall_Tours);
    
    //pagination
    //const { page } = req.query;
    // const limit = 6;
    // const startIndex = (Number(page) -1 ) * limit;
    // const total = await Tour.countDocuments({});
    // const tours = await Tour.find().limit(limit).skip(startIndex);

    // res.status(200).json({
    //     data: tours,
    //     currentPage: Number(page),
    //     totalTours: total,
    //     numberOfPages: Math.ceil(total / limit),
    //   });
});


//@desc      getting only one tour or blog
//@route    GET /tour
//@access    public
const get_one_tour = asyncHandler( async (req, res)=>{
    const {id} = req.params;
    const getone_Tours = await Tour.findById(id);
    res.status(200).json(getone_Tours)
});


//@desc      getting a users tour
//@route     GET /tour
//@access    private
const getToursByUser = asyncHandler( async (req, res)=>{
    const {id} = req.params;
    //if id does not exit
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404)
        throw new Error('user does not exit');
    };
    const _tours = await Tour.find({creator: id });
    res.status(200).json(_tours);
});


//@desc      deleting the users tour
//@route     DELETE /tour
//@access    private
const deleteTour = asyncHandler( async (req, res)=>{
    const {id} = req.params;
    //if id does not exit
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404)
        throw new Error('user does not exit');
    };
    await Tour.findByIdAndRemove(id);
    res.status(200).json({message: 'Tour deleted successfully'});
});

//@desc      UPDATING the users tour
//@route     PUT /tour
//@access    private
const UpdateTour = asyncHandler( async (req, res)=>{
    const {id} = req.params;
    const {title, description, creator, imageFile, tags} = req.body;

    //if id does not exit
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404)
        throw new Error('user does not exit');
    };

    const updatedTour = {
        creator,
        title,
        description,
        tags,
        imageFile,
        _id: id,
      };

    const _tour = await Tour.findByIdAndUpdate(id, updatedTour, { new: true });
    res.status(200).json(_tour);
});


//@desc      searching the users tour
//@route     GET /tour
//@access    public
const SearchTour = asyncHandler( async (req, res)=>{
    const { searchQuery } = req.query;
    const title = new RegExp(searchQuery, "i");
    const tours = await TourModal.find({ title });
    res.json(tours);
});


//@desc      searching the users tour By Tags
//@route     GET /tour
//@access    public
const SearchTourTags = asyncHandler( async (req, res)=>{
    const { tag } = req.params;
    const tours = await Tour.find({ tags: { $in: tag } });
    res.json(tours);
});


//@desc      getting related tour
//@route     POST /tour
//@access    public
const RelatedTours = asyncHandler( async (req, res)=>{
    const tags = req.body;
    const tours = await Tour.find({ tags: { $in: tags } });
    res.json(tours);
});


//@desc      likes functionality backend
//@route     POST /tour
//@access    public
const LikesTours = asyncHandler( async (req, res)=>{
    const { id } = req.params;

    if (!req.userId) {
        res.status(404)
        throw new Error('User is not authenticated');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404)
        throw new Error(`No tour exist with id: ${id}`);
    }
    
    //
    const tour = await Tour.findById(id);
    const index = tour.likes.findIndex((id) => id === String(req.userId));
    
    //
    if (index === -1) {
        tour.likes.push(req.userId);
      } else {
        tour.likes = tour.likes.filter((id) => id !== String(req.userId));
    };

    //
    const updatedTour = await Tour.findByIdAndUpdate(id, tour, {
        new: true,
      });

      res.status(200).json(updatedTour);

});




module.exports = {
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
};


