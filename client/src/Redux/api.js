import axios from "axios";
const API = axios.create({baseURL: 'http://localhost:5000'});

//passing the verify token from the backend to the frontend
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
});

//ALL ENDPOINT ARE FROM THE BACKEND
//api for login and registration
export const signIn = (formData) => API.post("/users/signin", formData); //registering the user 
export const signUp = (formData) => API.post("/users/signup", formData); //logging in user 
export const googleSignIn = (result) => API.post("/users/googleSignIn", result); //register with google


export const createTour = (tourData) => API.post("/tour", tourData); //creating a tour or blog
export const getTour = () => API.get('/tour'); // getting all the blog
export const get_one_tour = (id) => API.get(`/tour/${id}`); //getting a single tour
export const getByUser = (userId) => API.get(`/tour/userTours/${userId}`); // getting a user tour
export const deleteTour = (id) => API.delete(`/tour/${id}`); //deleting a userTour or blog
export const updateTour = (updatedTourData, id) => API.patch(`/tour/${id}`, updatedTourData ); //updateing a userTour or blog

export const TourSearch = (searchQuery) => API.get(`/tour?searchQuery=${searchQuery}`);  //searching the tour  
export const TourSearchTag = (tag) => API.get(`/tour/tag/${tag}`); //searching through tags
export const Related_Tours = (tags)=> API.post(`/tour/relatedTours`, tags) //related tours endPoint
export const likeTour = (id) => API.patch(`/tour/like/${id}`); //likes tour endpoint

