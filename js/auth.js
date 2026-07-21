document.addEventListener('DOMContentLoaded', () => {
  const tabSignIn = document.getElementById('tab-signin');
  const tabSignUp = document.getElementById('tab-signup');
  const signupFields = document.getElementById('signup-fields');
  const confirmPasswordField = document.getElementById('confirm-password-field');
  const authSubtitle = document.getElementById('auth-subtitle');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');
  const authForm = document.getElementById('auth-form');
  const alertBox = document.getElementById('alert-box');
  const authCard = document.getElementById('auth-card');

  let isSignUpMode = false;

  // --- HELPER FUNCTIONS ---
  function setLoading(isLoading) {
    if (isLoading) {
      btnSpinner?.classList.remove('hidden');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
      }
    } else {
      btnSpinner?.classList.add('hidden');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
      }
    }
  }

  function showError(msg) {
    setLoading(false);
    if (alertBox) {
      alertBox.innerText = msg;
      alertBox.className = "mb-4 p-3 rounded-lg text-sm font-semibold text-center block bg-red-900/90 text-red-100 border border-red-600 shadow-md";
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (authCard) {
      authCard.classList.remove('shake');
      void authCard.offsetWidth; // Force CSS reflow for re-triggering animation
      authCard.classList.add('shake');
    }
  }

  function showSuccess(msg) {
    if (alertBox) {
      alertBox.innerText = msg;
      alertBox.className = "mb-4 p-3 rounded-lg text-sm font-semibold text-center block bg-green-900/90 text-green-100 border border-green-600 shadow-md";
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // --- PASSWORD SHOW / HIDE TOGGLE ---
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        button.classList.toggle('text-blue-400', isPassword);
        button.classList.toggle('text-gray-400', !isPassword);
      }
    });
  });

  // --- TAB SWITCHING ---
  tabSignUp?.addEventListener('click', () => {
    isSignUpMode = true;
    tabSignUp.classList.add('bg-blue-600', 'text-white', 'shadow');
    tabSignUp.classList.remove('text-gray-400');

    tabSignIn?.classList.remove('bg-blue-600', 'text-white', 'shadow');
    tabSignIn?.classList.add('text-gray-400');

    signupFields?.classList.remove('hidden');
    confirmPasswordField?.classList.remove('hidden');

    if (authSubtitle) authSubtitle.innerText = "Create a new account to get started";
    if (btnText) btnText.innerText = "Create Account";
    alertBox?.classList.add('hidden');
  });

  tabSignIn?.addEventListener('click', () => {
    isSignUpMode = false;
    tabSignIn.classList.add('bg-blue-600', 'text-white', 'shadow');
    tabSignIn.classList.remove('text-gray-400');

    tabSignUp?.classList.remove('bg-blue-600', 'text-white', 'shadow');
    tabSignUp?.classList.add('text-gray-400');

    signupFields?.classList.add('hidden');
    confirmPasswordField?.classList.add('hidden');

    if (authSubtitle) authSubtitle.innerText = "Sign in to your account to continue";
    if (btnText) btnText.innerText = "Sign In";
    alertBox?.classList.add('hidden');
  });

  // --- FORM SUBMISSION & ROUTING ---
  authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    setLoading(true);

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;

    setTimeout(() => {
      if (!email) return showError("Please enter your email address.");
      if (!password) return showError("Please enter your password.");

      if (isSignUpMode) {
        const firstName = document.getElementById('first-name')?.value.trim();
        const lastName = document.getElementById('last-name')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const address = document.getElementById('address')?.value.trim();
        const userRole = document.getElementById('user-role')?.value; // 'citizen' or 'worker'
        const confirmPassword = document.getElementById('confirm-password')?.value;

        if (!firstName || !lastName || !phone || !address) {
          return showError("Please fill out all required personal fields.");
        }

        if (password !== confirmPassword) {
          return showError("Passwords do not match!");
        }

        // Save selected role locally
        localStorage.setItem('userRole', userRole);

        showSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          if (userRole === 'citizen') {
            window.location.href = "citizen.html";
          } else {
            window.location.href = "dashboard.html";
          }
        }, 1200);

      } else {
        // Sign-In Mode: Route based on stored role or default to inspector dashboard
        const savedRole = localStorage.getItem('userRole') || 'worker';

        showSuccess("Sign in successful! Redirecting...");
        setTimeout(() => {
          if (savedRole === 'citizen') {
            window.location.href = "citizen.html";
          } else {
            window.location.href = "dashboard.html";
          }
        }, 1200);
      }
    }, 400);
  });
});