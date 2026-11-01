/**
 * MY_JANNE Certifications Gallery & Modal Controller
 * Renders verified Coursera & Stanford certificates with filtering,
 * live keyword search, high-resolution preview modal, and PDF links.
 */

document.addEventListener('DOMContentLoaded', async function () {
  const grid = document.getElementById('certificationsGrid');
  const filterTabs = document.querySelectorAll('.cert-filter-tabs .filter-tab');
  const searchInput = document.getElementById('certSearchInput');
  const modal = document.getElementById('certModal');
  const modalCloseBtn = document.getElementById('certModalClose');

  let currentCategory = 'all';
  let currentSearch = '';

  async function renderCerts() {
    if (!grid) return;
    const certs = await PortfolioDataStore.getCertifications(currentCategory, currentSearch);

    if (certs.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <i class="fa-solid fa-file-circle-xmark" style="font-size: 2.5rem; margin-bottom: 12px; color: var(--accent-cyan);"></i>
          <h3>No certifications found</h3>
          <p>Try refining your search keyword or selected category tab.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = certs.map((c, index) => `
      <div class="cert-card" data-id="${c.id}">
        <div class="cert-thumb-container" onclick="openCertModal('${c.id}')" title="Click to inspect certificate">
          <img src="${c.image}" alt="${c.title}" class="cert-thumb-img" loading="lazy">
          <div class="cert-thumb-overlay">
            <span class="cert-zoom-btn"><i class="fa-solid fa-expand"></i> Inspect Certificate</span>
          </div>
        </div>
        <div class="cert-body">
          <div class="cert-meta-row">
            <span class="cert-issuer"><i class="fa-solid fa-award"></i> ${c.issuer}</span>
            <span class="cert-date">${c.date}</span>
          </div>
          <h3 class="cert-title">${c.title}</h3>
          ${c.instructor ? `<div class="cert-instructor"><i class="fa-solid fa-user-tie"></i> ${c.instructor}</div>` : ''}
          <p class="cert-desc">${c.description}</p>
          <div class="cert-actions">
            <button class="btn btn-secondary btn-sm" onclick="openCertModal('${c.id}')">
              <i class="fa-solid fa-circle-info"></i> Details
            </button>
            <a href="${c.pdf}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-file-pdf"></i> View PDF
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Filter tabs click
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-filter') || 'all';
      renderCerts();
    });
  });

  // Search input with debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearch = e.target.value;
        renderCerts();
      }, 200);
    });
  }

  // Modal open
  window.openCertModal = async function (certId) {
    if (!modal) return;
    const certs = await PortfolioDataStore.getCertifications('all', '');
    const cert = certs.find(c => c.id === certId);
    if (!cert) return;

    document.getElementById('modalCertTitle').textContent = cert.title;
    document.getElementById('modalCertImg').src = cert.image;
    document.getElementById('modalCertImg').alt = cert.title;
    document.getElementById('modalCertIssuer').textContent = cert.issuer;
    document.getElementById('modalCertDate').textContent = cert.date;
    document.getElementById('modalCertInstructor').textContent = cert.instructor || 'Authorized Course Provider';
    document.getElementById('modalCertId').textContent = cert.credentialId || 'Verified Record';
    document.getElementById('modalCertDesc').textContent = cert.description;

    const verifyBtn = document.getElementById('modalVerifyBtn');
    if (verifyBtn) {
      verifyBtn.href = cert.credentialUrl || '#';
      verifyBtn.style.display = cert.credentialUrl ? 'inline-flex' : 'none';
    }

    const pdfBtn = document.getElementById('modalPdfBtn');
    if (pdfBtn) {
      pdfBtn.href = cert.pdf;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Modal close
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Initial render
  await renderCerts();
});
