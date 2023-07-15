import axios from "axios";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import './App.css';
import AddTechnicians from "./Components/Dashboard/AddTechnicians/AddTechnicians";
import Spinner from "./Components/HomeComponents/Spinner/Spinner";
import Tech from "./Components/HomeComponents/Technicians/Technician";
//import StripePayment from "./Components/Dashboard/StripePayment/StripePayment";
import { getDecodedUser } from "./Components/LoginAuth/LoginManager";
import NotFound from './Components/NotFound/NotFound';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
const Dashboard = lazy(() => import ('./Pages/Dashboard'));
const Home = lazy(() => import ('./Pages/Home'));
const Login = lazy(() => import ('./Pages/Login'));



export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState(getDecodedUser());
  const [selectedService, setSelectedService] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);



  useEffect(() => {
    axios
			.get(`http://localhost:5000/isAdmin?email=${loggedInUser?.email}`)
			.then((res) => {
				setIsAdmin(res.data);
				setAdminLoading(false);
			})
			.catch((error) => toast.error(error.message));
  }, [loggedInUser?.email]);


  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isAdmin, selectedService, setSelectedService ,selectedTechnician,setSelectedTechnician}}>
      <ScrollToTop smooth />
      <Router>
      <Toaster />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <PrivateRoute path='/dashboard/:panel'>
            <Dashboard adminLoading={adminLoading} />
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/tech'>
            <Tech />
          </Route>
          {/* <Route path='/stripePayment'>
            <StripePayment />
          </Route> */}
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;


