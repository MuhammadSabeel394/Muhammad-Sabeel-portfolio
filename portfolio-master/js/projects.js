/**
 * MY_JANNE Projects Showcase & Detailed Specification Controller
 * Supports multi-page navigation, category filtering, search,
 * and deep project specification rendering on project-details.html.
 */

document.addEventListener('DOMContentLoaded', async function () {
  const projectGrid = document.getElementById('projectsGrid');
  const featuredGrid = document.getElementById('featuredProjectsGrid');
  const filterTabs = document.querySelectorAll('.project-filter-tabs .filter-tab');
  const searchInput = document.getElementById('projectSearchInput');
  const specContainer = document.getElementById('projectSpecContainer');

  let currentCategory = 'all';
  let currentSearch = '';

  // 1. Render Project Cards on projects.html
  async function renderProjects() {
    if (!projectGrid) return;
    const projects = await PortfolioDataStore.getProjects(currentCategory, currentSearch);

    if (projects.length === 0) {
      projectGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 12px; color: var(--accent-cyan);"></i>
          <h3>No projects found</h3>
          <p>Try searching for technologies like Python, PyTorch, PyTest, or LLM.</p>
        </div>
      `;
      return;
    }

    projectGrid.innerHTML = projects.map(p => `
      <div class="project-card ${p.featured ? 'featured-card' : ''}">
        <div class="project-card-header">
          <div class="project-icon-node">
            <i class="${getCategoryIcon(p.category)}"></i>
          </div>
          <span class="badge badge-ai">${p.category}</span>
        </div>
        <div class="project-card-body">
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-tagline">${p.tagline}</p>
          <p class="project-card-summary">${p.summary}</p>
          <div class="project-tech-tags">
            ${p.technologies.slice(0, 5).map(t => `<span class="badge badge-tag">${t}</span>`).join('')}
            ${p.technologies.length > 5 ? `<span class="badge badge-tag">+${p.technologies.length - 5}</span>` : ''}
          </div>
          <div class="project-card-footer">
            <a href="project-details.html?id=${p.id}" class="project-detail-link">
              View Technical Specs <i class="fa-solid fa-arrow-right"></i>
            </a>
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="GitHub Repo"><i class="fa-brands fa-github"></i></a>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }

  // 2. Render Featured Projects on index.html
  async function renderFeaturedProjects() {
    if (!featuredGrid) return;
    const allProjects = await PortfolioDataStore.getProjects('all', '');
    const featured = allProjects.filter(p => p.featured).slice(0, 3);

    featuredGrid.innerHTML = featured.map(p => `
      <div class="glass-card project-card featured-card">
        <div class="project-card-header">
          <div class="project-icon-node">
            <i class="${getCategoryIcon(p.category)}"></i>
          </div>
          <span class="badge badge-ai">${p.category}</span>
        </div>
        <div class="project-card-body">
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-tagline">${p.tagline}</p>
          <p class="project-card-summary">${p.summary}</p>
          <div class="project-tech-tags">
            ${p.technologies.slice(0, 4).map(t => `<span class="badge badge-tag">${t}</span>`).join('')}
          </div>
          <div class="project-card-footer">
            <a href="project-details.html?id=${p.id}" class="project-detail-link">
              Read Deep Technical Specs <i class="fa-solid fa-arrow-right"></i>
            </a>
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="social-icon-btn"><i class="fa-brands fa-github"></i></a>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }

  // 3. Render Deep Project Details on project-details.html
  async function renderProjectDetails() {
    if (!specContainer) return;
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id') || 'my-janne-ecosystem';
    const project = await PortfolioDataStore.getProjectById(projectId);

    if (!project) {
      specContainer.innerHTML = `
        <div class="container" style="text-align: center; padding: 120px 20px;">
          <h2>Project Not Found</h2>
          <p style="color: var(--text-secondary); margin: 16px 0 24px;">The requested project specifications could not be located.</p>
          <a href="projects.html" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Return to Projects Gallery</a>
        </div>
      `;
      return;
    }

    // Set page title
    document.title = `${project.title} — Technical Specifications | M. Sabeel`;

    specContainer.innerHTML = `
      <!-- Spec Hero -->
      <section class="project-spec-hero">
        <div class="container">
          <div class="breadcrumbs">
            <a href="index.html">Home</a> <span>/</span>
            <a href="projects.html">Projects</a> <span>/</span>
            <span>${project.title}</span>
          </div>
          <span class="badge badge-ai" style="margin-bottom: 14px;">${project.category}</span>
          <h1 class="project-spec-title">${project.title}</h1>
          <p class="project-spec-tagline">${project.tagline}</p>

          <div class="project-spec-meta-bar">
            <div class="spec-meta-item">
              <i class="fa-solid fa-calendar-check"></i>
              <span>Year: <strong>${project.date || '2026'}</strong></span>
            </div>
            <div class="spec-meta-item">
              <i class="fa-solid fa-microchip"></i>
              <span>Core Stack: <strong>${project.technologies[0] || 'Python'}</strong></span>
            </div>
            <div class="spec-meta-item">
              <i class="fa-solid fa-shield-halved"></i>
              <span>Status: <strong>Production Ready / Tested</strong></span>
            </div>
          </div>

          <div class="project-spec-actions">
            ${project.github ? `
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fa-brands fa-github"></i> Inspect GitHub Repository
              </a>
            ` : ''}
            <a href="projects.html" class="btn btn-secondary">
              <i class="fa-solid fa-arrow-left"></i> Back to All Projects
            </a>
          </div>
        </div>
      </section>

      <!-- Key Metrics Strip -->
      ${project.metrics && project.metrics.length > 0 ? `
        <section class="container">
          <div class="metrics-strip">
            ${project.metrics.map(m => `
              <div class="metric-box">
                <div class="metric-val">${m.value}</div>
                <div class="metric-lbl">${m.label}</div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- Detailed Specification Body -->
      <section class="project-spec-body">
        <div class="container">
          
          <!-- 1. Overview -->
          <div class="spec-section">
            <h2 class="spec-section-heading"><i class="fa-solid fa-compass"></i> System Overview</h2>
            <p class="spec-text">${project.overview || project.summary}</p>
          </div>

          <!-- 2. Problem Statement -->
          <div class="spec-section">
            <h2 class="spec-section-heading"><i class="fa-solid fa-triangle-exclamation"></i> Problem Statement</h2>
            <p class="spec-text">${project.problem || 'Addressing complex computational challenges in modern AI pipelines and data architectures.'}</p>
          </div>

          <!-- 3. Objectives -->
          ${project.objectives && project.objectives.length > 0 ? `
            <div class="spec-section">
              <h2 class="spec-section-heading"><i class="fa-solid fa-bullseye"></i> Engineering Objectives</h2>
              <ul class="spec-objectives-list">
                ${project.objectives.map(obj => `<li>${obj}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- 4. Technologies Used -->
          <div class="spec-section">
            <h2 class="spec-section-heading"><i class="fa-solid fa-layer-group"></i> Technologies & Frameworks</h2>
            <div class="project-tech-tags" style="margin-top: 16px;">
              ${project.technologies.map(t => `<span class="badge badge-tag" style="font-size: 0.9rem; padding: 6px 14px;">${t}</span>`).join('')}
            </div>
          </div>

          <!-- 5. Methodology & Implementation -->
          <div class="spec-section">
            <h2 class="spec-section-heading"><i class="fa-solid fa-gears"></i> Methodology & Architecture</h2>
            <p class="spec-text">${project.methodology || 'Structured modular engineering with separation of concerns and deterministic pipeline controls.'}</p>
            <p class="spec-text">${project.implementation || 'Implemented using object-oriented Python, standard PEP 517 packaging, and automated test coverage.'}</p>
          </div>

          <!-- 6. Results & Impact -->
          <div class="spec-section">
            <h2 class="spec-section-heading"><i class="fa-solid fa-chart-line"></i> Benchmark Results & Verification</h2>
            <p class="spec-text">${project.results || 'Demonstrated reliable execution, verified by comprehensive unit tests and automated benchmarks.'}</p>
          </div>

        </div>
      </section>
    `;
  }

  function getCategoryIcon(cat) {
    if (!cat) return 'fa-solid fa-brain';
    const c = cat.toLowerCase();
    if (c.includes('autonomous')) return 'fa-solid fa-robot';
    if (c.includes('llm') || c.includes('genai')) return 'fa-solid fa-wand-magic-sparkles';
    if (c.includes('machine')) return 'fa-solid fa-brain';
    if (c.includes('deep')) return 'fa-solid fa-network-wired';
    if (c.includes('analytics') || c.includes('data')) return 'fa-solid fa-chart-simple';
    return 'fa-solid fa-code';
  }

  // Filter tab interactions
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-filter') || 'all';
      renderProjects();
    });
  });

  // Search input with debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearch = e.target.value;
        renderProjects();
      }, 200);
    });
  }

  // Execute
  await renderProjects();
  await renderFeaturedProjects();
  await renderProjectDetails();
});
