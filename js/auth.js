document.addEventListener('DOMContentLoaded', () => {
  // 1. UI Element References
  const tabSignin = document.getElementById('tab-signin');
  const tabSignup = document.getElementById('tab-signup');
  const signupFields = document.getElementById('signup-fields');
  const confirmPasswordField = document.getElementById('confirm-password-field');
  const authSubtitle = document.getElementById('auth-subtitle');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');
  const alertBox = document.getElementById('alert-box');
  const authForm = document.getElementById('auth-form');

  let currentMode = 'signin';

  // 🌐 Wired straight to your teammate's machine IP
  const API_BASE_URL = 'http://192.168.74.245:5000/api/auth';

  // --- 2. Tab Switching Logic ---
  tabSignin.addEventListener('click', () => setMode('signin'));
  tabSignup.addEventListener('click', () => setMode('signup'));

  function setMode(mode) {
    currentMode = mode;
    showAlert(''); // Clear old messages

    if (mode === 'signin') {
      tabSignin.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 bg-blue-600 text-white shadow cursor-pointer";
      tabSignup.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 text-gray-400 hover:text-white cursor-pointer";
      signupFields.classList.add('hidden');
      confirmPasswordField.classList.add('hidden');
      authSubtitle.textContent = 'Sign in to your account to continue';
      btnText.textContent = 'Sign In';
    } else {
      tabSignup.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 bg-blue-600 text-white shadow cursor-pointer";
      tabSignin.className = "w-1/2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 text-gray-400 hover:text-white cursor-pointer";
      signupFields.classList.remove('hidden');
      confirmPasswordField.classList.remove('hidden');
      authSubtitle.textContent = 'Create a new account to get started';
      btnText.textContent = 'Sign Up';
    }
  }

  // --- 3. Toggle Password Visibility ---
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    });
  });

  // --- 4. Alert Box Helper ---
  function showAlert(message, type = 'error') {
    if (!message) {
      alertBox.classList.add('hidden');
      return;
    }
    alertBox.classList.remove('hidden', 'bg-red-500/20', 'text-red-400', 'border-red-500/40', 'bg-green-500/20', 'text-green-400', 'border-green-500/40');
    
    if (type === 'error') {
      alertBox.classList.add('bg-red-500/20', 'text-red-400', 'border', 'border-red-500/40');
    } else {
      alertBox.classList.add('bg-green-500/20', 'text-green-400', 'border', 'border-green-500/40');
    }
    alertBox.textContent = message;
  }

  // --- 5. Submit Handler (Sends data to backend) ---
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showAlert('');

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      return showAlert('Please fill out email and password.');
    }

    if (currentMode === 'signup') {
      const confirmPassword = document.getElementById('confirm-password').value;
      if (password !== confirmPassword) {
        return showAlert('Passwords do not match!');
      }
    }

    // Show loading spinner
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');

    try {
      const endpoint = currentMode === 'signin' ? `${API_BASE_URL}/login` : `${API_BASE_URL}/signup`;
      
      let payload = { email, password };

      // Add extra signup fields if registering
      if (currentMode === 'signup') {
        const firstName = document.getElementById('first-name').value.trim();
        const middleName = document.getElementById('middle-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        
        payload.name = `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, ' ').trim();
        payload.role = document.getElementById('user-role').value;
      }

      // Shoot the request across Wi-Fi to 172.16.170.8
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Save user details
      if (data.token) localStorage.setItem('token', data.token);
      if (data.role) localStorage.setItem('role', data.role);

      showAlert('Success! Redirecting...', 'success');
      
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1000);

    } catch (err) {
      showAlert(err.message || 'Could not connect to backend server. Make sure it is running!');
    } finally {
      btnText.classList.remove('hidden');
      btnSpinner.classList.add('hidden');
    }
  });
});