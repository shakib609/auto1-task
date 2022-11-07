import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

import logo from "../assets/logo.png";
import styles from "./ErrorPage.module.css";

const ErrorPage: React.FC = () => {
  return (
    <Container className={styles.container}>
      <img src={logo} alt="Auto1.com" className={styles.logo} />
      <h1 className="fz-32px fw-bold mt-24px mb-12px">404 - Not Found</h1>
      <p className="fz-18px mb-12px">
        Sorry, the page you are looking for does not exist.
      </p>
      <p className="fz-18px">
        You can always go back to the <Link to="/">homepage</Link>.
      </p>
    </Container>
  );
};

export default ErrorPage;
