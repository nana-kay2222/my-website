// DOM Elements
const tabSignIn = document.getElementById('tab-signin');
const tabSignUp = document.getElementById('tab-signup');
const signupFields = document.getElementById('signup-fields');
const confirmPasswordField = document.getElementById('confirm-password-field');
const authSubtitle = document.getElementById('auth-subtitle');
const submitBtn = document.getElementById('submit-btn');
const authForm = document.getElementById('auth-form');
const googleBtn = document.getElementById('google-btn');
const alertBox = document.getElementById('alert-box');
const signupRequiredInputs = document.querySelectorAll('.signup-req');
const authCard = alertBox.closest('div'); // Grab the main card container

let isSignUpMode = false;

// Helper: Show alert messages, shake the card, and scroll to view
function showAlert(msg, isError = true) {
  alertBox.innerText = msg;
  alertBox.className = `mb-4 p-3 rounded-lg text-sm font-semibold text-center block ${
    isError ? 'bg-red-900/80 text-red-200 border border-red-700' : 'bg-green-900/80 text-green-200 border border-green-700'
  }`;

  // Smooth scroll up to the alert box so the user sees the error
  alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // If it's an error, trigger the card shake animation
  if (isError && authCard) {
    authCard.classList.remove('animate-shake');
    // Force a reflow to restart animation if triggered multiple times
    void authCard.offsetWidth; 
    authCard.classList.add('animate-shake');
  }
}

// Tab Switching Logic (Sign Up)
tabSignUp.addEventListener('click', () => {
  isSignUpMode = true;

  tabSignUp.classList.add('bg-blue-600', 'text-white', 'shadow');
  tabSignUp.classList.remove('text-gray-400', 'hover:text-white');

  tabSignIn.classList.remove('bg-blue-600', 'text-white', 'shadow');
  tabSignIn.classList.add('text-gray-400', 'hover:text-white');

  signupFields.classList.remove('hidden');
  confirmPasswordField.classList.remove('hidden');
  signupRequiredInputs.forEach(i => i.setAttribute('required', 'true'));

  authSubtitle.innerText = "Create a new account to get started";
  submitBtn.innerText = "Create Account";
  alertBox.classList.add('hidden');
});

// Tab Switching Logic (Sign In)
tabSignIn.addEventListener('click', () => {
  isSignUpMode = false;

  tabSignIn.classList.add('bg-blue-600', 'text-white', 'shadow');
  tabSignIn.classList.remove('text-gray-400', 'hover:text-white');

  tabSignUp.classList.remove('bg-blue-600', 'text-white', 'shadow');
  tabSignUp.classList.add('text-gray-400', 'hover:text-white');

  signupFields.classList.add('hidden');
  confirmPasswordField.classList.add('hidden');
  signupRequiredInputs.forEach(i => i.removeAttribute('required'));

  authSubtitle.innerText = "Sign in to your account to continue";
  submitBtn.innerText = "Sign In";
  alertBox.classList.add('hidden');
});

// Form Submission Handler
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (isSignUpMode) {
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      showAlert("Passwords do not match!");
      return; // STOP execution — do not redirect!
    }

    if (password.length < 6) {
      showAlert("Password must be at least 6 characters long.");
      return; // STOP execution!
    }

    submitBtn.innerText = "Creating Account...";

    // TODO: Connect Supabase Sign Up here
    
    showAlert("Account created successfully! Redirecting...", false);
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);

  } else {
    // SIGN IN MODE
    submitBtn.innerText = "Signing In...";

    // DEMO / DUMMY VALIDATION:
    // Since we don't have a backend DB connected yet, simulate an invalid account error 
    // unless they type a specific test password like "password123"
    if (password !== "password123") {
      submitBtn.innerText = "Sign In";
      showAlert("Invalid credentials! Password does not match or account does not exist.");
      return; // STOP execution — do not redirect!
    }

    // TODO: Connect Supabase Sign In here

    showAlert("Signed in successfully! Redirecting...", false);
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);
  }
});

// Google Sign-In Handler
googleBtn.addEventListener('click', async () => {
  // TODO: Replace with Supabase OAuth when ready
  showAlert("Google Sign-In successful! Redirecting...", false);
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1200);
});