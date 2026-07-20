// State
let isSignUpMode = false;

// DOM Elements
const tabSignIn = document.getElementById('tab-signin');
const tabSignUp = document.getElementById('tab-signup');
const nameField = document.getElementById('name-field');
const nameInput = document.getElementById('name-input');
const authSubtitle = document.getElementById('auth-subtitle');
const submitBtn = document.getElementById('submit-btn');
const authForm = document.getElementById('auth-form');
const googleBtn = document.getElementById('google-btn');

// Switch between Sign In and Sign Up tabs
tabSignIn.addEventListener('click', () => {
  isSignUpMode = false;
  tabSignIn.className = "w-1/2 py-2 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow";
  tabSignUp.className = "w-1/2 py-2 rounded-lg font-semibold text-sm transition text-gray-400 hover:text-white";
  nameField.classList.add('hidden');
  nameInput.removeAttribute('required');
  authSubtitle.innerText = "Sign in to your account to continue";
  submitBtn.innerText = "Sign In";
});

tabSignUp.addEventListener('click', () => {
  isSignUpMode = true;
  tabSignUp.className = "w-1/2 py-2 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow";
  tabSignIn.className = "w-1/2 py-2 rounded-lg font-semibold text-sm transition text-gray-400 hover:text-white";
  nameField.classList.remove('hidden');
  nameInput.setAttribute('required', 'true');
  authSubtitle.innerText = "Create a new account to get started";
  submitBtn.innerText = "Create Account";
});

// Handle Form Submission
authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Store user's name in local storage so the dashboard can greet them
  const userName = isSignUpMode ? nameInput.value : "User";
  localStorage.setItem('loggedInUser', userName);

  // Redirect to dashboard
  window.location.href = 'dashboard.html';
});

// Handle Google Sign In
googleBtn.addEventListener('click', () => {
  // Simulate Google login by saving a demo name
  localStorage.setItem('loggedInUser', 'Alex (Google User)');
  window.location.href = 'dashboard.html';
});