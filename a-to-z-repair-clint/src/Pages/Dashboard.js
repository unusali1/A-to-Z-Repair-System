import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../App';
import AddAdmin from '../Components/Dashboard/AddAdmin/AddAdmin';
import AddServices from '../Components/Dashboard/AddService/AddServices';
import AddTechnicians from '../Components/Dashboard/AddTechnicians/AddTechnicians';
import AllAdmin from '../Components/Dashboard/AllAdmin/AllAdmin';
import AllReview from '../Components/Dashboard/AllReview/AllReview';
import Book from '../Components/Dashboard/Book/Book';
import DigitalPayment from '../Components/Dashboard/Book/DigitalPayment';
import CashOn from '../Components/Dashboard/Book/CashOn';
import StripePayment from '../Components/Dashboard/StripePayment/StripePayment';
import BookList from '../Components/Dashboard/BookList/BookList';
import ManageService from '../Components/Dashboard/ManageService/ManageService';
import NavBar from '../Components/Dashboard/NavBar/NavBar';
import OrderList from '../Components/Dashboard/OrderList/OrderList';
import Profile from '../Components/Dashboard/Profile/Profile';
import Review from '../Components/Dashboard/Review/Review';
import SideBar from '../Components/Dashboard/SideBar/SideBar';
import './Dashboard.css';
import MangeTechnicians from '../Components/Dashboard/ManageTechnicians/ManageTechnicians';


const Dashboard = ({adminLoading}) => {
    const { isAdmin } = useContext(UserContext);


    const {panel}=useParams()
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <main className="dashboard-container">
          <SideBar show={showSidebar} adminLoading={adminLoading} />
            <div  id="content">
               <NavBar setShowSidebar={setShowSidebar} show={showSidebar}  />
                {
                    panel === "profile" ?  <Profile />
                    :panel === 'book' ? <Book />
                    :panel === 'digitalPayment' ? <DigitalPayment />
                    :panel === 'stripePayment' ? <StripePayment />
                    :panel === 'cashOn' ? <CashOn />
                    :panel === "book-list" ? <BookList />
                    :panel === "reviews" ? <Review />
                    :panel === "add-services" && isAdmin ?  <AddServices />
                    :panel === "add-technicians" && isAdmin ?  <AddTechnicians />
                    :panel === "add-admins" && isAdmin  ? <AddAdmin />
                    :panel === "all-orders" && isAdmin ? <OrderList />
                    :panel === "manage-services" && isAdmin  ? <ManageService />
                    :panel === "manage-technicians" && isAdmin  ? <MangeTechnicians />
                    :panel === "all-reviews" && isAdmin  ? <AllReview />
                    :panel === "all-admins" && isAdmin  ? <AllAdmin />
                    : null
                }
            </div>
        </main>
    );
};

export default Dashboard;