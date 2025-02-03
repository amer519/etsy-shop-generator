// src/components/EtsyShopGenerator.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from "../services/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

function EtsyShopGenerator() {
  const { currentUser } = useAuth();
  const [shopName, setShopName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedSite, setGeneratedSite] = useState(null);

  // Simulated payment function (replace with a real payment flow later)
  const handlePayment = async () => {
    return window.confirm("You need to pay $3 to generate another site. Proceed?");
  };

  // Updated fetch function: Calls your deployed Cloud Function
  const fetchEtsyData = async (shop) => {
    try {
      // Replace with your actual Cloud Function URL from deployment.
      const cloudFunctionUrl = `https://us-central1-your-project-id.cloudfunctions.net/fetchEtsyData?shopName=${shop}`;
      const response = await fetch(cloudFunctionUrl);
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching Etsy data:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if the user already generated a site
      const sitesRef = collection(firestore, "sites");
      const q = query(sitesRef, where("userId", "==", currentUser.uid));
      const sitesSnapshot = await getDocs(q);

      if (!sitesSnapshot.empty) {
        const proceed = await handlePayment();
        if (!proceed) {
          setLoading(false);
          return;
        }
      }
      
      // Fetch Etsy data using your Cloud Function
      const etsyData = await fetchEtsyData(shopName);
      if (!etsyData || etsyData.error) {
        throw new Error("Failed to fetch data from Etsy. Please verify your shop name.");
      }
      
      // Prepare the site data record
      const siteData = {
        userId: currentUser.uid,
        shopName,
        social: { twitter, facebook, instagram },
        contact: { email: contactEmail, phone: phoneNumber },
        etsyData, // Fetched Etsy data (e.g., product listings)
        createdAt: new Date(),
      };

      // Save the generated site in Firestore
      await addDoc(sitesRef, siteData);
      setGeneratedSite(siteData);
      
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "2rem" }}>
      <h3>Generate Your Etsy Shop Website</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {generatedSite ? (
        <div>
          <h4>Your site has been generated!</h4>
          <p>Shop Name: {generatedSite.shopName}</p>
          <p>
            Social Links:{" "}
            {generatedSite.social.twitter && <span>Twitter: {generatedSite.social.twitter} </span>}
            {generatedSite.social.facebook && <span>Facebook: {generatedSite.social.facebook} </span>}
            {generatedSite.social.instagram && <span>Instagram: {generatedSite.social.instagram} </span>}
          </p>
          <p>
            Contact: {generatedSite.contact.email || "No email provided"} / {generatedSite.contact.phone || "No phone provided"}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Etsy Shop Name:</label>
            <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
          </div>
          <div>
            <label>Twitter URL:</label>
            <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          </div>
          <div>
            <label>Facebook URL:</label>
            <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
          </div>
          <div>
            <label>Instagram URL:</label>
            <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          </div>
          <div>
            <label>Contact Email (optional):</label>
            <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </div>
          <div>
            <label>Phone Number (optional):</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Site"}
          </button>
        </form>
      )}
    </div>
  );
}

export default EtsyShopGenerator;
