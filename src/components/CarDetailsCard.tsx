import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

type TCarDetailsCardProps =
  | {
      car: TCar;
      loading?: boolean;
    }
  | {
      car?: TCar;
      loading: boolean;
    };

const CarDetailsCard: React.FC<TCarDetailsCardProps> = ({ car, loading }) => {
  return (
    <Card className="mb-12px border border-2 rounded-0">
      <Card.Body>
        <div className="d-flex align-items-center">
          {loading && (
            <div
              className="bg-gray me-24px"
              style={{ width: 150, height: 120 }}
            ></div>
          )}

          {car && (
            <img
              src={car?.pictureUrl}
              alt={`${car?.manufacturerName} ${car?.modelName}`}
              width={150}
              height={120}
              className="me-24px"
            />
          )}

          <div className="flex-grow-1">
            {loading && (
              <div className="justify-self-start">
                <div className="py-24px bg-gray mb-8px" />
                <div className="py-12px bg-gray mb-12px" />
                <div className="py-12px bg-gray mb-0 w-25"></div>
              </div>
            )}
            {car && (
              <>
                <h3 className="fw-bold fz-32px mb-12px">
                  {car.manufacturerName} {car.modelName}
                </h3>
                <p className="mb-12px">
                  Stock # {car.stockNumber} - {car.mileage.number}{" "}
                  <span className="text-uppercase">{car.mileage.unit}</span> -{" "}
                  {car.fuelType} - {car.color}
                </p>
                <p className="mb-0">
                  <Link to={`/details/${car.stockNumber}`}>View Details</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarDetailsCard;
