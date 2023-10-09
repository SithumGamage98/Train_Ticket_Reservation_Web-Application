import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import GetAllTrain from './trainManagement/getAllTrain';
import UpdateTrain from './trainManagement/updateTrain';
import GetTrain from './trainManagement/getTrain';
import AddTrain from './trainManagement/addTrain';
import AddReservation from './trainReservationManagement/addReservation';
import GetAllReservation from './trainReservationManagement/getAllReservation';
import GetReservation from './trainReservationManagement/getReservation';
import UpdateReservation from './trainReservationManagement/updateReservation';
import SignIn from './UserManagement/signIn';
import Signup from './UserManagement/signUp';
import Profile from '../Components/UserManagement/Profile';
import { UserProvider } from './UserContext';
import UpdateProfile from './UserManagement/updateProfile';
import TravelerUser from './UserManagement/BackOfficeUser/TravellerUser';
import TravellerList from './UserManagement/TravelAgent/TravellerList';
import UpdateTraveller from './UserManagement/TravelAgent/UpdateTraveller';
import ViewTraveller from './UserManagement/TravelAgent/ViewTraveller';
import AddTraveller from './UserManagement/TravelAgent/AddTraveller';
import Navbar from '../Components/Dashboard/NavigationBar';
import Footer from './Dashboard/Footer';
import BackOfficeUserHome from './Dashboard/BackOfficeUserHome';
import TravelAgentHome from './Dashboard/TravelAgentHome';

const AppRouter = () => {
  const location = useLocation();

  const hideNavbarRoutes = ['/', '/signup'];
  const hideFooterRoutes = ['/', '/signup'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <Router>
      <UserProvider>
        {!shouldHideNavbar && <Navbar />}
        <Switch>
          <Route path="/listtrain" exact component={GetAllTrain} />
          <Route path="/view/:trainID" component={GetTrain} />
          <Route path="/update/:trainID" component={UpdateTrain} />
          <Route path="/addtrain" component={AddTrain}/>
          <Route path="/listreservation" component={GetAllReservation}/>
          <Route path="/makereservation" component={AddReservation}/>
          <Route path="/reservationview/:reservationID" component={GetReservation} />
          <Route path="/reservationupdate/:reservationID" component={UpdateReservation} />
          <Route path="/profile/:userId" component={Profile} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/" exact component={SignIn} />
          <Route path="/updateprofile/:userId" component={UpdateProfile} />
          <Route path="/traveluserstatus" component={TravelerUser} />
          <Route path="/listtraveluser" component={TravellerList} />
          <Route path="/updatetraveller/:userId" component={UpdateTraveller} />
          <Route path="/viewtraveller/:userId" component={ViewTraveller} />
          <Route path="/addtraveluser" component={AddTraveller} />
          <Route path="/backofficeuserdashboard" component={BackOfficeUserHome} />
          <Route path="/travelagentdashboard" component={TravelAgentHome} />
          <Route path="/footer" component={Footer} />
        </Switch>
        {!shouldHideFooter && <Footer />}
      </UserProvider>
    </Router>
  );
};

export default AppRouter;