import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Aboutus() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1>About Us</h1>
                        <p>
                            Welcome to PVRINOX, the largest and most premium film exhibitor in India with 1744 screens across 112 cities (India and Sri Lanka) with 360 properties and an aggregate seating capacity of 3.60 lakh seats. Over the years, we have consistently increased our screen count, both organically and inorganically, through strategic investments and acquisitions which include ‘Cinemax Cinemas’ in November 2012, ‘DT Cinemas’ in May 2016, ‘SPI Cinemas’ in August 2018. We recently completed the merger with INOX Leisure Limited, which has added to our storied history of becoming game changers in the film exhibition industry for over 25 years and transforming the out of home entertainment in the country.
                        </p>
                        <p>
                            Our mission is to advance and reimagine the movie-going experience by continuing to reinvent ourselves in keeping up with the times and the ever-changing entertainment landscape to make our brand aspirational and accessible. We take pride in our strategically located cinemas and we continuously invest in introducing premium formats, comfortable seating, sound, projection, ambience, and food & beverage to meet evolving consumer expectations so that our patrons have a memorable experience every time they visit our cinemas.
                        </p>
                        <p>
                            Thank you for choosing PVR INOX Limited for your entertainment needs. We look forward to welcoming you to our cinemas.
                        </p>
                        <Link to="/" className="btn btn-info">Go Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutus;
