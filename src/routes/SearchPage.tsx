import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SearchParamsProvider from "../contexts/SearchContext";
import SearchFilter from "../components/SearchFilter";
import SearchResults from "../components/SearchResults";

const SearchPage: React.FC = () => {
  return (
    <SearchParamsProvider>
      <Container className="pt-24px">
        <Row>
          <Col md={4}>
            <SearchFilter />
          </Col>
          <Col>
            <SearchResults />
          </Col>
        </Row>
      </Container>
    </SearchParamsProvider>
  );
};

export default SearchPage;
