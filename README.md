# DeployHub React + Vite Application

A lightweight, modern React 18 & Vite SPA designed for deployment validation, testing CI/CD pipelines, Docker containerization, and server deployments on DeployHub.

---

## 🚀 Features

- **React 18 & Vite 5** (Fast HMR & Optimized production build)
- **Interactive UI Dashboard** with real-time health probe & URL parameter tester
- **Multi-stage Dockerfile** (Node 20 build stage + Nginx Alpine runtime)
- **Docker Compose** ready for one-command deployment
- **Nginx configured** for Single Page Application (SPA) client-side routing & caching
- **Health Check endpoints** (`/health.json`, `/api/health`)

---

## 📡 Web & Probe Endpoints

| Method | Endpoint | Description | Sample Output / Result |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Web application UI & interactive probe | Interactive Dashboard UI |
| `GET` | `/health.json` | Static health JSON probe | `{"status":"UP","service":"deploy_hub_react_vite",...}` |
| `GET` | `/api/health` | Container & Nginx health probe | `{"status":"UP","service":"deploy_hub_react_vite"}` |

---

## 🐳 Docker Deployment

### 1. Run with Docker Compose (Recommended)
```bash
docker compose up -d --build
```
Check running container:
```bash
docker compose ps
docker compose logs -f
```
Stop container:
```bash
docker compose down
```

### 2. Run with Docker CLI
```bash
# Build the image
docker build -t deploy-hub-react-vite-app:latest .

# Run the container (maps host port 3000 to container port 80)
docker run -d -p 3000:80 --name deploy_hub_react_vite_container deploy-hub-react-vite-app:latest
```

---

## 💻 Local Development (Without Docker)

Requires Node.js 18+ & npm:
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or build and test production bundle
npm run build
npm run preview
```

---

## 🧪 Quick Test (cURL & Browser)
```bash
# Open in browser:
http://localhost:3000/

# Test health check via cURL:
curl http://localhost:3000/health.json
curl http://localhost:3000/api/health
```