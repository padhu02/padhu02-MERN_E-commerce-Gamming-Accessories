import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

import { Link, useLocation } from "react-router-dom";
import { FaCartShopping, FaStore } from "react-icons/fa6";

import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";

function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { setSearch } = useSearch();
  const { cartItems } = useCart();

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container fluid>
        {/* 🏪 SHOP NAME + ICON */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <FaStore size={22} />
          <span>Pirate's</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* 🔗 NAV LINKS */}
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/admin-login">Admin</Nav.Link>
          </Nav>

          {/* ❌ SEARCH & CART HIDDEN ON ENTRANCE PAGE */}
          {!isHomePage && (
            <Form className="d-flex align-items-center">
              {/* 🔍 SEARCH INPUT */}
              <Form.Control
                type="search"
                placeholder="Search products"
                className="me-2"
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button variant="outline-success">Search</Button>

              {/* 🛒 CART ICON */}
              <Link
                to="/cart"
                className="ms-3 position-relative text-decoration-none"
              >
                <FaCartShopping size={28} color="#4a5568" />
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}
              </Link>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
