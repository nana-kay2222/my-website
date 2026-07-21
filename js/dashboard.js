document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  const updateModal = document.getElementById('update-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const modalForm = document.getElementById('modal-update-form');
  
  const modalReportId = document.getElementById('modal-report-id');
  const modalReportTitle = document.getElementById('modal-report-title');

  // Handle Logout & Redirect
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.location.href = "auth.html";
    });
  }

  // Open Modal Function
  function openModal(reportId, reportTitle) {
    if (modalReportId) modalReportId.innerText = reportId;
    if (modalReportTitle) modalReportTitle.innerText = reportTitle;
    
    updateModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden'); // Prevent background scrolling
  }

  // Close Modal Function
  function closeModal() {
    updateModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  // Attach Open Listeners to all "Update Status" buttons
  document.querySelectorAll('button').forEach(btn => {
    if (btn.innerText.trim() === 'Update Status') {
      btn.addEventListener('click', (e) => {
        // Find the parent card element to extract report info dynamically
        const card = e.target.closest('.bg-gray-950\\/70') || e.target.closest('div.space-y-4 > div');
        const reportId = card ? card.querySelector('.font-mono')?.innerText || '#REP-2026-000' : '#REP-2026-000';
        const reportTitle = card ? card.querySelector('h3')?.innerText || 'Inspection Issue' : 'Inspection Issue';

        openModal(reportId, reportTitle);
      });
    }
  });

  // Close Modal Handlers
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

  // Close when clicking dark background outside the modal card
  if (updateModal) {
    updateModal.addEventListener('click', (e) => {
      if (e.target === updateModal) closeModal();
    });
  }

  // Handle Form Submit
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newStatus = document.getElementById('modal-status-select').value;
      const notes = document.getElementById('modal-notes').value.trim();

      // Placeholder for backend update logic
      alert(`Status updated to "${newStatus}"! Notes saved.`);

      closeModal();
    });
  }
});