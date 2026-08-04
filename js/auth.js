document.addEventListener('DOMContentLoaded', () => {
  // Grab Modal Elements
  const signupModal = document.getElementById('signupModal');
  const signinModal = document.getElementById('signinModal');

  // Grab Buttons to Open Modals
  const openSignupBtn = document.getElementById('openSignup') || document.getElementById('navSignupBtn') || document.getElementById('heroSignupBtn');
  const openSigninBtn = document.getElementById('openSignin') || document.getElementById('navSigninBtn');

  // Grab Buttons to Close Modals
  const closeSignupBtn = document.getElementById('closeSignup');
  const closeSigninBtn = document.getElementById('closeSignin');

  // Grab Forms
  const signupForm = document.getElementById('signupForm');
  const signinForm = document.getElementById('signinForm');

  // Modal Open/Close Logic
  if (openSignupBtn && signupModal) {
    openSignupBtn.addEventListener('click', () => signupModal.classList.add('active'));
  }
  if (closeSignupBtn && signupModal) {
    closeSignupBtn.addEventListener('click', () => signupModal.classList.remove('active'));
  }

  if (openSigninBtn && signinModal) {
    openSigninBtn.addEventListener('click', () => signinModal.classList.add('active'));
  }
  if (closeSigninBtn && signinModal) {
    closeSigninBtn.addEventListener('click', () => signinModal.classList.remove('active'));
  }

  // Close modals on background click
  window.addEventListener('click', (e) => {
    if (e.target === signupModal) signupModal.classList.remove('active');
    if (e.target === signinModal) signinModal.classList.remove('active');
  });

  // Handle Sign Up Form Submission (Pure Frontend / No Server)
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      // 1. STOPS THE PAGE REFRESH (Critical!)
      e.preventDefault();

      // 2. Safely read input values
      const name = document.getElementById('name')?.value || document.getElementById('signupName')?.value || 'User';
      const email = document.getElementById('email')?.value || document.getElementById('signupEmail')?.value || 'email';
      const role = document.getElementById('role')?.value || document.getElementById('signupRole')?.value || 'Client';

      // 3. Temporary success response
      alert(`Success! Account registered locally for ${name} (${email}) as ${role}.`);

      // 4. Reset form & close modal
      signupForm.reset();
      if (signupModal) signupModal.classList.remove('active');
    });
  }

  // Handle Sign In Form Submission (Pure Frontend / No Server)
  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('signinEmail')?.value || document.getElementById('email')?.value || 'User';

      alert(`Welcome back! Signed in locally as ${email}.`);

      signinForm.reset();
      if (signinModal) signinModal.classList.remove('active');
    });
  }
});