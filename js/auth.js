document.addEventListener('DOMContentLoaded', () => {
  const tabSignIn = document.getElementById('tab-signin');
  const tabSignUp = document.getElementById('tab-signup');
  const signupFields = document.getElementById('signup-fields');
  const confirmPasswordField = document.getElementById('confirm-password-field');
  const authSubtitle = document.getElementById('auth-subtitle');
  const submitBtn = document.getElementById('submit-btn');
  const signupRequiredInputs = document.querySelectorAll('.signup-req');

  if (tabSignIn && tabSignUp) {
    // Switch to Sign In Mode
    tabSignIn.addEventListener('click', (e) => {
      e.preventDefault();
      tabSignIn.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow cursor-pointer";
      tabSignUp.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition text-gray-400 hover:text-white cursor-pointer";
      
      if (signupFields) signupFields.classList.add('hidden');
      if (confirmPasswordField) confirmPasswordField.classList.add('hidden');
      
      signupRequiredInputs.forEach(input => input.removeAttribute('required'));
      
      if (authSubtitle) authSubtitle.innerText = "Sign in to your account to continue";
      if (submitBtn) submitBtn.innerText = "Sign In";
    });

    // Switch to Sign Up Mode
    tabSignUp.addEventListener('click', (e) => {
      e.preventDefault();
      tabSignUp.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow cursor-pointer";
      tabSignIn.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition text-gray-400 hover:text-white cursor-pointer";
      
      if (signupFields) signupFields.classList.remove('hidden');
      if (confirmPasswordField) confirmPasswordField.classList.remove('hidden');
      
      signupRequiredInputs.forEach(input => input.setAttribute('required', 'true'));
      
      if (authSubtitle) authSubtitle.innerText = "Create a new account to get started";
      if (submitBtn) submitBtn.innerText = "Create Account";
    });
  }
});