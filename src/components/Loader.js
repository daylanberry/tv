import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => (
  <div style={{textAlign: 'center'}}>
    <Spinner animation="grow" variant="danger" />
    <Spinner animation="grow" variant="warning" />
    <Spinner animation="grow" variant="info" />
    <Spinner animation="grow" variant="light" />
  </div>
);

export default Loader;