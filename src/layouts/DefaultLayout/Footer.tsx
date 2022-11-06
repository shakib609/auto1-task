import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer
      className={`d-flex justify-content-center align-items-center ${styles.footer}`}
    >
      <p className="my-0 px-3 text-center">&copy; AUTO1 Group 2018</p>
    </footer>
  );
};

export default Footer;
