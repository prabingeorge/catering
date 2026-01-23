import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { Home } from "./components/Home/Home";
import { Menu } from "./components/Menu/Menu";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRote";
import Unauthorized from "./pages/Unauthorized";
import AdminPanel from "./components/AdminPanel";
import Header from "./components/Header/Header";
import Registration from "./components/Users/Registration";
import CategoriesList from "./components/CategoriesList/CategoriesList";
import ProductOrder from "./components/ProductOrder/ProductOrder";
import ProductCart from "./components/ProductCart/ProductCart";
import ProductConfirmation from "./components/ProductConfirmation/ProductConfirmation";
import ProductDelivery from "./components/ProductDelivery/ProductDelivery";

import { ProductListTypes } from "./components/ProductListTypes/ProductListTypes";

/* Admin routes */
import { ADashboard } from "./Admin/Dashboard/Dashboard";
import { ACategories } from "./Admin/Categories/Categories";
import { ACategoriesList } from "./Admin/CategoriesList/CategoriesList";
import { ACategoriesListItems } from "./Admin/CategoriesListItems/CategoriesListItems";
import { ABookingHistory } from "./Admin/BookingHistory/BookingHistory";
import { ContactInformation } from "./components/ContactInformation/ContactInformation";
import { TermsOfService } from "./components/TermsOfService/TermsOfService";
import { PrivacyPolicy } from "./components/PrivacyPolicy/PrivacyPolicy";
import { EventInformations } from "./components/EventInformations/EventInformations";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Header />
          <Home />
        </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Menu />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/categories-list/:categoryListId"
          element={
            <>
              <Header />
              <Menu />
              <CategoriesList />
            </>
          }
        />
        <Route
          path="/productlisttypes/:categoryListItemId"
          element={
            <>
              <Header />
              <Menu />
              <ProductListTypes />
            </>
          }
        />
        <Route
          path="/productorder/:categoryListItemId"
          element={
            <>
              <Header />
              <Menu />
              <ProductOrder />
            </>
          }
        />
        <Route
          path="/eventinformations/:categoryListItemId"
          element={
            <>
              <Header />
              <Menu />
              <EventInformations />
            </>
          }
        />
        <Route
          path="/product-confirmation"
          element={
            <>
              <Header />
              <Menu />
              <ProductConfirmation />
            </>
          }
        />
        <Route
          path="/delivery"
          element={
            <ProtectedRoute>
              <Header />
              <Menu />
              <ProductDelivery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Header />
              <ProductCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <ProtectedRoute>
              <Header />
              <Registration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact-information"
          element={
            <>
              <Header />
              <Menu />
              <ContactInformation />
            </>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <>
              <Header />
              <Menu />
              <TermsOfService />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Header />
              <Menu />
              <PrivacyPolicy />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleBasedRoute role="admin">
              <AdminPanel />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <>
              <ADashboard />
            </>
          }
        />
        <Route
          path="/admin/bookinghistory"
          element={
            <>
              <ABookingHistory />
            </>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <>
              <ACategories />
            </>
          }
        />
        <Route
          path="/admin/categorieslist"
          element={
            <>
              <ACategoriesList />
            </>
          }
        />
        <Route
          path="/admin/categorieslistitems"
          element={
            <>
              <ACategoriesListItems />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;