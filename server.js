import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors()); //
const PORT = 3000;

const SHOPIFY_ACCESS_TOKEN = "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";
const SHOPIFY_STORE = "pielot-test";


app.use((req, res, next) => {
  console.log(`[🔥 Reçu] ${req.method} ${req.url}`);
  next();
});

app.get("/shopify/products", async (req, res) => {
  try {
    const response = await axios.get(
      `https://pielot-test.myshopify.com/admin/api/2023-04/products.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
  console.error("🔥 ERREUR BACKEND 🔥");
  if (error.response) {
    console.error("Réponse Shopify :", error.response.data);
  } else if (error.request) {
    console.error("Pas de réponse de Shopify :", error.request);
  } else {
    console.error("Erreur autre :", error.message);
  }
  res.status(500).json({ error: "Erreur Shopify" });
}

});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});



