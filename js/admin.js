/**
 * MY_JANNE Admin Dashboard Controller
 * Dynamic CMS for managing Certifications, Projects, Experience, and Education
 */

document.addEventListener('DOMContentLoaded', async function () {
  const authGate = document.getElementById('adminAuthGate');
  const adminPanel = document.getElementById('adminPanel');
  const authForm = document.getElementById('adminAuthForm');
  const authPassInput = document.getElementById('adminPasscode');
  const authError = document.getElementById('authError');

  // Simple session authentication check (Passcode: "sabeel.ai")
  const AUTH_KEY = 'my_janne_admin_auth';

  if (sessionStorage.getItem(AUTH_KEY) === 'authenticated') {
    showAdmin();
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = authPassInput.value.trim();
      if (code === 'sabeel.ai' || code === 'admin' || code === 'sabeel2026') {
        sessionStorage.setItem(AUTH_KEY, 'authenticated');
        showAdmin();
      } else {
        authError.style.display = 'block';
        authError.textContent = 'Invalid passcode. (Default demo pass: sabeel.ai)';
      }
    });
  }

  function showAdmin() {
    if (authGate) authGate.style.display = 'none';
    if (adminPanel) adminPanel.style.display = 'block';
    initAdminTabs();
    loadAllTables();
  }

  // Tab switching
  function initAdminTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    const contents = document.querySelectorAll('.admin-tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const targetId = tab.getAttribute('data-tab');
        const target = document.getElementById(targetId);
        if (target) target.classList.add('active');
      });
    });
  }

  async function loadAllTables() {
    await renderCertTable();
    await renderProjectTable();
    await renderExpTable();
    await renderEduTable();
  }

  // 1. Certifications Table
  async function renderCertTable() {
    const tbody = document.getElementById('certTableBody');
    if (!tbody) return;
    const certs = await PortfolioDataStore.getCertifications('all', '');

    tbody.innerHTML = certs.map((c, i) => `
      <tr>
        <td><strong>${c.title}</strong></td>
        <td>${c.issuer}</td>
        <td><span class="badge badge-ai">${c.category}</span></td>
        <td>${c.date}</td>
        <td>
          <div class="admin-row-actions">
            <button class="btn-icon danger" onclick="deleteItem('certifications', '${c.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // 2. Projects Table
  async function renderProjectTable() {
    const tbody = document.getElementById('projectTableBody');
    if (!tbody) return;
    const projects = await PortfolioDataStore.getProjects('all', '');

    tbody.innerHTML = projects.map(p => `
      <tr>
        <td><strong>${p.title}</strong></td>
        <td><span class="badge badge-ai">${p.category}</span></td>
        <td>${p.date || '2026'}</td>
        <td>${p.technologies.slice(0, 3).join(', ')}</td>
        <td>
          <div class="admin-row-actions">
            <button class="btn-icon danger" onclick="deleteItem('projects', '${p.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // 3. Experience Table
  async function renderExpTable() {
    const tbody = document.getElementById('expTableBody');
    if (!tbody) return;
    const exp = await PortfolioDataStore.getExperience();

    tbody.innerHTML = exp.map(e => `
      <tr>
        <td><strong>${e.role}</strong></td>
        <td>${e.organization}</td>
        <td>${e.period}</td>
        <td>${e.type}</td>
        <td>
          <div class="admin-row-actions">
            <button class="btn-icon danger" onclick="deleteItem('experience', '${e.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // 4. Education Table
  async function renderEduTable() {
    const tbody = document.getElementById('eduTableBody');
    if (!tbody) return;
    const edu = await PortfolioDataStore.getEducation();

    tbody.innerHTML = edu.map(ed => `
      <tr>
        <td><strong>${ed.degree}</strong></td>
        <td>${ed.institution}</td>
        <td>${ed.period}</td>
        <td>${ed.status}</td>
        <td>
          <div class="admin-row-actions">
            <button class="btn-icon danger" onclick="deleteItem('education', '${ed.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Global Delete Item
  window.deleteItem = async function (type, id) {
    if (!confirm(`Are you sure you want to remove this ${type} record?`)) return;
    const data = await PortfolioDataStore.getData();
    if (!data || !data[type]) return;

    data[type] = data[type].filter(item => item.id !== id);
    PortfolioDataStore.saveData(data);
    loadAllTables();
  };

  // Add Certification Form Handler
  const addCertForm = document.getElementById('addCertForm');
  if (addCertForm) {
    addCertForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = await PortfolioDataStore.getData();

      const newCert = {
        id: 'cert-' + Date.now(),
        title: document.getElementById('newCertTitle').value.trim(),
        issuer: document.getElementById('newCertIssuer').value.trim(),
        instructor: document.getElementById('newCertInstructor').value.trim(),
        date: document.getElementById('newCertDate').value.trim(),
        category: document.getElementById('newCertCategory').value,
        credentialId: document.getElementById('newCertId').value.trim(),
        credentialUrl: document.getElementById('newCertUrl').value.trim(),
        image: document.getElementById('newCertImage').value.trim() || 'assets/cert_previews/Coursera_AI_Certificate.png',
        pdf: document.getElementById('newCertPdf').value.trim() || 'assets/certificates/Coursera AI Certificate.pdf',
        description: document.getElementById('newCertDesc').value.trim()
      };

      data.certifications.unshift(newCert);
      PortfolioDataStore.saveData(data);
      closeAdminModal('addCertModal');
      addCertForm.reset();
      renderCertTable();
      alert('Certification added successfully!');
    });
  }

  // Add Project Form Handler
  const addProjectForm = document.getElementById('addProjectForm');
  if (addProjectForm) {
    addProjectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = await PortfolioDataStore.getData();

      const techs = document.getElementById('newProjTech').value.split(',').map(s => s.trim()).filter(Boolean);

      const newProj = {
        id: 'proj-' + Date.now(),
        title: document.getElementById('newProjTitle').value.trim(),
        tagline: document.getElementById('newProjTagline').value.trim(),
        category: document.getElementById('newProjCategory').value,
        featured: document.getElementById('newProjFeatured').checked,
        technologies: techs,
        github: document.getElementById('newProjGithub').value.trim(),
        demo: 'project-details.html',
        date: '2026',
        summary: document.getElementById('newProjSummary').value.trim(),
        overview: document.getElementById('newProjOverview').value.trim(),
        problem: document.getElementById('newProjProblem').value.trim(),
        methodology: document.getElementById('newProjMethod').value.trim(),
        results: document.getElementById('newProjResults').value.trim(),
        metrics: [
          { label: 'Status', value: 'Production Ready' },
          { label: 'Evaluation', value: 'Verified' }
        ]
      };

      data.projects.unshift(newProj);
      PortfolioDataStore.saveData(data);
      closeAdminModal('addProjectModal');
      addProjectForm.reset();
      renderProjectTable();
      alert('Project added successfully!');
    });
  }

  // Add Experience Form Handler
  const addExpForm = document.getElementById('addExpForm');
  if (addExpForm) {
    addExpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = await PortfolioDataStore.getData();

      const resps = document.getElementById('newExpResp').value.split('\n').map(s => s.trim()).filter(Boolean);
      const techs = document.getElementById('newExpTech').value.split(',').map(s => s.trim()).filter(Boolean);

      const newExp = {
        id: 'exp-' + Date.now(),
        role: document.getElementById('newExpRole').value.trim(),
        organization: document.getElementById('newExpOrg').value.trim(),
        period: document.getElementById('newExpPeriod').value.trim(),
        type: document.getElementById('newExpType').value.trim(),
        location: document.getElementById('newExpLocation').value.trim() || 'Remote',
        description: document.getElementById('newExpDesc').value.trim(),
        responsibilities: resps,
        technologies: techs,
        achievements: []
      };

      data.experience.unshift(newExp);
      PortfolioDataStore.saveData(data);
      closeAdminModal('addExpModal');
      addExpForm.reset();
      renderExpTable();
      alert('Experience entry added successfully!');
    });
  }

  // Modal helpers
  window.openAdminModal = function (modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add('active');
  };

  window.closeAdminModal = function (modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('active');
  };

  window.exportPortfolioJSON = function () {
    PortfolioDataStore.exportJSON();
  };

  window.resetPortfolioDefault = async function () {
    if (confirm('Reset portfolio to original default certified data? All custom local changes will be cleared.')) {
      await PortfolioDataStore.resetData();
      loadAllTables();
      alert('Portfolio data reset to default.');
    }
  };
});
