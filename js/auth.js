document.addEventListener('DOMContentLoaded', () => {
      // Modals
      const signupModal = document.getElementById('signupModal');
      const signinModal = document.getElementById('signinModal');

      // Open Buttons
      const navSignupBtn = document.getElementById('navSignupBtn');
      const heroSignupBtn = document.getElementById('heroSignupBtn');
      const navSigninBtn = document.getElementById('navSigninBtn');

      // Close Buttons
      const closeSignup = document.getElementById('closeSignup');
      const closeSignin = document.getElementById('closeSignin');

      // Forms
      const signupForm = document.getElementById('signupForm');
      const signinForm = document.getElementById('signinForm');

      // Helper function to show/hide modal
      function openModal(modal) {
        if (modal) modal.classList.add('active');
      }

      function closeModal(modal) {
        if (modal) modal.classList.remove('active');
      }

      // Event Listeners for Opening Modals
      if (navSignupBtn) navSignupBtn.addEventListener('click', () => openModal(signupModal));
      if (heroSignupBtn) heroSignupBtn.addEventListener('click', () => openModal(signupModal));
      if (navSigninBtn) navSigninBtn.addEventListener('click', () => openModal(signinModal));

      // Event Listeners for Closing Modals
      if (closeSignup) closeSignup.addEventListener('click', () => closeModal(signupModal));
      if (closeSignin) closeSignin.addEventListener('click', () => closeModal(signinModal));

      // Close when clicking outside modal box
      window.addEventListener('click', (e) => {
        if (e.target === signupModal) closeModal(signupModal);
        if (e.target === signinModal) closeModal(signinModal);
      });

      // Handle Sign Up (100% Frontend - No Server Fetch)
      if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
          // Prevent browser page reload
          e.preventDefault();

          const name = document.getElementById('signupName').value;
          const email = document.getElementById('signupEmail').value;
          const role = document.getElementById('signupRole').value;

          alert(`Success! Created local account for ${name} (${email}) as ${role}.`);

          signupForm.reset();
          closeModal(signupModal);
        });
      }

      // Handle Sign In (100% Frontend - No Server Fetch)
      if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
          // Prevent browser page reload
          e.preventDefault();

          const email = document.getElementById('signinEmail').value;

          alert(`Welcome back! Signed in as ${email}.`);

          signinForm.reset();
          closeModal(signinModal);
        });
      }
    });