const tabSignIn = document.getElementById('tab-signin');
const tabSignUp = document.getElementById('tab-signup');
const nameField = document.getElementById('name-field');
const nameInput = document.getElementById('name-input');
const authSubtitle = document.getElementById('auth-subtitle');
const submitBtn = document.getElementById('submit-btn');

tabSignIn.addEventListener('click', () => {
  tabSignIn.className = "w-1/2 py-2 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow cursor-pointer";
  tabSignUp.className = "w-1/2 py-2 rounded-lg font-semibold text-sm transition text-gray-400 hover:text-white cursor-pointer";
  nameField.classList.add('hidden');
  nameInput.removeAttribute('required');
  authSubtitle.innerText = "Sign in to your account to continue";
  submitBtn.innerText = "Sign In";
});

tabSignUp.addEventListener('click', () => {
  tabSignUp.className = "w-1/2 py-2 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow cursor-pointer";
  tabSignIn.className = "w-1/2 py-2 rounded-lg font-semibold text-sm transition text-gray-400 hover:text-white cursor-pointer";
  nameField.classList.remove('hidden');
  nameInput.setAttribute('required', 'true');
  authSubtitle.innerText = "Create a new account to get started";
  submitBtn.innerText = "Create Account";
});