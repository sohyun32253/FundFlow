const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const projectsData = require("./data/projects.json");

const projects = Array.isArray(projectsData)
  ? projectsData
  : projectsData.contents;

const app = express();
const PORT = 4000;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load("./openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/projects", async (req, res) => {
  await delay(700);

  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 12);

  const start = (page - 1) * limit;
  const end = start + limit;

  const contents = projects.slice(start, end);

  const total = projects.length;
  const totalPages = Math.ceil(total / limit);

  res.json({
    total,
    totalPages,
    pageSize: limit,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
    page,
    contents,
  });
});

app.post("/api/projects/:id/like", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    projectId: Number(id),
    liked: true,
    message: "좋아요가 추가되었습니다."
  });
});

app.delete("/api/projects/:id/like", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    projectId: Number(id),
    liked: false,
    message: "좋아요가 취소되었습니다."
  });
});

app.post("/api/projects/:id/notification", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    projectId: Number(id),
    notified: true,
    message: "알림 신청이 완료되었습니다."
  });
});

app.delete("/api/projects/:id/notification", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    projectId: Number(id),
    notified: false,
    message: "알림 신청이 취소되었습니다."
  });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});