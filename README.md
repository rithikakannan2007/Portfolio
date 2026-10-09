# Dynamic Full-Stack Portfolio & CMS Web Application

A complete, production-ready **Dynamic Full-Stack Portfolio Web Application** with an integrated **Admin Content Management Dashboard (CMS)** built with **React**, **TypeScript**, **Bootstrap 5**, **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, **JWT Authentication**, and **Swagger / OpenAPI**.

> 💡 **Zero Hardcoded Content**: Every single section and page is dynamic. The portfolio owner/admin can enter, edit, update, delete, and manage all portfolio data directly through the web interface without touching the source code. All public pages retrieve content dynamically from MongoDB.

---

## 🌟 Key Features

### 👤 Public Portfolio Experience
* **Home Page (`/`)**: Dynamic profile hero, tagline, avatar, social media links, quick resume download button, and featured highlights.
* **About Page (`/about`)**: Dynamic professional background, personal info, career objective, and technical interests.
* **Skills Page (`/skills`)**: Categorized technical skills with search, category filtering, and proficiency level progress bars.
* **Projects Page (`/projects`)**: Dynamic project showcase cards with category filters, technology tags, live demo links, and GitHub repositories.
* **Experience Page (`/experience`)**: Professional career timeline displaying positions, companies, dates, responsibilities, and technologies.
* **Education Page (`/education`)**: Academic credentials, universities, graduation years, CGPA/grades, and coursework descriptions.
* **Services Page (`/services`)**: Developer offerings, consulting services, and feature deliverable bullet points.
* **Certifications Page (`/certifications`)**: Verified licenses, issuing organizations, credential IDs, and direct verification URLs.
* **Achievements Page (`/achievements`)**: Hackathon wins, open-source awards, distinctions, and verification links.
* **Resume Page (`/resume`)**: Executive summary, last updated date, and direct PDF view/download links.
* **Contact Page (`/contact`)**: Visitor contact form with client/server validation that stores messages in MongoDB.
* **Social Links**: Fully dynamic external profile buttons (GitHub, LinkedIn, Twitter/X, Instagram, YouTube).
* **Dark / Light Mode**: Persistent theme toggle with smooth transitions.

---

### 🛡️ Admin Content Management Dashboard (CMS)
Secure admin panel protected with **JWT Authentication** (`/admin/login`):

1. **Dashboard Overview (`/admin/dashboard`)**:
   * Total Projects counter
   * Total Skills counter
   * Total Certifications counter
   * Total Experience counter
   * Total Education counter
   * Total Services counter
   * Total Achievements counter
   * Contact Inquiries counter & Unread message badge
   * Recent inquiries quick inbox
   * Quick action buttons
2. **Profile Manager (`/admin/profile`)**: Update name, title, hero tagline, bio, profile photo URL, contact phone/email, location, and availability status.
3. **About Manager (`/admin/about`)**: Edit description, personal details, career objective, and technical interests.
4. **Skills Manager (`/admin/skills`)**: Add, edit, and delete skills with category assignment, proficiency percentage slider (10% - 100%), and icon picker.
5. **Projects Manager (`/admin/projects`)**: Add, edit, and delete projects with image URL, title, description, comma-separated technologies, GitHub URL, live demo URL, category, and "Featured" toggle.
6. **Experience Manager (`/admin/experience`)**: Add, edit, and delete work history records.
7. **Education Manager (`/admin/education`)**: Add, edit, and delete academic degrees, universities, and grades.
8. **Services Manager (`/admin/services`)**: Add, edit, and delete services with custom icons and feature bullet points.
9. **Certifications Manager (`/admin/certifications`)**: Add, edit, and delete licenses, dates, and credential IDs.
10. **Achievements Manager (`/admin/achievements`)**: Add, edit, and delete honors and awards.
11. **Resume Manager (`/admin/resume`)**: Update resume document title, cloud PDF URL, executive summary, and last updated date.
12. **Social Links Manager (`/admin/social-links`)**: Add, edit, and delete external platform links and icons.
13. **Messages Inbox (`/admin/messages`)**: Read visitor inquiries, mark as read, delete messages with confirmation modal, and reply via email.
14. **Settings Manager (`/admin/settings`)**: Configure website title, meta description, brand accent color, contact form toggle, and custom footer text.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Bootstrap 5.3, Bootstrap Icons, React Router DOM v6, Axios, Vite |
| **Backend** | Node.js, Express.js, TypeScript, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), Helmet, CORS, `tsx` |
| **Database** | MongoDB, Mongoose ODM |
| **API Docs** | Swagger UI Express, OpenAPI 3.0 specification |

---

## 🔑 Default Admin Credentials

```text
Email:    admin@portfolio.com
Password: admin123
```
*(These credentials are automatically seeded into MongoDB on first setup)*

---

## 🚀 Quick Start Guide

### 1. Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **MongoDB**: Running instance locally at `mongodb://localhost:27017` or a MongoDB Atlas URI.

---

### 2. Environment Variables

#### Backend (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_db
CLIENT_URL=http://localhost:5173
JWT_SECRET=super_secret_jwt_portfolio_key_2026_xyz
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
```

#### Frontend (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Install Dependencies

```bash
# From workspace root:
npm run install:all

# Or separately:
cd server && npm install
cd ../client && npm install
```

---

### 4. Seed MongoDB Collections

Populate default data for all 14 dynamic collections and create the default admin user:

```bash
# From workspace root:
npm run seed

# Or inside server:
cd server && npm run seed
```

---

### 5. Run the Application

```bash
# Start backend server (Port 5000):
npm run dev:server

# Start frontend application (Port 5173):
npm run dev:client
```

---

## 🌐 Application URLs

| Interface | URL | Description |
|---|---|---|
| **Public Portfolio** | [http://localhost:5173](http://localhost:5173) | Main public portfolio with dynamic pages |
| **Admin Login** | [http://localhost:5173/admin/login](http://localhost:5173/admin/login) | Secure login portal for portfolio owner |
| **Admin Dashboard** | [http://localhost:5173/admin/dashboard](http://localhost:5173/admin/dashboard) | Full Content Management Dashboard |
| **Swagger API Docs** | [http://localhost:5000/api-docs](http://localhost:5000/api-docs) | Interactive OpenAPI 3.0 testing dashboard |
| **Backend Health** | [http://localhost:5000/api/health](http://localhost:5000/api/health) | System health & uptime check |

---

## 📡 REST API Reference

All protected endpoints require the HTTP header:
`Authorization: Bearer <your_jwt_token>`

### 1. Authentication
* `POST /api/auth/login` – Sign in as admin, returns JWT token
* `GET  /api/auth/me` – Retrieve authenticated admin session *(Protected)*

### 2. Profile
* `GET /api/profile` – Public profile data
* `PUT /api/profile` – Update profile details & photo *(Protected)*

### 3. About
* `GET /api/about` – Public about details
* `PUT /api/about` – Update about details *(Protected)*

### 4. Skills
* `GET    /api/skills` – Public skills list
* `POST   /api/skills` – Create new skill *(Protected)*
* `PUT    /api/skills/:id` – Update skill *(Protected)*
* `DELETE /api/skills/:id` – Delete skill *(Protected)*

### 5. Projects
* `GET    /api/projects` – Public project list
* `GET    /api/projects/:id` – Public project detail
* `POST   /api/projects` – Create new project *(Protected)*
* `PUT    /api/projects/:id` – Update project *(Protected)*
* `DELETE /api/projects/:id` – Delete project *(Protected)*

### 6. Work Experience
* `GET    /api/experience` – Public work history
* `POST   /api/experience` – Add experience record *(Protected)*
* `PUT    /api/experience/:id` – Update experience *(Protected)*
* `DELETE /api/experience/:id` – Delete experience *(Protected)*

### 7. Education
* `GET    /api/education` – Public education records
* `POST   /api/education` – Add education record *(Protected)*
* `PUT    /api/education/:id` – Update education *(Protected)*
* `DELETE /api/education/:id` – Delete education *(Protected)*

### 8. Certifications
* `GET    /api/certifications` – Public credentials
* `POST   /api/certifications` – Add certification *(Protected)*
* `PUT    /api/certifications/:id` – Update certification *(Protected)*
* `DELETE /api/certifications/:id` – Delete certification *(Protected)*

### 9. Achievements
* `GET    /api/achievements` – Public awards
* `POST   /api/achievements` – Add achievement *(Protected)*
* `PUT    /api/achievements/:id` – Update achievement *(Protected)*
* `DELETE /api/achievements/:id` – Delete achievement *(Protected)*

### 10. Services
* `GET    /api/services` – Public services list
* `POST   /api/services` – Add service *(Protected)*
* `PUT    /api/services/:id` – Update service *(Protected)*
* `DELETE /api/services/:id` – Delete service *(Protected)*

### 11. Resume
* `GET /api/resume` – Public resume link & metadata
* `PUT /api/resume` – Update resume *(Protected)*

### 12. Social Links
* `GET    /api/social-links` – Public social profiles
* `POST   /api/social-links` – Add social link *(Protected)*
* `PUT    /api/social-links/:id` – Update social link *(Protected)*
* `DELETE /api/social-links/:id` – Delete social link *(Protected)*

### 13. Messages
* `POST   /api/messages` – Submit contact message *(Public for visitors)*
* `GET    /api/messages` – Fetch all messages *(Protected)*
* `PUT    /api/messages/:id/read` – Mark message as read *(Protected)*
* `DELETE /api/messages/:id` – Delete message *(Protected)*

### 14. Settings & Metrics
* `GET /api/settings` – Public website settings
* `PUT /api/settings` – Update settings *(Protected)*
* `GET /api/dashboard/stats` – Metrics & counts *(Protected)*

---

## 🛡️ Security Highlights
1. **Password Hashing**: Bcrypt with salted rounds prevents plain-text credential leaks.
2. **JWT Authorization**: Cryptographically signed JSON Web Tokens for administrative actions.
3. **Helmet Protection**: Hardened HTTP headers preventing XSS, clickjacking, and MIME sniffing.
4. **CORS Restrictions**: Configured origin policies.
5. **Payload Validation**: Strict server-side schema verification.

---

## 📄 License
MIT License.
