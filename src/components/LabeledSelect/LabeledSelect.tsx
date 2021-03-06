import { ReactNode, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";

type LabeledSelectProps = {
  text?: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children?: ReactNode;
}

const idGenerator = function*() {
  let i = 0;
  while(true) {
    yield i++;
  }
}();

const getId = () => idGenerator.next().value;

export function LabeledSelect({text, value, onChange, disabled=false, children}: LabeledSelectProps) {

  const [id] = useState(getId());

  return (
    <Container>
      <Row>
        <Col xs="6" xl="auto">
          <label htmlFor={`LabeledSelect-${id}`} className="form-label col-form-label">{text}</label>
        </Col>
        <Col xs="6" xl="auto">
          <select id={`LabeledSelect-${id}`} className="form-select" value={value} onChange={onChange} disabled={disabled}>
            {children}
          </select>
        </Col>
      </Row>
    </Container>
  );
}