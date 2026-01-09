	# 🧠 Zaytra AI

Zaytra AI is a modern, production-ready Next.js 15 web application powered by a MongoDB database and fully containerized with Docker. It is deployed to a private VPS with a custom domain and uses GitHub Actions for automated CI/CD.

---

## 🛡️ Architecture

    ┌────────┐        ┌────────────┐        ┌──────────────┐        ┌──────────────┐
    │  User  ├───────▶│   Nginx    ├───────▶│  Next.js App ├───────▶│   MongoDB    │
    └────────┘        └────────────┘        └──────────────┘        └──────────────┘


- **Frontend/Backend**: [Next.js 15](https://nextjs.org/)
- **Database**: MongoDB 7 (Dockerized)
- **Runtime**: Node.js 18 (Alpine base)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Web Server**: Nginx (reverse proxy)
- **HTTPS**: Certbot + Let’s Encrypt
- **Deployment**: Docker Compose on Ubuntu VPS
- **CI/CD**: GitHub Actions via SSH

---

## 🚀 Deployment

### 1. Clone the repository on your server

```bash
git clone git@github.com:zaytra-ai/zaytra_ai.git
cd zaytra_ai
```

### 2. Configure `.env.local`

```env
MONGODB_URI=mongodb://mongo_admin:YOUR_PASSWORD@mongodb:27017/contacts?authSource=admin
MONGODB_NEWSLETTER_URI=mongodb://mongo_admin:YOUR_PASSWORD@mongodb:27017/newsletter?authSource=admin
MONGODB_VENDOR_APPLICATION_URI=mongodb://mongo_admin:YOUR_PASSWORD@mongodb:27017/vendor-app?authSource=admin
```

> Adjust database names, auth, and host/IP as needed.

### 3. Build & Start with Docker Compose

```bash
docker compose build --no-cache
docker compose up -d
```

---

## 🌐 Domain & HTTPS

- **Domain**: `https://zaytra.ai`
- **DNS A-record** points to server IP
- **Nginx** handles reverse proxy from `:80` and `:443` to Dockerized app (`localhost:3000`)
- **Certbot** provides HTTPS with automatic renewal:

```bash
sudo certbot --nginx -d zaytra.ai -d www.zaytra.ai
sudo certbot renew --dry-run  # confirm auto-renew
```

---

## ⚙️ CI/CD via GitHub Actions

### Secrets Required:

| Name              | Description                 |
| ----------------- | --------------------------- |
| `SERVER_HOST`     | Your VPS IP (e.g. 62.171.X) |
| `SERVER_USER`     | Usually `root`              |
| `SSH_PRIVATE_KEY` | Private key used to SSH in  |

### Trigger:

```yaml
on:
  push:
    branches:
      - main
```

### Steps:

- SSH into server
- `git pull` latest code
- Rebuild Docker image
- Restart containers

> Located in `.github/workflows/deploy.yml`

---

## 📣 Docker Notes

- Uses a single-stage Dockerfile (no caching/multistage)
- Docker image includes code + build + runtime
- MongoDB runs in a separate container with persistent volume

---

## 📂 Directory Structure

```
/opt/zaytra_ai/
├── Dockerfile
├── docker-compose.yml
├── .env.local
├── .github/
│   └── workflows/
│       └── deploy.yml
└── (Next.js source files)
```

---

## 🧪 Useful Commands

```bash
# Run containers
docker-compose up -d

# Stop containers
docker-compose down

# Rebuild from scratch
docker-compose build --no-cache

# View logs
docker logs -f zaytra_app

# Shell into MongoDB
docker exec -it mongodb mongosh -u mongo_admin -p YOUR_PASSWORD --authenticationDatabase admin
```

---

## 📬 License

MIT © 2025 Zaytra AI
