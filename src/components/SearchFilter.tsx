import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { SearchContext } from "../contexts/SearchContext";

const SearchFilter: React.FC = () => {
  const { allColors, allManufacturers, searchParams, setSearchParams } =
    useContext(SearchContext);

  const [color, setColor] = useState(searchParams.color);
  const [manufacturer, setManufacturer] = useState(searchParams.manufacturer);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ color, manufacturer, page: 1 });
  };

  return (
    <Card className="rounded-0 border border-2">
      <Card.Body className="px-24px py-24px">
        <form onSubmit={handleSubmit}>
          <label htmlFor="color" className="mb-8px fz-14px">
            Color
          </label>
          <Form.Select
            aria-label="Color"
            className="mb-12px fz-18px rounded"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="">All car colors</option>
            {allColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </Form.Select>

          <label htmlFor="manufacturer" className="mb-8px fz-14px">
            Manufacturer
          </label>
          <Form.Select
            aria-label="Manufacturer"
            className="mb-12px fz-18px rounded"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          >
            <option value="">All manufacturers</option>
            {allManufacturers.map((manufacturer) => (
              <option key={manufacturer.name} value={manufacturer.name}>
                {manufacturer.name}
              </option>
            ))}
          </Form.Select>

          <div className="d-flex justify-content-end">
            <Button type="submit" className="bg-orange">
              Filter
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default SearchFilter;
