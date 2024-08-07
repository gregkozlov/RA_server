const jsonServer = require("json-server");
const express = require("express");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(express.json()); // Add this middleware to parse JSON bodies
server.use((req, res, next) => {
  setTimeout(next, 500);
});

// Custom route to handle date filtering for Cost and Turnover data
server.post("/costAndTurnoverBarChartData", (req, res) => {
  const { startDate, endDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const data = router.db
    .get("costAndTurnoverBarChartData")
    .filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate >= start && itemDate <= end;
    })
    .value();
  res.json(data);
});

// Custom route to handle date filtering for Productivity data
server.post("/productivityBarChartData", (req, res) => {
  const { startDate, endDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const data = router.db
    .get("productivityBarChartData")
    .filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate >= start && itemDate <= end;
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
