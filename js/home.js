
const getStartedBtn = document.getElementById('get-started-btn');

if (getStartedBtn) {
  getStartedBtn.addEventListener('click', () => {
    window.location.href = 'auth.html';
  });
}