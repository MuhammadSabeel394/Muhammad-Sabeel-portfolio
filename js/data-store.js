/**
 * MY_JANNE Portfolio Data Store
 * Provides persistent, reactive data management for certifications,
 * projects, skills, experience, and academic education.
 */

const PortfolioDataStore = (function () {
  const STORAGE_KEY = 'my_janne_portfolio_data';
  let cachedData = null;

  async function loadData() {
    // 1. Check local storage first (for live edits made in Admin CMS)
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      try {
        cachedData = JSON.parse(local);
        return cachedData;
      } catch (e) {
        console.warn('Failed parsing localStorage portfolio data, fetching default.');
      }
    }

    // 2. Fetch from data/portfolio-data.json
    try {
      const res = await fetch('data/portfolio-data.json');
      if (res.ok) {
        cachedData = await res.json();
        return cachedData;
      }
    } catch (err) {
      console.warn('Fetch error (likely file:// protocol):', err);
    }

    // 3. Fallback: if fetch failed, check if window.__DEFAULT_PORTFOLIO_DATA exists
    if (window.__DEFAULT_PORTFOLIO_DATA) {
      cachedData = window.__DEFAULT_PORTFOLIO_DATA;
      return cachedData;
    }

    return null;
  }

  return {
    async getData() {
      if (!cachedData) {
        await loadData();
      }
      return cachedData;
    },

    async getProfile() {
      const d = await this.getData();
      return d ? d.profile : null;
    },

    async getCertifications(category = 'all', searchQuery = '') {
      const d = await this.getData();
      if (!d || !d.certifications) return [];
      let list = d.certifications;

      if (category && category !== 'all') {
        list = list.filter(c => c.category.toLowerCase().includes(category.toLowerCase()));
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        list = list.filter(c =>
          c.title.toLowerCase().includes(q) ||
          c.issuer.toLowerCase().includes(q) ||
          (c.instructor && c.instructor.toLowerCase().includes(q)) ||
          c.description.toLowerCase().includes(q)
        );
      }
      return list;
    },

    async getProjects(category = 'all', searchQuery = '') {
      const d = await this.getData();
      if (!d || !d.projects) return [];
      let list = d.projects;

      if (category && category !== 'all') {
        list = list.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        list = list.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.technologies.some(t => t.toLowerCase().includes(q))
        );
      }
      return list;
    },

    async getProjectById(id) {
      const d = await this.getData();
      if (!d || !d.projects) return null;
      return d.projects.find(p => p.id === id) || null;
    },

    async getSkills() {
      const d = await this.getData();
      return d ? d.skills : {};
    },

    async getExperience() {
      const d = await this.getData();
      return d ? d.experience : [];
    },

    async getEducation() {
      const d = await this.getData();
      return d ? d.education : [];
    },

    saveData(newData) {
      cachedData = newData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { detail: newData }));
    },

    resetData() {
      localStorage.removeItem(STORAGE_KEY);
      cachedData = null;
      return loadData();
    },

    exportJSON() {
      if (!cachedData) return;
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cachedData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "portfolio-data.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }
  };
})();
