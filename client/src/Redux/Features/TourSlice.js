import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

//action for createTour
export const createTour = createAsyncThunk('tour/createTour', async({updatedTourData, navigate, toast}, {rejectWithValue}) =>{

    try {
        const response = await api.createTour(updatedTourData)
        toast.success('Tour added successfully')
        navigate('/')
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});


//action for the getTour
export const getTour = createAsyncThunk('tour/getTour', async( _, {rejectWithValue} ) =>{

    try {
        const response = await api.getTour()
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});

//action for the getting a specific tour or blog
export const get_oneTour = createAsyncThunk('tour/oneTour', async( id, {rejectWithValue} ) =>{

    try {
        const response = await api.get_one_tour(id);
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});

//action for getting a user tour or blog
export const get_userTour = createAsyncThunk('tour/userTour', async( userId, {rejectWithValue} ) =>{

    try {
        const response = await api.getByUser(userId)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});

//action for deleting a user tour or blog
export const deleteTour = createAsyncThunk('tour/deleteTour', async( {id, toast}, {rejectWithValue} ) =>{

    try {
        const response = await api.deleteTour(id);
        toast.success("Tour Deleted Successfully");
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});


//action for updating a user tour or blog
export const updateTour = createAsyncThunk('tour/updateTour', async( {id, updatedTourData, navigate, toast}, {rejectWithValue} ) =>{

    try {
        const response = await api.updateTour(updatedTourData, id);
        toast.success("Tour updated Successfully");
        navigate('/')
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});


//action for searching a user tour or blog
export const Search_Tour = createAsyncThunk('tour/searchTour', async( searchQuery, {rejectWithValue} ) =>{

  try {
      const response = await api.TourSearch(searchQuery)
      return response.data
  } catch (err) {
      return rejectWithValue(err.response.data)
  }
});


//action for searching a user tags
export const Search_Tags = createAsyncThunk('tour/searchTags', async( tag, {rejectWithValue} ) =>{

  try {
      const response = await api.TourSearchTag(tag);
      return response.data;
  } catch (err) {
      return rejectWithValue(err.response.data);
  }
});


//action for RelatedTours 
export const RelatedTours = createAsyncThunk('tour/RelatedTour', async( tags, {rejectWithValue} ) =>{

  try {
      const response = await api.Related_Tours(tags)
      return response.data;
  } catch (err) {
      return rejectWithValue(err.response.data);
  }
});

//action for for Likes
export const Likes_Tours = createAsyncThunk('tour/LikesTour', async( {_id}, {rejectWithValue} ) =>{

  try {
      const response = await api.likeTour( _id );
      return response.data;
  } catch (err) {
      return rejectWithValue(err.response.data);
  }
});


//created a slice store
const TourSlice = createSlice({
    name: 'tour',
    initialState: {
        tour: {}, // for a specific blog ot tour {tour/:id}
        tours:[], // for all tours {Home page}
        userTours: [], //for userBlog which is private //dashboard page
        tagTours: [], //tags 
        relatedTours: [], //related tours
        error: '',
        loading: false
    },
    extraReducers: {
        //createTour
        //if pending then true
        [createTour.pending]: (state, action)=>{
          state.loading = true
        },

        //if fulfilled than false
        [createTour.fulfilled]: (state, action) =>{
         state.loading = false;
         state.tours = [action.payload];
        },
        [createTour.rejected]: (state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
       
        //getTour
         //if pending then true
         [getTour.pending]: (state, action)=>{
            state.loading = true
          },
  
          //if fulfilled than false
          [getTour.fulfilled]: (state, action) =>{
           state.loading = false;
           state.tours = action.payload;
          },
          [getTour.rejected]: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
          },

          //getting one tour or blog
         //if pending then true
         [get_oneTour.pending]: (state, action)=>{
            state.loading = true
          },
  
          //if fulfilled than false
          [get_oneTour.fulfilled]: (state, action) =>{
           state.loading = false;
           state.tour = action.payload;
          },
          [get_oneTour.rejected]: (state, action)=>{
            state.loading = false;
            state.error = action.payload.message;
          },


           //getting the user tour or blog
         //if pending then true
         [get_userTour.pending]: (state, action)=>{
            state.loading = true
          },
  
          //if fulfilled than false
          [get_userTour.fulfilled]: (state, action) =>{
           state.loading = false;
           state.userTours = action.payload;
          },
          [get_userTour.rejected]: (state, action)=>{
            state.loading = false;
            state.error = action.payload.message;
          },


            //deleting the user tour or blog
         //if pending then true
         [deleteTour.pending]: (state, action)=>{
            state.loading = true;
          },
  
          //if fulfilled than false
          [deleteTour.fulfilled]: (state, action) =>{
           state.loading = false;
           const {
            arg: { id },
          } = action.meta;
          if (id) {
            state.userTours = state.userTours.map((item) =>
              item._id === id ? action.payload : item
            );
            state.tours = state.tours.map((item) =>
              item._id === id ? action.payload : item
            );
          }
        },
          [deleteTour.rejected]: (state, action)=>{
            state.loading = false;
            state.error = action.payload.message;
          },


           //deleting the user tour or blog
         //if pending then true
          [updateTour.pending]: (state, action) => {
            state.loading = true;
          },
          [updateTour.fulfilled]: (state, action) => {
            state.loading = false;
            const {
              arg: { id },
            } = action.meta;
            if (id) {
              state.userTours = state.userTours.map((item) =>
                item._id === id ? action.payload : item
              );
              state.tours = state.tours.map((item) =>
                item._id === id ? action.payload : item
              );
            }
          },
          [updateTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          },

          //searching the user tour or blog
         //if pending then true
          [Search_Tour.pending]: (state, action) => {
            state.loading = true;
          },
          [Search_Tour.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = action.payload;
          },
          [Search_Tour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          },

          //searching the user tags
         //if pending then true
          [Search_Tags.pending]: (state, action) => {
            state.loading = true;
          },
          [Search_Tags.fulfilled]: (state, action) => {
            state.loading = false;
            state.tagTours = action.payload;
          },
          [Search_Tags.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          },

          //searching the user tags
          //if pending then true
          [RelatedTours.pending]: (state, action) => {
            state.loading = true;
          },
          [RelatedTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.relatedTours = action.payload;
          },
          [RelatedTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          },


          [Likes_Tours.pending]: (state, action) => {},
          [Likes_Tours.fulfilled]: (state, action) => {
            state.loading = false;
            const {
              arg: { _id },
            } = action.meta;
            if (_id) {
              state.tours = state.tours.map((item) =>
                item._id === _id ? action.payload : item
              );
            }
          },
          [Likes_Tours.rejected]: (state, action) => {
            state.error = action.payload.message;
          },

    }
});

export default TourSlice.reducer;
