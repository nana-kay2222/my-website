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

let isSignUpMode = false;

// Helper: Show alert messages
function showAlert(msg, isError = true) {
  alertBox.innerText = msg;
  alertBox.className = `mb-4 p-3 rounded-lg text-sm font-semibold text-center block ${
    isError ? 'bg-red-900/80 text-red-200 border border-red-700' : 'bg-green-900/80 text-green-200 border border-green-700'
  }`;
}

// Toggle Tab Logic
// Toggle Tab Logic
tabSignUp.onclick = () => {
  isSignUpMode = true;
  // Active state for Sign Up tab
  tabSignUp.classList.add('bg-blue-600', 'text-white', 'shadow');
  tabSignUp.classList.remove('text-gray-400', 'hover:text-white');
  
  // Inactive state for Sign In tab
  tabSignIn.classList.remove('bg-blue-600', 'text-white', 'shadow');
  tabSignIn.classList.add('text-gray-400', 'hover:text-white');

  // Show Sign Up fields
  signupFields.classList.remove('hidden');
  confirmPasswordField.classList.remove('hidden');
  signupRequiredInputs.forEach(i => i.setAttribute('required', 'true'));
  authSubtitle.innerText = "Create a new account to get started";
  submitBtn.innerText = "Create Account";
  alertBox.classList.add('hidden');
};

tabSignIn.onclick = () => {
  isSignUpMode = false;
  // Active state for Sign In tab
  tabSignIn.classList.add('bg-blue-600', 'text-white', 'shadow');
  tabSignIn.classList.remove('text-gray-400', 'hover:text-white');
  
  // Inactive state for Sign Up tab
  tabSignUp.classList.remove('bg-blue-600', 'text-white', 'shadow');
  tabSignUp.classList.add('text-gray-400', 'hover:text-white');

  // Hide Sign Up fields
  signupFields.classList.add('hidden');
  confirmPasswordField.classList.add('hidden');
  signupRequiredInputs.forEach(i => i.removeAttribute('required'));
  authSubtitle.innerText = "Sign in to your account to continue";
  submitBtn.innerText = "Sign In";
  alertBox.classList.add('hidden');
};
tabSignIn.onclick = () => {
  isSignUpMode = false;
  tabSignIn.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow cursor-pointer";
  tabSignUp.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition text-gray-400 hover:text-white cursor-pointer";
  signupFields.classList.add('hidden');
  confirmPasswordField.classList.add('hidden');
  signupRequiredInputs.forEach(i => i.removeAttribute('required'));
  authSubtitle.innerText = "Sign in to your account to continue";
  submitBtn.innerText = "Sign In";
  alertBox.classList.add('hidden');
};

// Form Submission Handler
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (isSignUpMode) {
    const confirmPassword = document.getElementById('confirm-password').value;
    if (password !== confirmPassword) {
      showAlert("Passwords do not match!");
      return;
    }

    submitBtn.innerText = "Creating Account...";
    
    // TODO: Replace with Supabase Sign Up call when backend is ready:
    // const { data, error } = await supabase.auth.signUp({ email, password });

    showAlert("Account created successfully! Redirecting...", false);
  } else {
    submitBtn.innerText = "Signing In...";

    // TODO: Replace with Supabase Sign In call when backend is ready:
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    showAlert("Signed in successfully! Redirecting...", false);
  }

  // Simulate page redirect
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1200);
});

// Google Sign-In Handler
googleBtn.onclick = async () => {
  // TODO: Replace with Supabase OAuth when backend team sets up Google provider:
  // await supabase.auth.signInWithOAuth({ provider: 'google' });

  showAlert("Google Sign-In successful! Redirecting...", false);
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1200);
};