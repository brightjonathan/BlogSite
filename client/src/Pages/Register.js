import {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBSpinner,
  MDBCardGroup,
  MDBCardFooter,
  MDBValidation,
} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../Redux/Features/authSlice'



//setting initialState
const initialState = {
  Firstname: '',
  Lastname: '',
  email: '',
  password: '',
  comfirmPassword: ''
};


const Register = () => {

const [formValue, setFormValue] = useState(initialState);
const { firstName, lastName, email, password, comfirmPassword} = formValue;

//backend error message
const {loading, error} = useSelector((state)=>({...state.auth}));

//rendering in the browser based on condition
useEffect(()=>{
  error && toast.error(error)
},[error])

//dispatching our action
const navigate = useNavigate();
const dispatch = useDispatch();

  //submit functionality
  const handleSubmit = (e)=>{
    e.preventDefault()

    //checking if password match
    if(password !== comfirmPassword){
      return toast.error('password do not match')
    }
    //if all is correct dispatch
    if(email && password && firstName && lastName  && comfirmPassword){
      dispatch(register({formValue, navigate, toast}));
    }
  }

  
  //targeting the input
  const onInputChange = (e)=>{
    let {name, value} = e.target;
    setFormValue({...formValue, [name]: value})
  }


  return (
    <div
    style={{
      margin: "auto",
      padding: "15px",
      maxWidth: "450px",
      alignContent: "center",
      marginTop: "120px",
    }}
  >
    <MDBCard>
      <MDBIcon fas icon="user-circle" className="fa-2x"/>
      <h5>Sign Up</h5>
      <MDBCardBody>
        <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
        <div className='col-md-6'>
           <MDBInput
                label="First Name"
                type="text"
                name="firstName"
                value={firstName}
                onChange={onInputChange}
                required
                invalid='true'
                validation="Please provide your First name"
              />
           </div>
           
           <div className='col-md-6'>
           <MDBInput
                label="Last Name"
                type="text"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
                required
                invalid='true'
                validation="Please provide your Last name"
              />
           </div>

           <div className='col-md-12'>
           <MDBInput
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
                required
                invalid='true'
                validation="Please provide your email"
              />
           </div>
           <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
                required
                invalid='true'
                validation="Please provide your password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="confirm Password"
                type="password"
                name="comfirmPassword"
                value={comfirmPassword}
                onChange={onInputChange}
                required
                invalid='true'
                validation="Please provide your confirm password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                  {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />)}
                Register
              </MDBBtn>
            </div>
        </MDBValidation>
      </MDBCardBody>
      <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? login</p>
          </Link>
        </MDBCardFooter>
    </MDBCard>
    
    </div>
  )
}

export default Register


