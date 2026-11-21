# Muhammad Sabeel — AI & Data Science Portfolio Platform

> **AI & Data Science Student | Machine Learning | Python | Data Analytics**  
> Building intelligent systems, autonomous multi-agent ecosystems, and reliable machine learning pipelines.

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Tests Passing](https://img.shields.io/badge/MY_JANNE%20tests-47%20passed-brightgreen.svg)]()
[![Certifications](https://img.shields.io/badge/verified%20certifications-19+-cyan.svg)]()
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20GitHub%20Pages-lightgrey.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Executive Overview

This repository hosts the personal portfolio website of **Muhammad Sabeel**, transformed into an innovative, multi-page platform inspired by the **MY_JANNE** autonomous agent concept.

It replaces all outdated web development descriptions with a focused, verifiable identity in **Artificial Intelligence, Machine Learning, Deep Learning, and Data Science**.

### Key Architectural Highlights
- **Multi-Page Architecture:** 10 dedicated pages with clear information architecture and clean URL routing.
- **Signature First-Visit Welcome Experience:** Cinematic reveal of Sabeel's portrait (`mypic1.jpeg`) with an AI greeting, auto-dismiss, skip button, and reduced-motion compliance. Stored in `sessionStorage` so it runs once per session.
- **19+ Verified Industry Certifications:** Stanford University, DeepLearning.AI (Andrew Ng), Google, UC Davis, and Coursera. Includes rendered high-res preview thumbnails, live modal inspector, and direct PDF links.
- **Flagship Project — MY_JANNE:** Voice-first autonomous agent ecosystem in Python with 47 passed PyTests, topological task decomposition, AST code quality gating, and 2D physics robotics simulation.
- **Dynamic Content Management (CMS):** A secure client-side admin portal (`admin.html`) to add new certifications, projects, internships, and education entries without modifying code, backed by `data/portfolio-data.json`.
- **Zero Build Step:** Runs directly via modern browsers, Python's `http.server`, or GitHub Pages.

---

## 📂 Project Structure

```
sabeel-portfolio/
├── index.html                  # Homepage: Hero, AI metrics, domain pillars, flagship showcase
├── about.html                  # About Me: AI journey, 4 engineering pillars, trajectory timeline
├── skills.html                 # Technical Skills: ML, PyTorch, LLMs, Data Science, SQL, Tools
├── projects.html               # Project Showcase: Filterable gallery with live search
├── project-details.html        # Dynamic Project Details Page (renders complete specifications)
├── project-my-janne.html       # Dedicated semantic architecture page for Flagship MY_JANNE
├── certifications.html         # Certifications Gallery: 19+ authentic certs with interactive viewer
├── experience.html             # Experience & Internships: Leadership, teaching, internship readiness
├── education.html              # Academic Background: BS AI & Data Science + DIT Distinction
├── contact.html                # Contact: Inquiry forms, direct mailto, copy email, socials
├── admin.html                  # Dynamic CMS Admin Portal: Add/edit entries & export JSON
├── data/
│   └── portfolio-data.json     # Master JSON database
├── css/
│   ├── style.css               # Design system tokens, navbar, footer, cyber background
│   ├── welcome.css             # Cinematic first-visit welcome animation
│   ├── inner.css               # Inner page layouts, timelines, and cards
│   ├── projects.css            # Project cards & specification layout
│   ├── certifications.css      # Certificate grid, badges, and modal viewer
│   └── admin.css               # Admin CMS tables, form modals, and gate
├── js/
│   ├── data-store.js           # Central data store (localStorage sync & JSON loader)
│   ├── portfolio-data-default.js # Zero-config fallback data for file:// protocol
│   ├── welcome.js              # First-visit welcome intro controller & reduced-motion
│   ├── app.js                  # Sticky nav glass, mobile drawer, scroll animations
│   ├── certifications.js       # Dynamic certificate renderer, filters, search & modal
│   ├── projects.js             # Project cards renderer, filtering, and spec parser
│   ├── contact.js              # Contact form validation & dispatch
│   └── admin.js                # Secure Admin portal logic (CRUD & JSON export)
└── assets/
    ├── mypic1.jpeg             # Only personal picture used (in welcome experience)
    ├── mylogo.png              # Personal branding logo
    ├── certificates/           # All 20 original PDF certificate files
    └── cert_previews/          # High-resolution rendered preview images of all certificates
```

---

## 🚀 Getting Started & Local Testing

### Option 1: Direct Browser Launch
Simply double-click `index.html` or open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
# Navigate to the portfolio folder
cd sabeel-portfolio

# Start a lightweight local server
python -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

---

## 🛠️ Dynamic CMS Management

To add new certifications, projects, internships, or achievements:
1. Open `admin.html` in your browser.
2. Enter the administrative passcode: `sabeel.ai` (or `admin`).
3. Fill out the modal form for the new item.
4. Click **"Save"** to immediately update your local session.
5. Click **"Export Updated JSON"** to download the latest `portfolio-data.json` to keep your static repository in sync!

---

## 📬 Contact & Inquiries

- **Name:** Muhammad Sabeel Afridi
- **Email:** [m.sabeelafd@gmail.com](mailto:m.sabeelafd@gmail.com)
- **GitHub:** [github.com/MuhammadSabeel394](https://github.com/MuhammadSabeel394)
- **LinkedIn:** [linkedin.com/in/muhammad-sabeel-afridi](https://www.linkedin.com/in/muhammad-sabeel-afridi)
