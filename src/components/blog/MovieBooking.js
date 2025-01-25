import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TicketBooking = () => {
  const user = useSelector((store) => store.auth.user);
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const yourDate = searchParams.get('date');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user, navigate]);

  const ticketOptions = Array.from({ length: 50 }, (_, i) => (i + 1).toString());

  const toggleTicketSelection = (ticketNumber) => {
    setSelectedTickets((prev) => {
      if (prev.includes(ticketNumber)) {
        return prev.filter((t) => t !== ticketNumber);
      } else {
        return [...prev, ticketNumber];
      }
    });
  };

  const sendConfirmationEmail = async (booking_id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/email/${postId}/`, 
        { user_email: user.email }, 
        { headers: { Authorization: `Token ${user.token}` } }
      );
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const handleBookTicket = async () => {
    setIsBooking(true);
    setResponseMessage(null);
    setErrorMessage(null);
    try {
      const totalTickets = selectedTickets.length;
      if (totalTickets === 0) {
        throw new Error('Please select at least one ticket.');
      }
      const response = await axios.post(
        `http://127.0.0.1:8000/start-payment/${postId}/`,
        { tickets: totalTickets, date: yourDate },
        {
          headers: { Authorization: `Token ${user.token}` },
        }
      );
      console.log('Payment Response:', response.data);
      const { booking_id, razorpay_order_id, amount } = response.data;
      const options = {
        key: 'rzp_test_vGO74K8m0Nbhdd',
        amount: amount * 100,
        currency: 'INR',
        order_id: razorpay_order_id,
        name: 'Ticket Booking',
        description: 'Book movie tickets',
        handler: async (paymentResponse) => {
          const { razorpay_payment_id } = paymentResponse;
          console.log('Payment Success:', paymentResponse);
          await axios.post('http://127.0.0.1:8000/handle-payment-success/', 
            { razorpay_order_id, razorpay_payment_id },
            { headers: { Authorization: `Token ${user.token}` } }
          );

          await sendConfirmationEmail(booking_id);
          setResponseMessage('Booking Successful');
        },
        theme: {
          color: '#3399cc',
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(
        error.response?.data?.error || error.message || 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className='moveee'>
      <div className='nishi' style={styles.container}>
        <br/><br/><br/>
        <h2 style={styles.heading}>BOOK YOUR TICKETS</h2>
        <div style={styles.ticketOptions}>
          {ticketOptions.map((option) => (
            <button 
              key={option} 
              onClick={() => toggleTicketSelection(option)} 
              style={{ 
                ...styles.ticket, 
                backgroundColor: selectedTickets.includes(option) ? '#3399cc' : '#f9f9f9', 
                color: selectedTickets.includes(option) ? '#fff' : '#000', 
              }}>
              {option}
            </button>
          ))}
        </div>
        <div style={styles.paymentButtonContainer}>
          <button onClick={handleBookTicket} style={styles.payButton} disabled={isBooking}>
            BOOK TICKETS
          </button>
        </div>
        {responseMessage && <div style={styles.responseMessage}>{responseMessage}</div>}
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '0 auto',
    maxWidth: 600,
  },
  heading: {
    textAlign: 'center',
    color: 'red',
  },
  ticketOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ticket: {
    margin: 5,
    padding: '10px 15px',
    border: '2px solid red',
    cursor: 'pointer',
  },
  paymentButtonContainer: {
    marginTop: 20,
    textAlign: 'center',
  },
  payButton: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: 'red',
    color: 'white',
    fontSize: 16,
    cursor: 'pointer',
  },
  responseMessage: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    color: 'green',
  },
  errorMessage: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
};

export default TicketBooking;
