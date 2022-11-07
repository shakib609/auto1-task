import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BSNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  return (
    <BSNavbar expand="md" className={styles.navbar}>
      <Container>
        <BSNavbar.Brand as={Link} to="/">
          <img
            alt="Auto1.com"
            src={logo}
            height="40"
            className="d-inline-block align-center"
          />
        </BSNavbar.Brand>
        <BSNavbar.Toggle />
        <BSNavbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link
              role="link"
              className={styles.navLink}
              as={Link}
              to="/"
              aria-describedby="purchase-link"
            >
              <span id="purchase-link">Purchase</span>
            </Nav.Link>
            <Nav.Link
              className={styles.navLink}
              as={Link}
              to="/favorites"
              aria-describedby="my-orders-link"
            >
              <span id="my-orders-link">My Orders</span>
            </Nav.Link>
            <Nav.Link
              className={styles.navLink}
              as={Link}
              to="/sell"
              aria-describedby="sell-link"
            >
              <span id="sell-link">Sell</span>
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
