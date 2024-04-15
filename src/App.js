import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Chart from './Chart'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './App.css';

function App() {
  const [value, setValue] = useState(dayjs());
  const [backendResponse, setBackendResponse] = useState([]);
  const [showSecondDivision, setShowSecondDivision] = useState(false);
  const [showForm, setForm] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  let content = "content";
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
  const postFun = async (formdata) => {
    try {
      console.log("form data" + formdata.event, formdata.date)
      const response = await axios.post('https://localhost:7299/api/APIscontoller/Post', formdata);//https://localhost:7299/api/APIscontoller/Post'
      console.log("response " + response.data);
    }
    catch (error) {
      console.log("error at posting the event" + error.message);
    }
    finally {
      handleClose();
    }
  }


  //getting the events
  // let handleButtonClick;

  let handleButtonClick = async (data) => {
    try {
      console.log(data.$d);
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      // Set the response data in the state
      // response.data=response.data;
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
      console.log(postdata.date+postdata.events);
      // let date2=[];
      let {date,events}=postdata;
    const response=await axios.delete(`https://localhost:7299/api/APIscontoller/Remove?curDate=${date}&curEvents=${events}`);
    console.log("event removed successfully",response);
  const remove = async (postdata) => {
    try {
      const response = await axios.post("delurl", postdata)
      console.log("response", response.data);
    }
    catch(error){
      console.log("error while removing the event"+error.message);
    catch (error) {
      console.log("error while removing the event");
    }

  }

  //update
  const update=async(postdata)=>{
    try{
      console.log(postdata);
    const response=await axios.put(`https://localhost:7299/api/APIscontoller/Update?curDate=${postdata.date}&curEvents=${postdata.event}&newDate=${postdata.date}&newEvents=${postdata.events}`)
    console.log("response",response.data);
  const update = async (postdata) => {
    try {
      const response = await axios.post("delurl", postdata)
      console.log("response", response.data);
    }
    catch(error){
      console.log("error while removing the event"+error.message);
    catch (error) {
      console.log("error while removing the event");
    }

  }



  return (
    <div className="primary_container">
      <div className="secondary_container" >
        <div className="left">
          <LocalizationProvider id='cal' dateAdapter={AdapterDayjs} className="calander">
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
        <div className="right">
          {backendResponse?.map((ele, index) =>
            <div className="right_child" key={index}>
              <div className="right_child_content">
                {ele.userId}
                {ele.title}
              </div>
              <div className="right_child_button">
                <button className='btn btn-danger p1' onClick={() => remove(ele)}>remove </button>
                <button className='btn btn-warning p1 ' onClick={() => update(ele)}>update </button>
              </div>
            </div>
          )
          }
        </div>
      </div>

      <Button variant="primary" className="btn btn-primary " style={{ display: 'block', margin: 'auto' }} onClick={handleShow}>
        addevent
      </Button>

      <Modal show={show} onHide={handleClose} className='AddEvent'>
        <Modal.Header closeButton className='CloseButton'>
          <Modal.Title>Post Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='AddEventForm' onSubmit={handleSubmit(postFun)}>
          <div className='form-group'>
            <label htmlFor="date">Date:</label>
            <input type="date" {...register('date', { required: true })} />
          </div>
          <div className='form-group'>
            <label htmlFor="start-time">Start Time:</label>
            <input type="time" {...register('start-time', { required: true })} />
          </div>
          <div className='form-group'>
            <label htmlFor="end-time">End Time:</label>
            <input type="time" {...register('end-time', { required: true })} />
          </div>
          <div className='form-group'>
            <label htmlFor="event">Event:</label>
            <input type="text" {...register('event', { required: true })} />
          </div>
          <button className="btn btn-success p1" type='submit'>Submit</button>
        </form>
      </Modal.Body>
    </Modal>
    </div >
  );
}

export default App;
