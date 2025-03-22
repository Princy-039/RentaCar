import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminSidebar from "./components/AdminSidebar";
import UserSidebar from "./components/UserSidebar"; // Import User Sidebar
import UserDashboard from "./components/UserDashboard";
import UserProfile from "./components/UserProfile";
import UserSwitchCar from "./components/UserSwitchCar";
import EntireCars from "./components/EntireCars";
import UserCancelCar from "./components/UserCancelCar";
import UserPaymentHistory from "./components/UserPaymentHistory";
import UserTerms from "./components/UserTerms";
import UserFeedback from "./components/UserFeedback";
import UserOffers from "./components/UserOffers";
import UserCarBooking from "./components/UserCarBooking";
import AdminOffers from "./components/AdminOffers";
import AdminBooking from "./components/AdminBooking";
import AdminSettings from "./components/AdminSettings";
import AdminReviews from "./components/AdminReviews";
import AdminPayment from "./components/AdminPayment";
import AdminUserView from "./components/AdminUserView";
import AdminCarlist from "./components/AdminCarlist";
import AdminDashboard from "./components/AdminDashboard";
import AdminNotification from "./components/AdminNotification";
import AdminBlog from "./components/AdminBlog";
import AdminFeedback from "./components/AdminFeedback";
import AdminSwitchCars from "./components/AdminSwitchCars";
import AdminCancel from "./components/AdminCancel";
import AvailableCars from "./components/AvailableCars";
import UserAvailableCars from "./components/UserAvailableCars";
import UserPaymentPage from "./components/UserPaymentPage";
import Forgot from "./components/Forgot";
import Reset from "./components/Reset";
import UserConfirmation from "./components/UserConfirmation";
import UserNotification from "./components/UserNoification";

function AppContent() {
  const location = useLocation();

  // Define routes where Sidebar should NOT appear
  const hideSidebarRoutes = ["/", "/login", "/signup"];

  // Define admin and user route prefixes
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute = location.pathname.startsWith("/user") 

  // Show Sidebar only on user and admin pages
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div style={{ display: "flex" }}>
      {showSidebar && isAdminRoute && <AdminSidebar />}  {/* Show Admin Sidebar */}
      {showSidebar && isUserRoute && <UserSidebar />}   {/* Show User Sidebar */}
      
      <div style={{ marginLeft: showSidebar ? 240 : 0, padding: 20, flexGrow: 1, width: "100%" }}>
        <Routes>
          {/* Public Routes (No Sidebar) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Routes (With User Sidebar) */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/switch-car" element={<UserSwitchCar />} />
          <Route path="/user/car-collection" element={<EntireCars />} />
          <Route path="/user/cancel-car" element={<UserCancelCar />} />
          <Route path="/user/payment-history" element={<UserPaymentHistory />} />
          <Route path="/user/terms" element={<UserTerms />} />
          <Route path="/user/feedback" element={<UserFeedback />} />
          <Route path="/user/offers" element={<UserOffers />} />
          <Route path="/user/book-car" element={<UserCarBooking />} />
          <Route path="/useravailable-cars" element={<UserAvailableCars />} />
          <Route path="/userpayment" element={<UserPaymentPage />} />
          <Route path="/user/notifications" element={<UserNotification />} />
          

          
          {/* Admin Routes (With Admin Sidebar) */}
          <Route path="/admin/cars" element={<AdminCarlist />} />
          <Route path="/admin/bookings" element={<AdminBooking />} />
          <Route path="/admin/customers" element={<AdminUserView />} />
          <Route path="/admin/payments" element={<AdminPayment />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/offers" element={<AdminOffers />} />
          <Route path="/admin/account" element={<AdminSettings />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/notifications" element={<AdminNotification />} />
          <Route path="/admin/blogs" element={<AdminBlog />} />
          <Route path="/admin/feedback" element={<AdminFeedback />} />
          <Route path="/admin/switch-car" element={<AdminSwitchCars />} />
          <Route path="/admin/cancel-bookings" element={<AdminCancel />} />
          <Route path="/available-cars" element={<AvailableCars />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/confirmation" element={<UserConfirmation />} />
          
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
