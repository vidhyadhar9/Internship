import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Chart from './Chart'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './App.css';

function App() {
  const [value, setValue] = useState(dayjs());
  const [backendResponse, setBackendResponse] = useState([]);
  const [showSecondDivision, setShowSecondDivision] = useState(false);
  const [showForm,setForm]=useState(false);
  const {register,handleSubmit,formState}=useForm();
  let content="content";
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //posting the evnets
const postFun=async(formdata)=>
{
  try{
    console.log("form data"+formdata.event,formdata.date) 
    const response=await axios.post(`https://localhost:7299/api/APIscontoller/Post?date=${formdata.date}&events=${formdata.event}`);//https://localhost:7299/api/APIscontoller/Post'
    console.log("response "+response);
  }
  catch(error){
    console.log("error at posting the event"+error.message);
  }
  finally{
    handleClose();
  }
}


//getting the events
// let handleButtonClick;

   let handleButtonClick = async (data) => {
    try {
      console.log(data.$d);
      const response = await axios.get('https://localhost:7299/api/APIscontoller/GetAll');
      // Set the response data in the state
      setBackendResponse(response.data);
      setShowSecondDivision(true); // Show the second division upon button click
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };



  //function to remove evnet
  const remove=async(postdata)=>{
    try{
    const response=await axios.post("delurl",postdata)
    console.log("response",response.data);
    }
    catch(error){
      console.log("error while removing the event");
    }

  }

  //update
  const update=async(postdata)=>{
    try{
    const response=await axios.post("delurl",postdata)
    console.log("response",response.data);
    }
    catch(error){
      console.log("error while removing the event");
    }

  }



  return (
    <div className="container1 ">
    <div className="container border" >
        <div className="first">
          <LocalizationProvider id='cal' dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar']}>
              <DemoItem label="Todo calendar">
                <DateCalendar
                  value={value}
                  // onViewChange={()=>handleButtonClick()}
                   onChange={(newValue) => {
                    setValue(newValue);
                    handleButtonClick(newValue);
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="second border"
          style={{maxWidth:'50%', overflowX:'auto' ,margin:showSecondDivision ? '15px':'0'}}
        >
        {backendResponse?.map((ele,index) => 
       <div className="child">
              <div className="">
              {ele.events}
              </div>
         <div className="d-flex">
         <button className='btn btn-danger p-1' onClick={()=>remove(ele)}>remove </button>
         <button className='btn btn-info p-1' onClick={()=>update(ele)}>update </button>
         </div>
       </div>
        
        )
        }
        </div>
        {/* showing the form to add events*/}
       {/* { showForm&&
        <form action="" onSubmit={handleSubmit(()=>postFun())}>
        <label htmlFor="date">date</label>
        <input type="date"/>
        <label htmlFor="task">event</label>
        <input type="text"/>
        <button type='submit'>Submit</button>
        </form>
       } */}


{/* Modal */}

</div>

      <Button variant="primary" className="btn btn-primary " style={{display:'block' ,margin:'auto'}} onClick={handleShow}>
        addevent
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post Evnet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(postFun)}>
        <label htmlFor="date">date</label>
        <input
        type="date"
        {...register('date', { required: true })} // Register 'date' field
      />
        <label htmlFor="event">event</label>
        <input
        type="text"
        {...register('event', { required: true })} // Register 'event' field
      />
        <button className="btn btn-success" type='submit'>Submit</button>
        </form>
        </Modal.Body>
      </Modal>
  



       {/* <Chart/> */}



       
        {/* <button   onClick={()=>setForm(!showForm)}>add events</button> */}
    </div>
  );
}

export default App;
