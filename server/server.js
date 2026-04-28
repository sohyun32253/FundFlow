const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// 데이터 로드
const loadData = () => {
  const dataPath = path.join(__dirname, "data", "project-list.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  return data;
};

// 지연 시간 시뮬레이션 (실제 API처럼 느끼도록)
const simulateDelay = (ms = 300) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// 20% 확률로 에러 발생 (에러 처리 테스트용)
const shouldSimulateError = () => {
  return Math.random() < 0.2; // 20% 확률
};

/**
 * GET /api/projects
 * 프로젝트 목록 조회 API
 *
 * Query Parameters:
 * - page: 페이지 번호 (기본값: 1)
 * - limit: 페이지당 항목 수 (기본값: 10)
 *
 * Response:
 * {
 *   "total": 30,
 *   "totalPages": 3,
 *   "pageSize": 10,
 *   "hasPrevious": false,
 *   "hasNext": true,
 *   "page": 1,
 *   "contents": [...]
 * }
 */
app.get("/api/projects", async (req, res) => {
  try {
    // 지연 시뮬레이션
    await simulateDelay(Math.random() * 500 + 200); // 200~700ms 랜덤 지연

    // 20% 확률로 에러 발생
    if (shouldSimulateError()) {
      return res.status(500).json({
        error: "Internal Server Error",
        message:
          "서버에서 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }

    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // 유효성 검사
    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({
        error: "Bad Request",
        message: "page와 limit은 1 이상의 정수여야 합니다.",
      });
    }

    const data = loadData();
    const projects = data.contents;

    const total = projects.length;
    const totalPages = Math.ceil(total / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProjects = projects.slice(startIndex, endIndex);

    res.json({
      total,
      totalPages,
      pageSize: limitNum,
      hasPrevious: pageNum > 1,
      hasNext: pageNum < totalPages,
      page: pageNum,
      contents: paginatedProjects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "프로젝트 목록을 불러오는 중 오류가 발생했습니다.",
    });
  }
});

/**
 * GET /api/projects/:id
 * 프로젝트 상세 조회 API
 * :id는 UUID 또는 permalink
 */
app.get("/api/projects/:id", async (req, res) => {
  try {
    await simulateDelay(Math.random() * 300 + 100);

    // 20% 확률로 에러 발생
    if (shouldSimulateError()) {
      return res.status(500).json({
        error: "Internal Server Error",
        message:
          "서버에서 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }

    const { id } = req.params;
    const data = loadData();
    const project = data.contents.find(
      (p) => p.id === id || p.permalink === id,
    );

    if (!project) {
      return res.status(404).json({
        error: "Not Found",
        message: "프로젝트를 찾을 수 없습니다.",
      });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "프로젝트를 불러오는 중 오류가 발생했습니다.",
    });
  }
});

/**
 * POST /api/projects/:id/like
 * 프로젝트 좋아요 추가 API
 */
app.post("/api/projects/:id/like", async (req, res) => {
  try {
    await simulateDelay(Math.random() * 200 + 100);

    // 20% 확률로 에러 발생
    if (shouldSimulateError()) {
      return res.status(500).json({
        error: "Internal Server Error",
        message:
          "서버에서 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }

    const { id } = req.params;
    const data = loadData();
    const project = data.contents.find(
      (p) => p.id === id || p.permalink === id,
    );

    if (!project) {
      return res.status(404).json({
        error: "Not Found",
        message: "프로젝트를 찾을 수 없습니다.",
      });
    }

    // 진행중 프로젝트만 좋아요 가능
    if (project.state === "prelaunched") {
      return res.status(400).json({
        error: "Bad Request",
        message: "공개예정 프로젝트는 좋아요할 수 없습니다.",
      });
    }

    res.json({
      success: true,
      message: "좋아요가 추가되었습니다.",
      projectId: project.id,
      isLiked: true,
    });
  } catch (error) {
    console.error("Error liking project:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "좋아요 처리 중 오류가 발생했습니다.",
    });
  }
});

/**
 * DELETE /api/projects/:id/like
 * 프로젝트 좋아요 취소 API
 */
app.delete("/api/projects/:id/like", async (req, res) => {
  try {
    await simulateDelay(Math.random() * 200 + 100);

    // 20% 확률로 에러 발생
    if (shouldSimulateError()) {
      return res.status(500).json({
        error: "Internal Server Error",
        message:
          "서버에서 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }

    const { id } = req.params;
    const data = loadData();
    const project = data.contents.find(
      (p) => p.id === id || p.permalink === id,
    );

    if (!project) {
      return res.status(404).json({
        error: "Not Found",
        message: "프로젝트를 찾을 수 없습니다.",
      });
    }

    res.json({
      success: true,
      message: "좋아요가 취소되었습니다.",
      projectId: project.id,
      isLiked: false,
    });
  } catch (error) {
    console.error("Error unliking project:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "좋아요 취소 처리 중 오류가 발생했습니다.",
    });
  }
});

/**
 * POST /api/projects/:id/notification
 * 프로젝트 알림신청 API
 */
app.post("/api/projects/:id/notification", async (req, res) => {
  try {
    await simulateDelay(Math.random() * 200 + 100);

    // 20% 확률로 에러 발생
    if (shouldSimulateError()) {
      return res.status(500).json({
        error: "Internal Server Error",
        message:
          "서버에서 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }

    const { id } = req.params;
    const data = loadData();
    const project = data.contents.find(
      (p) => p.id === id || p.permalink === id,
    );

    if (!project) {
      return res.status(404).json({
        error: "Not Found",
        message: "프로젝트를 찾을 수 없습니다.",
      });
    }

    // 공개예정 프로젝트만 알림신청 가능
    if (project.state !== "prelaunched") {
      return res.status(400).json({
        error: "Bad Request",
        message: "공개예정 프로젝트만 알림신청이 가능합니다.",
      });
    }

    res.json({
      success: true,
      message: "알림신청이 완료되었습니다.",
      projectId: project.id,
      isNotified: true,
      notificationCount: project.notificationCount || 0,
    });
  } catch (error) {
    console.error("Error subscribing notification:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "알림신청 처리 중 오류가 발생했습니다.",
    });
  }
});

/**
 * DELETE /api/projects/:id/notification
 * 프로젝트 알림신청 취소 API
 */
app.delete("/api/projects/:id/notification", async (req, res) => {
  try {
    await simulateDelay(Math.random() * 200 + 100);

    // 20% 확률로 에러 발생
    if (shouldSimulateError()) {
      return res.status(500).json({
        error: "Internal Server Error",
        message:
          "서버에서 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }

    const { id } = req.params;
    const data = loadData();
    const project = data.contents.find(
      (p) => p.id === id || p.permalink === id,
    );

    if (!project) {
      return res.status(404).json({
        error: "Not Found",
        message: "프로젝트를 찾을 수 없습니다.",
      });
    }

    res.json({
      success: true,
      message: "알림신청이 취소되었습니다.",
      projectId: project.id,
      isNotified: false,
      notificationCount: project.notificationCount || 0,
    });
  } catch (error) {
    console.error("Error unsubscribing notification:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "알림신청 취소 처리 중 오류가 발생했습니다.",
    });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "요청하신 리소스를 찾을 수 없습니다.",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "서버에서 오류가 발생했습니다.",
  });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 텀블벅 코딩테스트 Mock API 서버가 시작되었습니다!               ║
║                                                            ║
║   📍 Server: http://localhost:${PORT}                      ║ 
║                                                            ║
║                                                            ║
║   📚 API Endpoints:                                        ║
║   - GET  /api/projects          프로젝트 목록                 ║
║   - POST /api/projects/:id/like 좋아요                      ║
║   - DEL  /api/projects/:id/like 좋아요 취소                   ║
║   - POST /api/projects/:id/notification 알림신청             ║
║   - DEL  /api/projects/:id/notification 알림신청 취소         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
