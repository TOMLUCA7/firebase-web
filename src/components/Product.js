import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";

const Product = (props) => {
  // const [] = useState("");

  return (
    <Col lg={4}>
      <Card style={{ width: "18rem", marginTop: 10 }}>
        <Card.Img
          variant="top"
          style={{ height: 250 }}
          src={props.product.productImage}
        />
        <Card.Body>
          <Card.Title>
            {props.product.productName} - {props.product.productPrice} ₪
          </Card.Title>
          <Card.Text>{props.product.productDescription}</Card.Text>
          {/* <Button variant="primary">Edit</Button> */}
          <Button
            style={{ marginLeft: 10 }}
            variant="danger"
            onClick={props.deleteThisProduct}
          >
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
