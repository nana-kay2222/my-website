document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('update-modal');

  // 1. Sign Out Button
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    window.location.href = 'auth.html';
  });

  // 2. Open Modal when clicking any "Update Status" button
  document.querySelectorAll('button').forEach(btn => {
    if (btn.innerText.trim() === 'Update Status') {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('div.bg-gray-950\\/70');
        document.getElementById('modal-report-id').innerText = card?.querySelector('.font-mono')?.innerText || '#REP';
        document.getElementById('modal-report-title').innerText = card?.querySelector('h3')?.innerText || 'Issue';
        modal?.classList.remove('hidden');
      });
    }
  });

  // 3. Close Modal (Cancel or X button)
  const closeModal = () => modal?.classList.add('hidden');
  document.getElementById('close-modal-btn')?.addEventListener('click', closeModal);
  document.getElementById('cancel-modal-btn')?.addEventListener('click', closeModal);

  // 4. Submit Status Update
  document.getElementById('modal-update-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Status updated successfully!');
    closeModal();
  });
});