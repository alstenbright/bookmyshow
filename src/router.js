import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import Register from "./components/auth/register";
import App from "./App";
import Login from "./components/auth/Login";
import Admin from "./components/auth/Admin";
import MovieListitem from "./components/blog/MovieListitem";
import MovieDetails from "./components/blog/MovieDetails";
import List from './components/blog/List';
import MovieBooking from './components/blog/MovieBooking';
import PreBookings from './components/blog/PreBookings';




const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <Aboutus/> },
    { path: 'register', element: <Register/> },
    { path: 'login', element: <Login/> },
    { path: 'Admin', element: <Admin/> }, 
    { path: '/list', element: <List/> },
    { path: '/Pre', element: <PreBookings/> },
    { path:'/blog/posts/details', element:<MovieListitem/>},
    { path: 'blog/posts/:postId', element: <MovieDetails/>},
    { path: 'blog/post/:postId', element: <MovieBooking/>},
    
  
]);

export default router;
