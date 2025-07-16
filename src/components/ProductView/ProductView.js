import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { useState, useEffect } from "react";
import "./style.css";

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const [product, setProduct] = useState({});

  const fetchProduct = async (id) => {
    try {
      if (!id) {
        console.error("Product ID undefined छ");
        return;
      }
      const response = await commerce.products.retrieve(id);
      console.log({ response });

      if (!response) {
        console.error("Product response undefined छ");
        return;
      }

      const { name, price, media, quantity, description } = response;

      setProduct({
        name: name || "Unknown Product",
        quantity: quantity || 0,
        description: description || "No description available",
        src: media?.source || "",
        price: price?.formatted_with_symbol || "N/A",
      });
    } catch (error) {
      console.error("Product fetch गर्दा error आयो:", error);
    }
  };

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[2];
    fetchProduct(id);
  }, []);

  return (
    <Container className="product-view">
      <Grid container>
        <Grid item xs={12} md={6} className="image-wrapper">
          {product.src ? (
            <img src={product.src} alt={product.name} />
          ) : (
            <div style={{ height: 300, backgroundColor: "#f0f0f0" }}>
              Image Not Available
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={5} className="text">
          <Typography variant="h2">
            <b>{product.name}</b>
          </Typography>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={createMarkup(product.description)}
          />
          <Typography variant="h3" color="secondary">
            Price: <b>{product.price}</b>
          </Typography>
          <br />
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Button
                size="large"
                className="custom-button"
                component={Link}
                to="/"
              >
                Continue Shopping
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductView;
