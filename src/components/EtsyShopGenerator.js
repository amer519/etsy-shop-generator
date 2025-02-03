// src/components/EtsyShopGenerator.js
import React, { useState, useEffect } from "react";
import ThemeSelector from "./ThemeSelector";

function EtsyShopGenerator() {
  const [etsyData, setEtsyData] = useState([]);
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    // Replace this with a real Etsy API call if needed.
    setEtsyData([
      {
        id: 1,
        title: "Handmade Mug",
        image: "https://via.placeholder.com/150",
        price: "$20.00",
      },
      {
        id: 2,
        title: "Artisan Soap",
        image: "https://via.placeholder.com/150",
        price: "$8.00",
      },
      // Add more products as needed...
    ]);
  }, []);

  return (
    <div className={`theme-${theme}`} style={{ padding: "1rem" }}>
      <ThemeSelector theme={theme} setTheme={setTheme} />
      <div className="product-list" style={{ display: "flex", flexWrap: "wrap" }}>
        {etsyData.map((product) => (
          <div
            key={product.id}
            className="product"
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "1rem",
              margin: "0.5rem",
              flex: "1 0 200px",
            }}
          >
            <img src={product.image} alt={product.title} style={{ maxWidth: "100%" }} />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EtsyShopGenerator;