// Load logged-in user name from Local Storage
const userName = localStorage.getItem('loggedInUser') || 'User';
const greetingElement = document.getElementById('user-greeting');
const logoutBtn = document.getElementById('logout-btn');

// Display Personalized Greeting
greetingElement.innerText = `Hi, ${userName}!`;

// Logout Handler
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'auth.html';
});