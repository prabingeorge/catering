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

/* Admin routes */
import { ADashboard } from "./Admin/Dashboard/Dashboard";
import { ACategories } from "./Admin/Categories/Categories";
import { ACategoriesList } from "./Admin/CategoriesList/CategoriesList";
import { ACategoriesListItems } from "./Admin/CategoriesListItems/CategoriesListItems";

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
          path="/product-order/:categoryListItemId"
          element={
            <>
              <Header />
              <Menu />
              <ProductOrder />
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