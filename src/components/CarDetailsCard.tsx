import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

type TCarDetailsCardProps = {
  car: TCar;
};

const CarDetailsCard: React.FC<TCarDetailsCardProps> = ({ car }) => {
  return (
    <Card className="rounded-0 mb-12px">
      <Card.Body>
        <div className="d-flex align-items-center">
          <img
            src={car.pictureUrl}
            alt={`${car.manufacturerName} ${car.modelName}`}
            className="rounded-0 me-24px"
            width={150}
            height={120}
          />

          <div className="flex-grow-1">
            <h3 className="fw-bold fz-32px mb-12px">
              {car.manufacturerName} {car.modelName}
            </h3>
            <p className="mb-12px">
              Stock # {car.stockNumber} - {car.mileage.number}{" "}
              {car.mileage.unit} - {car.fuelType} - {car.color}
            </p>
            <p className="mb-0">
              <Link to={`/details/${car.stockNumber}`}>View Details</Link>
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarDetailsCard;
