import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBCardGroup,
  } from "mdb-react-ui-kit";
  import { toast } from "react-toastify";
import { deleteTour, get_userTour } from '../Redux/Features/TourSlice';
import Spinner from '../Component/Spinner';

const DashBoard = () => {
    //access the user from the store
    const {user} = useSelector((state)=> ({...state.auth}));
    const {userTours, loading} = useSelector((state)=> ({...state.tour}));
    const userId = user?.result?._id;
    const dispatch = useDispatch();

    //
    useEffect(()=>{
      if(userId){
          dispatch(get_userTour(userId));
      }
    }, [userId, dispatch]);

    const handleDelete = (id) =>{
      if (window.confirm("Are you sure you want to delete this tour ?")) {
        dispatch(deleteTour({ id, toast }));
      }
    }

    //
    const excerpt = (str)=>{
        if (str?.length > 40) {
            str = str.substring(0, 45) + " ...";
          }
          return str; 
    };

    if (loading) {
      return <Spinner/>
    }

  return (
    <div
    style={{
      margin: "auto",
      padding: "120px",
      maxWidth: "900px",
      alignContent: "center",
    }}
  >
    {userTours.length === 0 && (
      <h3>No tour available with the user: {user?.result?.name}</h3>
    )}

     {userTours.length > 0 && (
        <>
          <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}
    
    {userTours &&
        userTours.map((item, index) => (
          <MDBCardGroup key={index}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {excerpt(item.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          key={index}
                          onClick={() => handleDelete(item._id)}
                        />
                      </MDBBtn>
                      <Link to={`/editTour/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>

  )
}

export default DashBoard
