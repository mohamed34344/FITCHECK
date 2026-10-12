import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking/OrderTracking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellerRegister from "./pages/Seller/SellerRegister";
import SellerDashboard from "./pages/Seller/SellerDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {

  return (
    <>
      
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/products/category/:category" element={<Products/>}></Route>
          <Route path="/products/:id" element={<ProductDetails/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>

          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
          <Route path="/order-confirmation/:id" element={<OrderConfirmation/>}></Route>
          <Route path="/order-tracking" element={<OrderTracking/>}></Route>
          <Route path="/order-tracking/:id" element={<OrderTracking/>}></Route>

          <Route path="/seller-register" element={<SellerRegister />}></Route>
          <Route path="/seller" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>}></Route>
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}></Route>
          
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
