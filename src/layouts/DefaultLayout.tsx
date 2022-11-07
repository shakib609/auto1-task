import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type TDefaultLayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<TDefaultLayoutProps> = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
