document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const roleCitizenBtn = document.getElementById('role-citizen-btn');
  const roleInspectorBtn = document.getElementById('role-inspector-btn');
  
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  
  const fieldFullname = document.getElementById('field-fullname');
  const submitBtn = document.getElementById('submit-btn');
  const authForm = document.getElementById('auth-form');

  // Active State Tracker
  let selectedRole = 'Citizen'; // Default role
  let authMode = 'login';       // Default mode

  // --- 1. TOGGLE ROLE (Citizen vs Inspector) ---
  roleCitizenBtn?.addEventListener('click', () => {
    selectedRole = 'Citizen';
    roleCitizenBtn.className = 'role-btn py-2 text-xs font-bold rounded-lg bg-blue-600 text-white transition cursor-pointer flex items-center justify-center gap-1.5';
    roleInspectorBtn.className = 'role-btn py-2 text-xs font-bold rounded-lg text-gray-400 hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5';
    updateSubmitButtonText();
  });

  roleInspectorBtn?.addEventListener('click', () => {
    selectedRole = 'Inspector';
    roleInspectorBtn.className = 'role-btn py-2 text-xs font-bold rounded-lg bg-blue-600 text-white transition cursor-pointer flex items-center justify-center gap-1.5';
    roleCitizenBtn.className = 'role-btn py-2 text-xs font-bold rounded-lg text-gray-400 hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5';
    updateSubmitButtonText();
  });

  // --- 2. TOGGLE TABS (Sign In vs Create Account) ---
  tabLogin?.addEventListener('click', () => {
    authMode = 'login';
    tabLogin.className = 'flex-1 pb-3 text-blue-400 border-b-2 border-blue-500 transition cursor-pointer';
    tabSignup.className = 'flex-1 pb-3 text-gray-500 hover:text-gray-300 border-b-2 border-transparent transition cursor-pointer';
    fieldFullname?.classList.add('hidden');
    updateSubmitButtonText();
  });

  tabSignup?.addEventListener('click', () => {
    authMode = 'signup';
    tabSignup.className = 'flex-1 pb-3 text-blue-400 border-b-2 border-blue-500 transition cursor-pointer';
    tabLogin.className = 'flex-1 pb-3 text-gray-500 hover:text-gray-300 border-b-2 border-transparent transition cursor-pointer';
    fieldFullname?.classList.remove('hidden');
    updateSubmitButtonText();
  });

  // --- 3. DYNAMIC BUTTON LABEL ---
  function updateSubmitButtonText() {
    if (submitBtn) {
      if (authMode === 'login') {
        submitBtn.innerText = `Sign In as ${selectedRole}`;
      } else {
        submitBtn.innerText = `Create ${selectedRole} Account`;
      }
    }
  }

  // --- 4. FORM SUBMISSION & ROUTING ---
  authForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Store user role locally so dashboards know who is logged in
    localStorage.setItem('userRole', selectedRole);

    // Route user based on role
    if (selectedRole === 'Inspector') {
      window.location.href = 'dashboard.html';
    } else {
      window.location.href = 'citizen.html';
    }
  });
});