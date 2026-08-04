signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Just show a local success message without fetching anything!
  alert('Account created successfully! (Serverless mode)');
  signupModal.classList.remove('active');
  signupForm.reset();
});