// Grab the Get Started Button
const getStartedBtn = document.getElementById('get-started-btn');

// Listen for click event
getStartedBtn.addEventListener('click', function() {
  // Redirect to the sign in / sign up page
  window.location.href = 'auth.html';
});