import React from "react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {centerPosition} from './styles/componentsStyle';

/**
 * Component Loading to show Loading Spinner
 * return JSX contain Loading Spinner
 */
class Loading extends React.Component {
  render() {
    return (
      <div
        style={centerPosition}
      >
        <Spinner animation="grow" variant="primary" size="md" />
      </div>
    );
  }
}

export default Loading;
