# Volunteer Management Platform

A full-stack web application for managing volunteer requests, organization dashboards, and user profiles.

---

## 📁 Project Structure

```
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   ├── placeholder.svg
│   └── robots.txt
├── styles/
│   └── globals.css

# Frontend
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── context/
│   │   └── AuthContext.js
│   ├── styles/
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.js
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.js
│   │   │   └── Footer.css
│   │   └── ui/
│   │       ├── Avatar.js / .css
│   │       ├── Badge.js / .css
│   │       ├── Button.js / .css
│   │       ├── Card.js / .css
│   │       ├── Input.js / .css
│   └── pages/
│       ├── AboutPage.js / .css
│       ├── ChatbotInterface.js
│       ├── ContactPage.js
│       ├── HomePage.js / .css
│       ├── NotFoundPage.js
│       ├── OrganizationDashboard.js
│       ├── PostRequestPage.js
│       ├── RequestsPage.js
│       ├── ServicePage.js
│       ├── SignInPage.js
│       ├── SignUpPage.js
│       ├── VolunteerDashboard.js
│       └── VolunteerProfilePage.js

# Backend
├── Backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── middleware/
│   │   └── verification.js
│   └── src/
│       ├── db.js
│       ├── database_add.js
│       ├── index.js
│       └── models/
│           ├── organization.js
│           ├── request.js
│           ├── requestAssociation.js
│           ├── user.js
│           └── volunteer.js
```

---

## 🛠️ Tech Stack

- **Frontend:** React.js, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** (e.g., PostgreSQL / MongoDB – update accordingly)
- **Authentication:** Context API (frontend), JWT/session (backend)
- **Deployment:** (e.g., Hostinger, Heroku, Vercel)

---

## 🚀 Getting Started

### Backend Setup

```bash
cd Backend
npm install
npm start
```

### Frontend Setup

```bash
npm install
npm start
```

---

## 🙌 Contributors

- Bhavish Kumar

---

## 📄 License

[MIT](LICENSE)
