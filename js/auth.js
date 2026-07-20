const tabSignIn = document.getElementById('tab-signin');
const tabSignUp = document.getElementById('tab-signup');
const signupFields = document.getElementById('signup-fields');
const confirmPasswordField = document.getElementById('confirm-password-field');
const authSubtitle = document.getElementById('auth-subtitle');
const submitBtn = document.getElementById('submit-btn');
const signupRequiredInputs = document.querySelectorAll('.signup-req');

// Switch to Sign In Mode
tabSignIn.addEventListener('click', () => {
  tabSignIn.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow cursor-pointer";
  tabSignUp.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition text-gray-400 hover:text-white cursor-pointer";
  
  signupFields.classList.add('hidden');
  confirmPasswordField.classList.add('hidden');
  
  signupRequiredInputs.forEach(input => input.removeAttribute('required'));
  
  authSubtitle.innerText = "Sign in to your account to continue";
  submitBtn.innerText = "Sign In";
});

// Switch to Sign Up Mode
tabSignUp.addEventListener('click', () => {
  tabSignUp.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow cursor-pointer";
  tabSignIn.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition text-gray-400 hover:text-white cursor-pointer";
  
  signupFields.classList.remove('hidden');
  confirmPasswordField.classList.remove('hidden');
  
  signupRequiredInputs.forEach(input => input.setAttribute('required', 'true'));
  
  authSubtitle.innerText = "Create a new account to get started";
  submitBtn.innerText = "Create Account";
});