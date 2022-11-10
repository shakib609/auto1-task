import { useContext } from "react";
import Container from "react-bootstrap/Container";
import CarDetailsCard from "../components/CarDetailsCard";
import { FavoritesContext } from "../contexts/FavoritesContext";

const FavoritesPage: React.FC = () => {
  const { savedCars } = useContext(FavoritesContext);

  return (
    <Container className="pt-24px">
      <h3 className="fz-18px fw-bold mb-24px">Saved Cars</h3>

      {savedCars.length === 0 && (
        <p className="fw-bold text-center fz-32px" style={{ marginTop: 150 }}>
          No cars saved yet!
        </p>
      )}

      {savedCars.map((car) => (
        <CarDetailsCard key={car.stockNumber} car={car} />
      ))}
    </Container>
  );
};

export default FavoritesPage;
