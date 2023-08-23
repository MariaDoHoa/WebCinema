import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import "./App.scss"
import MovieSoon from './Components/MovieSoon/MovieSoon';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import MovieTicketId from './Components/MovieTicketId/MovieTicketId';
import MovieTicketIdSoon from './Components/MovieTicketId/MovieTicketIdSoon';
import Ticket from './Components/Ticket/Ticket';
import TicketCenima from './Components/Ticket/TicketCenima';
import SelectionTicket from './Components/Ticket/SelectionTicket/SelectionTicket';
import SelectionSeat from './Components/Ticket/SelectionSeat/SelectionSeat';
import Payment from './Components/Payment/Payment';
import Success from './Components/Payment/Success';
import PrivateRoute from './Components/Common/PrivateRoute';
import User from './Components/Profile/User';
import UpdateUser from './Components/Profile/UpdateUser';
import MovieNow from './Components/MovieNow/MovieNow';
import History from './Components/Profile/History';
import Paymento from './Components/Payment/Paymento';
import UpdatePass from './Components/Profile/UpdatePass';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Search from './Components/Searching/Search';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='moviesoon' element={<MovieSoon />} />
          <Route path='movienow' element={<MovieNow />} />
          <Route path='movieticketid' element={<MovieTicketId />} />
          <Route path='movieticketidsoon' element={<MovieTicketIdSoon />} />
          <Route path='ticket' element={<Ticket />} />
          <Route path='ticketcenima' element={<TicketCenima />} />
          <Route path='search/:searchKeyword' element={<Search />} />
          {/* <Route path='selectionticket' element={<PrivateRoute><SelectionTicket /></PrivateRoute>} />
          <Route path='selectionseat' element={<PrivateRoute><SelectionSeat /></PrivateRoute>} />
          <Route path='payment' element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path='success' element={<PrivateRoute><Success /></PrivateRoute>} /> */}
          <Route path='user' element={<PrivateRoute><User /></PrivateRoute>} />
          <Route path='updateuser' element={<PrivateRoute><UpdateUser /></PrivateRoute>} />
          <Route path='updatepass' element={<PrivateRoute><UpdatePass /></PrivateRoute>} />

          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='user' element={<User />} />

          <Route path='selectionticket' element={<PrivateRoute><SelectionTicket /></PrivateRoute>} />
          <Route path='selectionseat' element={<PrivateRoute><SelectionSeat /></PrivateRoute>} />
          <Route path='payment' element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path='paymento' element={<PrivateRoute><Paymento /></PrivateRoute>} />
          <Route path='success' element={<PrivateRoute><Success /></PrivateRoute>} />
          <Route path='history' element={<PrivateRoute><History /></PrivateRoute>} />


        </Routes>
        
        <Footer />
        <ScrollToTop/>
      </BrowserRouter>
    </div>
  )
}
