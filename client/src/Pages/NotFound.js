import React from 'react'
import notFound from '../Assests/404.jpg'
import {
  MDBCard,
  MDBCardImage,
 
} from "mdb-react-ui-kit";

const NotFound = () => {
  return (
    <div>
         <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", height: "600px" }}
            src={notFound}
            alt= '404'
          />
          </MDBCard>
    </div>
  )
}

export default NotFound







