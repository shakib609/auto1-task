import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import apiManager from "../services/apiManager";
import ErrorPage from "./ErrorPage";
import favoritesManager from "../services/favoritesManager";

const CarDetailsPage: React.FC = () => {
  const { stockNumber } = useParams();
  const parsedStockNumber = Number(stockNumber);
  const [car, setCar] = useState<TCar | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiManager
      .getCarDetailsByStockId(parsedStockNumber)
      .then((data) => {
        setCar(data.car);
      })
      .catch((e) => {
        setError(e);
      });
  }, [parsedStockNumber]);

  if (error) {
    console.error(error);
    return <ErrorPage />;
  }

  return (
    <div>
      <div
        className="mb-12px"
        style={{
          backgroundImage: `url(${car?.pictureUrl})`,
          minHeight: 240,
          backgroundColor: "#ededed",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <Row className="mx-auto pt-24px" style={{ maxWidth: 800 }}>
        <Col className="ps-0">
          <h2 className="fw-bold fz-32px mb-12px">
            {car?.manufacturerName} {car?.modelName}
          </h2>

          <p className="mb-12px fz-18px">
            Stock # {car?.stockNumber} - {car?.mileage.number}{" "}
            <span className="text-uppercase">{car?.mileage.unit}</span> -{" "}
            {car?.fuelType} -{" "}
            <span className="text-capitalize">{car?.color}</span>
          </p>

          <p className="mb-0 fz-14px">
            This car is currently available and can be delivered as soon as
            tomorrow morning. Please be aware that delivery times shown in this
            page are not definitive and may change due to bad weather
            conditions.
          </p>
        </Col>

        <Col md={5} className="pe-0">
          <Card className="rounded-0 px-12px py-12px border border-2">
            <Card.Body>
              <p className="mb-8px fz-14px">
                If you like this car, click the button and save it in your
                collection of favorite items.
              </p>
              <div className="d-flex justify-content-end">
                <Button
                  bsPrefix="auto-btn"
                  onClick={() => {
                    if (car) favoritesManager.addToFavorites(car);
                  }}
                >
                  Save
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CarDetailsPage;
