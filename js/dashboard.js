document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');

  // Handle Logout & Redirect
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Clear session/local state if needed later
      window.location.href = "auth.html";
    });
  }
});