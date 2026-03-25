import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductsList from "./components/ProductsList";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import PageNotFound from "./components/PageNotFound";
import CartPage from "./components/CartPage";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import { ModalProvider, useModal } from "./context/ModalContext";

function AppContent() {
  const { showSignUp, setShowSignUp, showLogin, setShowLogin } = useModal();

  return (
    <>
      {!showSignUp && !showLogin && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />}>
          <Route index element={<ProductsList />} />
          <Route path="list" element={<ProductsList />} />
        </Route>

        <Route path="/login" element={<LogIn />} />
        <Route path="/cart" element={<CartPage />} />

        {/* ✅ Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ✅ Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
      {showLogin && <LogIn onClose={() => setShowLogin(false)} />}
    </>
  );
}

function App() {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
}

export default App;
