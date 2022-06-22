import React, { Children } from 'react'
import { useSelector } from "react-redux";
import LoadingToRedirect from './LoadingToRedirect';

//securing the router using this method
const PrivateRouter = ({ children }) => {

const { user } = useSelector((state) => ({ ...state.auth }));
return user ? children : <LoadingToRedirect/>;

}

export default PrivateRouter;
