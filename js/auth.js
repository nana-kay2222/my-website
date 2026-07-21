document.addEventListener('DOMContentLoaded', () => {
  const tabSignIn = document.getElementById('tab-signin');
  const tabSignUp = document.getElementById('tab-signup');
  const signupFields = document.getElementById('signup-fields');
  const confirmPasswordField = document.getElementById('confirm-password-field');
  const authSubtitle = document.getElementById('auth-subtitle');
  const submitBtn = document.getElementById('submit-btn');
  const authForm = document.getElementById('auth-form');
  const alertBox = document.getElementById('alert-box');
  const authCard = document.getElementById('auth-card');

  let isSignUpMode = false;

  // Error Handler (Shakes card + Shows error without wiping inputs)
  function showError(msg) {
    alertBox.innerText = msg;
    alertBox.className = "mb-4 p-3 rounded-lg text-sm font-semibold text-center block bg-red-900/90 text-red-100 border border-red-600";
    
    if (authCard) {
      authCard.classList.remove('shake');
      void authCard.offsetWidth; // Force CSS reflow
      authCard.classList.add('shake');
    }
  }

  function showSuccess(msg) {
    alertBox.innerText = msg;
    alertBox.className = "mb-4 p-3 rounded-lg text-sm font-semibold text-center block bg-green-900/90 text-green-100 border border-green-600";
  }

  // --- TAB TOGGLE ---
  tabSignUp.addEventListener('click', () => {
    isSignUpMode = true;

    tabSignUp.classList.add('bg-blue-600', 'text-white');
    tabSignUp.classList.remove('text-gray-400');

    tabSignIn.classList.remove('bg-blue-600', 'text-white');
    tabSignIn.classList.add('text-gray-400');

    signupFields.classList.remove('hidden');
    confirmPasswordField.classList.remove('hidden');

    authSubtitle.innerText = "Create a new account to get started";
    submitBtn.innerText = "Create Account";
    alertBox.classList.add('hidden');
  });

  tabSignIn.addEventListener('click', () => {
    isSignUpMode = false;

    tabSignIn.classList.add('bg-blue-600', 'text-white');
    tabSignIn.classList.remove('text-gray-400');

    tabSignUp.classList.remove('bg-blue-600', 'text-white');
    tabSignUp.classList.add('text-gray-400');

    signupFields.classList.add('hidden');
    confirmPasswordField.classList.add('hidden');

    authSubtitle.innerText = "Sign in to your account to continue";
    submitBtn.innerText = "Sign In";
    alertBox.classList.add('hidden');
  });

  // --- SUBMIT HANDLER ---
  authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents page reload & data deletion

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email) {
      showError("Please enter your email address.");
      return;
    }

    if (!password) {
      showError("Please enter your password.");
      return;
    }

    if (isSignUpMode) {
      const firstName = document.getElementById('first-name').value.trim();
      const lastName = document.getElementById('last-name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const confirmPassword = document.getElementById('confirm-password').value;

      if (!firstName || !lastName || !phone || !address) {
        showError("Please fill out all required personal information.");
        return;
      }

      if (password !== confirmPassword) {
        showError("Passwords do not match!");
        return;
      }

      showSuccess("Account created successfully! Redirecting...");
    } else {
      showSuccess("Sign in successful! Redirecting...");
    }
  });
});