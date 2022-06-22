import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBContainer,
    MDBIcon,
    MDBBtn,
  } from "mdb-react-ui-kit";
import { get_oneTour, RelatedTours } from '../Redux/Features/TourSlice';
import ToursRelated from '../Component/ToursRelated';
import DisqusThread from '../Component/DisqusThread';


const SingleTour = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {tour, relatedTours} = useSelector((state)=> ({...state.tour}));
    const {id} = useParams();
    
    //targeting the tag in the database
    const tags = tour?.tags;

    useEffect(()=>{
       tags && dispatch(RelatedTours(tags));
    },[tags])

    useEffect(()=>{
        if(id){
          dispatch(get_oneTour(id));
        }
    },[id])



  return (
    <>
    <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", height: "600px" }}
            src={tour.imageFile}
            alt={tour.title}
          />

          <MDBCardBody>
          <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {tour.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
         <ToursRelated relatedTours={relatedTours} tourId={id} />
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} />
      </MDBContainer>
    </>
  )
}

export default SingleTour
