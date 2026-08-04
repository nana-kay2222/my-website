document.addEventListener('DOMContentLoaded', () => {
  // Grab elements from your HTML
  const authForm = document.getElementById('auth-form');
  const tabSignin = document.getElementById('tab-signin');
  const tabSignup = document.getElementById('tab-signup');
  const signupFields = document.getElementById('signup-fields');
  const confirmPasswordField = document.getElementById('confirm-password-field');
  const authSubtitle = document.getElementById('auth-subtitle');
  const btnText = document.getElementById('btn-text');
  const alertBox = document.getElementById('alert-box');
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');

  let isSignUpMode = false;

  // 1. Tab Switching Logic (Sign In vs Sign Up)
  if (tabSignin && tabSignup) {
    tabSignin.addEventListener('click', () => {
      isSignUpMode = false;

      // Update Tab Styles
      tabSignin.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 bg-blue-600 text-white shadow cursor-pointer";
      tabSignup.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 text-gray-400 hover:text-white cursor-pointer";

      // Hide Extra Fields
      signupFields.classList.add('hidden');
      confirmPasswordField.classList.add('hidden');

      // Update Labels
      authSubtitle.textContent = "Sign in to your account to continue";
      btnText.textContent = "Sign In";
      hideAlert();
    });

    tabSignup.addEventListener('click', () => {
      isSignUpMode = true;

      // Update Tab Styles
      tabSignup.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 bg-blue-600 text-white shadow cursor-pointer";
      tabSignin.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 text-gray-400 hover:text-white cursor-pointer";

      // Show Extra Fields
      signupFields.classList.remove('hidden');
      confirmPasswordField.classList.remove('hidden');

      // Update Labels
      authSubtitle.textContent = "Create a new account to get started";
      btnText.textContent = "Sign Up";
      hideAlert();
    });
  }

  // 2. Password Show/Hide Eye Icon Toggle
  togglePasswordBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    });
  });

  // 3. Form Submission Handler (Stops Page Reload & Local Testing)
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      // PREVENTS PAGE REFRESH AND SANITIZATION
      e.preventDefault();

      const email = document.getElementById('email')?.value;
      const password = document.getElementById('password')?.value;

      if (isSignUpMode) {
        const firstName = document.getElementById('first-name')?.value || 'User';
        const role = document.getElementById('user-role')?.value || 'citizen';
        const confirmPassword = document.getElementById('confirm-password')?.value;

        if (password !== confirmPassword) {
          showAlert("Passwords do not match!", "error");
          return;
        }

        showAlert(`Success! Local account registered for ${firstName} (${email}) as ${role}.`, "success");
      } else {
        showAlert(`Welcome back! Signed in locally as ${email}.`, "success");
      }
    });
  }

  // Alert helpers to display messages in your #alert-box div
  function showAlert(message, type) {
    if (!alertBox) return;
    alertBox.textContent = message;
    alertBox.classList.remove('hidden', 'bg-red-500/20', 'text-red-300', 'border-red-500/40', 'bg-green-500/20', 'text-green-300', 'border-green-500/40');

    if (type === 'success') {
      alertBox.classList.add('bg-green-500/20', 'text-green-300', 'border', 'border-green-500/40');
    } else {
      alertBox.classList.add('bg-red-500/20', 'text-red-300', 'border', 'border-red-500/40');
    }
  }

  function hideAlert() {
    if (alertBox) alertBox.classList.add('hidden');
  }
});