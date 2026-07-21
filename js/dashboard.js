document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENT REFERENCES ---
  const logoutBtn = document.getElementById('logout-btn');
  const searchInput = document.getElementById('search-input');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const taskCards = document.querySelectorAll('.task-card');

  // Modals
  const updateModal = document.getElementById('update-modal');
  const detailsModal = document.getElementById('details-modal');

  let activeCard = null; // Currently selected card

  // --- 1. SIGN OUT ROUTER ---
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.location.href = "auth.html";
    });
  }

  // --- 2. UPDATE METRICS COUNTERS ---
  function recalculateMetrics() {
    let total = 0;
    let critical = 0;
    let inProgress = 0;
    let resolved = 0;

    document.querySelectorAll('.task-card').forEach(card => {
      total++;
      const priority = card.getAttribute('data-priority');
      const status = card.getAttribute('data-status');

      if (priority === 'CRITICAL') critical++;
      if (status === 'In Progress') inProgress++;
      if (status === 'Resolved') resolved++;
    });

    document.getElementById('cnt-total').innerText = total;
    document.getElementById('cnt-critical').innerText = critical;
    document.getElementById('cnt-progress').innerText = inProgress;
    document.getElementById('cnt-resolved').innerText = resolved;
  }

  // --- 3. SEARCH & FILTER TABS LOGIC ---
  let currentFilter = 'All';

  function applyFilterAndSearch() {
    const query = searchInput.value.toLowerCase().trim();

    taskCards.forEach(card => {
      const status = card.getAttribute('data-status');
      const priority = card.getAttribute('data-priority');
      const cardText = card.innerText.toLowerCase();

      const matchesSearch = cardText.includes(query);
      let matchesFilter = false;

      if (currentFilter === 'All') matchesFilter = true;
      else if (currentFilter === 'Critical') matchesFilter = (priority === 'CRITICAL');
      else matchesFilter = (status === currentFilter);

      if (matchesSearch && matchesFilter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.className = 'filter-tab py-1.5 px-4 rounded-lg text-xs font-semibold text-gray-400 hover:text-white transition cursor-pointer';
      });
      tab.className = 'filter-tab py-1.5 px-4 rounded-lg text-xs font-semibold bg-blue-600 text-white transition cursor-pointer';

      currentFilter = tab.getAttribute('data-filter');
      applyFilterAndSearch();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilterAndSearch);
  }

  // --- 4. UPDATE STATUS MODAL HANDLERS ---
  document.querySelectorAll('.btn-update-status').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeCard = e.target.closest('.task-card');
      
      const id = activeCard.getAttribute('data-id');
      const title = activeCard.getAttribute('data-title');
      const status = activeCard.getAttribute('data-status');

      document.getElementById('modal-update-id').innerText = id;
      document.getElementById('modal-update-title').innerText = title;
      document.getElementById('modal-status-select').value = status;
      document.getElementById('modal-notes-input').value = '';

      updateModal.classList.remove('hidden');
    });
  });

  function closeUpdateModal() {
    updateModal.classList.add('hidden');
    activeCard = null;
  }

  document.getElementById('close-update-modal')?.addEventListener('click', closeUpdateModal);
  document.getElementById('cancel-update-modal')?.addEventListener('click', closeUpdateModal);

  document.getElementById('update-status-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    if (activeCard) {
      const newStatus = document.getElementById('modal-status-select').value;
      const statusBadge = activeCard.querySelector('.badge-status');

      activeCard.setAttribute('data-status', newStatus);
      if (statusBadge) statusBadge.innerText = newStatus;

      // Update badge styling based on new selection
      if (newStatus === 'Resolved') {
        statusBadge.className = 'badge-status px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60';
      } else if (newStatus === 'In Progress') {
        statusBadge.className = 'badge-status px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60';
      } else if (newStatus === 'Pending Inspection') {
        statusBadge.className = 'badge-status px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800/60';
      } else if (newStatus === 'Escalated') {
        statusBadge.className = 'badge-status px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-950 text-red-300 border border-red-800/60';
      }

      recalculateMetrics();
      applyFilterAndSearch();
    }

    closeUpdateModal();
  });

  // --- 5. VIEW DETAILS MODAL HANDLERS ---
  document.querySelectorAll('.btn-view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.task-card');

      document.getElementById('details-report-id').innerText = card.getAttribute('data-id');
      document.getElementById('details-title').innerText = card.getAttribute('data-title');
      document.getElementById('details-desc').innerText = card.getAttribute('data-desc');
      document.getElementById('details-location').innerText = card.getAttribute('data-location');
      document.getElementById('details-reporter').innerText = card.getAttribute('data-reporter');
      document.getElementById('details-img').src = card.getAttribute('data-img');

      detailsModal.classList.remove('hidden');
    });
  });

  document.getElementById('close-details-modal')?.addEventListener('click', () => {
    detailsModal.classList.add('hidden');
  });

  // Close modals when clicking outside window
  window.addEventListener('click', (e) => {
    if (e.target === updateModal) closeUpdateModal();
    if (e.target === detailsModal) detailsModal.classList.add('hidden');
  });
});