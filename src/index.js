const express = require("express");
const client = require("prom-client");

const app = express();
const port = 9100; // Port que Prometheus va scraper

// 📊 Crée un registre et quelques métriques
const register = new client.Registry();

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Nombre total de requêtes HTTP",
  labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestCounter);
client.collectDefaultMetrics({ register });

// Middleware pour enregistrer les métriques
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });
  });
  next();
});

// Route test
app.get("/", (req, res) => {
  res.send("🎯 Service de métriques actif");
});

// Endpoint Prometheus
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
});

app.listen(port, () => {
  console.log(`🚀 Metrics service listening on http://localhost:${port}/metrics`);
});
