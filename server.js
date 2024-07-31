const jsonServer = require("json-server");
const express = require("express");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  setTimeout(next, 500);
});

// Custom route to handle date filtering
server.get("/costAndTurnoverBarChartData", (req, res) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const data = router.db
    .get("costAndTurnoverBarChartData")
    .filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate >= startDate && itemDate <= endDate;
    })
    .value();
  res.json(data);
});

// Custom route to handle date filtering
server.get("/productivityBarChartData", (req, res) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const data = router.db
    .get("productivityBarChartData")
    .filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate >= startDate && itemDate <= endDate;
    })
    .value();
  res.json(data);
});

server.use(router);

const app = express();
app.use(server);

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on...");
});
