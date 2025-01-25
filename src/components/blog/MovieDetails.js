import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';

function MovieDetailsWithBooking() {
  const user = useSelector((store) => store.auth.user);
  const { postId } = useParams();
  const [post, setPost] = useState({ name: '', time: '', ticket_amount: '', description: '' });
  const [selectedDate, setSelectedDate] = useState("2024-05-13");
  const navigate = useNavigate();

  useEffect(() => {
    console.log('postId:', postId);
    if (user && user.token) {
      axios.get(`http://127.0.0.1:8000/view/${postId}/`, {
        headers: { Authorization: `Token ${user.token}` }
      })
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch movie details:", error);
      });
    }
  }, [postId, user]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className='nishu'>
      <Navbar />
      <div className="container justify-content-center movie">
        <div className="row ">
          <div className="col-12">
            <div className="card">
              <div className="card-header"><h3>MOVIE NAME : {post.name}</h3></div>
              <div className="card-header"><h3>MOVIE TIME : {post.time}</h3></div>
              <div className="card-header"><h3>MOVIE DETAILS : {post.description}</h3></div>
              <div className="card-header"><h3>TICKET AMOUNT : {post.ticket_amount}</h3></div>
              <div className='card-header'>
                <label className='card-header'>SELECT DATE: </label>
                <select style={{ width: "130px" }} className="form-control" id="selectDate" name="selectDate" value={selectedDate} onChange={handleDateChange}>
                  <option className="form-control" value="2024-05-16">May 16, 2024</option>
                  <option className="form-control" value="2024-05-17">May 17, 2024</option>
                  <option className="form-control" value="2024-05-18">May 18, 2024</option>
                  <option className="form-control" value="2024-05-19">May 19, 2024</option>
                  <option className="form-control" value="2024-05-20">May 20, 2024</option>
                </select>
              </div>
              <Link style={{ color: 'black' }} to={`/blog/post/${postId}?date=${selectedDate}`} className="btn btn-info float-right">BOOKING</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsWithBooking;
