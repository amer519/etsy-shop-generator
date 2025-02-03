// src/pages/SitePreview.js
import React, { useState, useEffect } from "react";
import { firestore } from "../services/firebase";
import { useParams } from "react-router-dom";

function SitePreview() {
  const { siteId } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const docRef = firestore.collection("sites").doc(siteId);
        const doc = await docRef.get();
        if (!doc.exists) {
          setError("Site not found");
        } else {
          setSite(doc.data());
        }
      } catch (err) {
        setError("Error fetching site: " + err.message);
      }
      setLoading(false);
    };
    fetchSite();
  }, [siteId]);

  if (loading) return <p>Loading site preview...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  
  return (
    <div style={{ padding: "1rem" }}>
      <h1>{site.shopName}</h1>
      <p>
        Follow us on:{" "}
        {site.social.twitter && (
          <a href={site.social.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        )}
        {" "}
        {site.social.facebook && (
          <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        )}
        {" "}
        {site.social.instagram && (
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        )}
      </p>
      <section>
        <h2>Products</h2>
        {site.etsyData && site.etsyData.results ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {site.etsyData.results.map((product) => (
              <div key={product.listing_id} style={{ margin: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
                {product.Images && product.Images[0] && (
                  <img src={product.Images[0].url_570xN} alt={product.title} style={{ maxWidth: "100%" }} />
                )}
                <h3>{product.title}</h3>
                <p>{product.price} {product.currency_code}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </section>
      <section>
        <h3>Contact</h3>
        <p>Email: {site.contact.email || "Not provided"}</p>
        <p>Phone: {site.contact.phone || "Not provided"}</p>
      </section>
    </div>
  );
}

export default SitePreview;